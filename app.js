require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const express=require('express')
const app =express()

const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middlewares
app.use(express.json())

//Routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>')
})


app.use('/api/v1/products',productsRouter)

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start=async()=>{
    try{
        //Connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() =>console.log(`Server is Listening on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}

start()