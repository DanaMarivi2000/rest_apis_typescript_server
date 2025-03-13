import { Router } from "express";
import {body, param} from 'express-validator'
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import {handleInputErrors} from './middleware/index'
const router=Router()

//Sintaxis especial para llenar la ui

/**
 * @swagger
 * components:
 *      schemas:
 *           Product:
 *              type: object
 *              properties:
 *                   id:
 *                       type: integer
 *                       description: The Product ID
 *                       example: 1
 *                   name:
 *                        type: string
 *                        description: The Product Name
 *                        example: Monitor Curvo de 40 pulgadas
 *                   price:
 *                         type: number
 *                         description: The Product price
 *                         example: 300
 *                   availability:
 *                         type: boolean
 *                         description: The Product availability
 *                         example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Gets a list of products
 *        tags:
 *            - Products
 *        description: Return a list of products
 *        responses:
 *             200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
*                              items:
*                                   $ref: '#/components/schemas/Product' 
 */

router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *     summary: Gets a product by ID 
 *     tags: 
 *         - Products
 *     description: Returns a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *             type: integer
 *     responses: 
 *         200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                     schema:           
 *                         $ref: '#/components/schemas/Product'
 *         404:
 *             description: Not found
 *         400:
 *             description: Bad Request - Invalid ID
 */

router.get('/:id',
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: creates a new product
 *     tags:
 *        - Products
 *     description: Returns a new product in the database
 *     requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo de 49 pulgadas" 
 *                            price:
 *                                   type: number
 *                                   example: 399
 *     responses:
 *         201:
 *                description: Product created successfully
 *                content:
 *                   application/json:
 *                         schema:
 *                            $ref : '#/components/schemas/Product'                             
 *         400:
 *                description: Bad Request - invalid input data
 * 
 */
router.post("/", 
    body("name").notEmpty().withMessage("El nombre del producto no debe estar vacío").isString().withMessage("Nombre no válido"),
    body("price").isNumeric().withMessage("Valor no valido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    handleInputErrors, //Funciones intermedias que se ejecutan en cada request de tipo http
    createProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path 
 *            name: id
 *            description: The Id of the product to retrieve
 *            required: true
 *            schema:
 *               type: integer
 *      requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                     schema:
 *                        type: object
 *                        properties:
 *                             name:
 *                                  type: string
 *                                  example: 'Monitor Actualizado'
 *                             price:
 *                                   type: number
 *                                   example: 399
 *                             availability:
 *                                   type: boolean
 *                                   example: true
 *      responses:
 *           200:
 *              description: Successfully response
 *              content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Product'             
 *           400:
 *              description: Bad Request - invalid input data
 *           404:
 *              description: Not found
 */

router.put("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    body("name").notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("price").isNumeric().withMessage("Valor no válido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    body("availability").isBoolean().withMessage("Valor para la disponibilidad noválido"),
       handleInputErrors,  //Funciones intermedias que se ejecutan en cada request de tipo http
    updateProduct
)

/**
 * @swagger
 *  /api/products/{id}:
 *  patch:
 *    summary: Updates the availability of a product
 *    tags:
 *        - Products
 *    description: Returns a product with availability modified
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the product
 *          schema:
 *              type: integer
 *    responses:
 *          200: 
 *              description: Succesfully response
 *              content:
 *                  application/json:
 *                        schema:
 *                           $ref: '#/components/schemas/Product'
 * 
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Not found 
 */


router.patch("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: Deletes a product
 *   tags:
 *   - Products
 *   description: Returns a confirmation message
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Product ID to delete
 *         schema:
 *             type: integer
 *   responses:
 *        200:
 *          description: Successfully response
 *          content:
 *              application/json:
 *                      schema:
 *                          type: string
 *                          value: "Producto eliminado"
 *        400: 
 *          description: Bad request - Invalid ID
 *        404:
 *           description: Not found
 * 
 * 
 */



router.delete("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct)

export default router