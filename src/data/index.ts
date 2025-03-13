//Limpiará nuestra base de datos cada que finalcen nuestras ruebas la va a limpiar


import {exit} from 'node:process' //Va a detener la ejecución de un código de node js
import db from '../config/db' //Se requiere la instancia de sequelize 

const clearDB=async()=>{//Es asíncrona porque no sabemos cuanto tiempo le va a tomar limpiar la base de datos
    try{
        await db.sync({force:true})//Elimina todos los datos de la base de datos
        console.log('Eliminados correctamente')
        exit(0)
    }catch(error){
        console.log(error)
        exit(1)
    }

}

if(process.argv[2]==='--clear'){ 
    clearDB()
}