import request  from "supertest" //Se conecta hacia la api
import server from '../server'

describe('GET /api',()=>{ //sirve para agrupar una serie de pruebas que esten relacionadas 
    test('should send a back a json reponse ',async ()=>{//pruebas de forma individual se puede utilizar test o it
        const res= await request(server).get('/api')
            expect(res.status).toBe(200)
            expect(res.headers['content-type']).toMatch(/json/)//si en algún lugar tienes json 
            expect(res.body.msg).toBe('Desde API')
            expect(res.status).not.toBe(404)
            expect(res.body.msg).not.toBe('desde api')
        })
})