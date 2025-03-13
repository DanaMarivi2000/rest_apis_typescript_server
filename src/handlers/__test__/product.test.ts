import request from 'supertest'
import server from '../../server'



describe('POST /api/products',()=>{
    it("should create a new product", async()=>{
        const response= await request(server).post('/api/products').send({
            name:"product test",
            price:20
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
    it("should return an error if it not pass the validation",async()=>{
        const response =await request(server).post("/api/products").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    })
    it("should return an error if price is equal to 0", async ()=>{
        const response=await request(server).post('/api/products').send({
            name:"Monitor curvo",
            price:0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(201)
    })

    it("should validate that the price is a number",async()=>{
        const response = await request(server).post('/api/products').send({
            name:"Monitor Test",
            price:"hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(5)
    })
})

describe('GET /api/products',()=>{

    it('should check if api/products url exists', async()=>{
        const url=await request(server).get('/api/products')

        expect(url.status).not.toBe(404)
    })

    it("Get a JSON response with products", async()=>{
        const response=await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        console.log(response.headers)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body.data).not.toHaveLength(0)
    })
})

describe("GET api/products/:id",()=>{

    it('should return a 404 response for a non-existent product',async()=>{
            const productId=2000
            const response=await request(server).get(`/api/products/${productId}`)

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty("error")
            expect(response.body.error).toBe("Producto no encontrado")
    })

    it('should check a valid ID in the url', async()=>{

        const response=await request(server).get('/api/products/id')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no válido")
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it('get a JSON response for a single product',async()=>{
        
        const productId=1
        const response=await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe('PUT api/products/:id',()=>{

    it('should check a valid ID in the URL', async()=>{
        const response=await request(server).put('/api/products/invalid-id').send({
            name:"Mouse inalambrico",
            price:500,
            availability:true,
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toBeFalsy()
    })




    it("should display validation error messages when updating a product", async()=>{
        const response=await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(5)
        expect(response.body.errors).toBeTruthy()

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
        expect(response.body.errors).not.toBeFalsy()
    })

    it('should validate that the price is greater than 0',async()=>{
        const response=await request(server).put('/api/products/1').send({
            name:"Monitor Curvo",
            availability:true,
            price:0
        })
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Precio no válido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
        
})

    it("should return a 404 response if a product doesn't exist",async()=>{
        const productId=2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name:"Monitor gamer",
            price:200,
            availability:true
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should update an existing product", async()=>{


        const response=await request(server).put('/api/products/1').send({
            name:"Teclado inalambrico",
            price:500,
            availability:true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })

    describe('PATCH /api/products/:id',()=>{
        it('should display validation errors if id does not exist',async()=>{
            const response=await request(server).patch('/api/products/invalid-id')

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors[0].msg).toBe("ID no válido")

            expect(response.status).not.toBe(200)
        })
        it('should a 404 response if product does not exist',async()=>{
            const productId=1000
            const response= await request(server).patch(`/api/products/${productId}`)

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty("error")
            expect(response.body.error).toBe("Producto no encontrado")

            expect(response.status).not.toBe(200)
            expect(response.status).not.toHaveProperty("data")

        })

        it("should return a modified product",async()=>{

            const response=await request(server).patch('/api/products/1')

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('data')
            expect(response.body.data.availability).toBe(false)

            expect(response).not.toBe(400)
        })
    })


    describe('DELETE api/products/:id',()=>{
        it('should return a 400 response if an id is not valid',async()=>{
            const productId="hola"
            const response= await request(server).delete(`/api/products/${productId}`)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors[0].msg).toBe("ID no válido")

            expect(response.status).not.toBe(200)
            expect(response.body).not.toHaveProperty("data")
        })

        it("should return an error if the product is not exists",async()=>{
            const response=await request(server).delete('/api/products/1000')

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty("error")
            expect(response.body.error).toBe("El producto no existe")

            expect(response.status).not.toBe(200)
        })

        it('should delete a product', async()=>{
            const response=await request(server).delete('/api/products/1')

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("data")
            expect(response.body.data).toBe("Producto eliminado")

            expect(response.status).not.toBe(400)
        })
    })
})

