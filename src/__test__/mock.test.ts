import db from '../config/db'
import {connectDB} from '../server'


jest.mock('../config/db')

describe('connectDB',()=>{
    it('should handle database connection error',async()=>{
        jest.spyOn(db, 'authenticate')
        .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD')) //Forzo a que la promesa falle

        const consoleSpy=jest.spyOn(console, 'log') //Objeto a espiar y método como string

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a la BD'))      
    })
})