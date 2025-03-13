import { Request, Response, NextFunction } from "express"
import { BeforeDestroy } from "sequelize-typescript"
import Product from "../models/Product.model"

export const getProducts =async (req:Request, res:Response)=>{
    // res.send('Desde get')

    try{
        const products = await Product.findAll({
            order:[ ['id', 'ASC'] ], //Se pueden ordenar los datos
            // limit:2 //Puedes limitar
            attributes:{exclude:['createdAt', 'updatedAt']} //Excluye atributos que no quiero traer
        })
        res.json({data:products})
    }catch(error){
        console.log(error)
    }
}

export const getProductById=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params
        console.log(id)
        const productById=await Product.findByPk(id)

        if(!productById){
            res.status(404).json({error:"Producto no encontrado"})
        }else{
            res.json({data:productById})
        }
    }catch(error){
        console.log(error)
    }
}

export const createProduct=async(req:Request, res:Response, next:NextFunction): Promise<void>=>{
 //check permite validar un campo
 //validationResult resultado de la validacions
 
    // const product=new Product(req.body)//crea el objto
    // const saveProduct=await product.save()//Se almacena en la base de datos
    try{
        const saveProduct=await Product.create(req.body)
        res.status(201).json({data:saveProduct})//retorna el json
    }catch(error){
        console.log(error)
    }
    //Ahora en el handler ya solo queda la validación del producto
}

export const updateProduct=async (req:Request, res:Response)=>{
    
    const {id}=req.params
    const product=await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: "Producto no encontrado"})    
    }else{
        await product.update(req.body) //Actualiza lo que le mandes ya que PUT actualiza todo
        await product.save()
        res.json({data:product})
    }
    //Actualizar producto
}

export const updateAvailability=async(req:Request, res:Response)=>{
    const {id}=req.params 
    console.log(req.params)
    const product=await Product.findByPk(id)
    if(!product){
        res.status(404).send({error:"Producto no encontrado"})
        return
    }
    product.availability=!product.dataValues.availability
    await product.save()
    res.json({data:product})
}

export const deleteProduct=async(req:Request, res:Response)=>{ //son asíncronas porque interactúa con el modelo en lo que pasa la información se tarda y queremos que se cargue correctamente
    const {id}=req.params
    const product=await Product.findByPk(id)

    if(!product){
        res.status(404).json({error:"El producto no existe"})
        return 
    }
    await product.destroy()//elimina de la base de datos, espera a que se elimine para mostrar el json
        res.json({data:"Producto eliminado"})
}