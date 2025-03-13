import Product from "../models/Product.model";
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv' //importa la extension
dotenv.config()// manda a llamar las variables de entorno, incluyendo las del archivo
const db=new Sequelize(process.env.DATABASE_URL!,{ //garantiza que el valor estara alli
    models:[__dirname + '/../models/**/*'],//Retorna la ubicación del archivo que lo manda a llamar
    logging:false,
})
export default db