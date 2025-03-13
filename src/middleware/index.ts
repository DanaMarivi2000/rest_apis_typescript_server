import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'

export const handleInputErrors=(req:Request, res:Response, next:NextFunction): void =>{
    let errors= validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }else{
        next()
    }
    // next() //ya termine aqui, vete a la siguiente funcion 
}