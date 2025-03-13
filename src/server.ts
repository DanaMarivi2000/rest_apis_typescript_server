import express from'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi  from 'swagger-ui-express' //Permite crear la url para acceder a la documentación
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
//isancia de express
const server=express()
//leer daos de formularios
server.use(express.json()) //Permi leer el json //Puedes leer los datos del json
export async function connectDB(){
   try{
       await db.authenticate()
       db.sync() //va agregando nuevos modelos o clumnas a la base de datos, sincroniza en automatico lo que tengamos en nuestros modelos
       console.log(colors.blue.bold('Conexión exitosa'))
   }catch(error){
    console.log(colors.red.bold(error))
   }
}
connectDB()


//Permitir CORS 

const corsOptions: CorsOptions={
    origin: function(origin, callback){ //permite o niega la conexión
            if(origin===process.env.FRONTEND_URL){
                callback(null, true)
            }else{
                callback(new Error("Error de CORS"))
            }
    } // quien me está enviando la petición localhost 5173
}

server.use(cors(corsOptions))
server.use(morgan('dev'))//Las opciones que aparecen te dan más o menos de detalles de las peticiones que se estan logueando (Morgan: Registra los detalles de las peticiones o ayuda a loguear las peticiones)
server.use("/api/products",router)
server.get("/api", (req, res)=>{
    res.json({msg:'Desde API'})
})

//DOCS

server.use('/docs', swaggerUi.serve /* cliente de express */, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server
