import swaggerJSDoc from "swagger-jsdoc"; //Permite una sintaxis especial de un formato llamado YAML nos permite crear la documentación 
import { SwaggerUiOptions } from "swagger-ui-express";
const options:swaggerJSDoc.Options={
    swaggerDefinition:{
        openapi:'3.0.2',
        tags:[
            {
                name:'Products',
                description:'API operations related to products'
            }
        ],
        info:{
            title:'REST API Node.js /Express / TypeScript',
            version:"1.0.0",
            description:"API Docs for Products"
        }
    },
    apis:['./src/router.ts'] //rutas para comenzar a escribir la documentacion// donde vas a encontrar los endpoints que vas a querer documentar
}

const swaggerSpec=swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions={
    customCss:`
        .topbar-wrapper .link{
            content: url('https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2022-05/whatis_rest_api.png');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar{
        background-color: #faedcd;
        }
    `,
    customSiteTitle:'API Docs for Products',
    customfavIcon:'https://cdn-icons-png.flaticon.com/512/1493/1493169.png'
}

export default swaggerSpec 
export {swaggerUiOptions}
