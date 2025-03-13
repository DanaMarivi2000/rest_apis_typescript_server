import { Column, DataType, Default, Model, Table } from "sequelize-typescript";//decoradores para generar tabla, columna,etc 
//Los modelos usualmente es lo que interactúa con los datos de tu aplicación
@Table({
    tableName:'products'
})

class Product extends Model{ //Clase que podemos heredar y podemos definir y reescribir nuestros modelos
    @Column({ //Definimos una columna
        type:DataType.STRING(100)//Tipo de dato y longitud char es fijo por eso se define varcahr pero no hay así que se llama string
    }) //Definir los atributos que va a tener el producto
    declare name:string//será name y tipo de dato string

    @Column({
        type:DataType.FLOAT
    })
    declare price:number
    @Default(true) //no necesito pasarlo en el request siempre estará presete
    @Column({
        type:DataType.BOOLEAN
    })
    declare availability:boolean
}

export default Product