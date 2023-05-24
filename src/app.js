
import express from 'express'
import handlebars from 'express-handlebars'
import mongoose, { mongo } from 'mongoose'
import { Server } from 'socket.io'

import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import registerChatHandler from './listeners/chatHandler.js'
import cartRouter from './routes/cart.router.js'





const app= express()
const PORT= process.env.PORT||8080
const server= app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
const io= new Server(server)

const connection= mongoose.connect('mongodb+srv://mtgprimaria:155383070@clustertrinidad.ohzqqhf.mongodb.net/ecommerce?retryWrites=true&w=majority')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=>{
    req.io= io
    next()
})

app.engine('handlebars', handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/cart', cartRouter)

io.on('connection',socket=>{
    registerChatHandler(io,socket);
})