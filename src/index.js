import express from 'express'
import mongoose, { mongo } from 'mongoose'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser';


import UserRouter from './routes/users.routes.js'
import ProductsRouter from './routes/products.router.js'
import CartRouter from './routes/cart.router.js'
import SessionRouter from './routes/session.router.js'
import viewsRouter from './routes/views.router.js'

import initializePassportStrategies from './config/passport.config.js'
import __dirname from './utils.js'

const app= express()
const PORT= process.env.PORT||8080


const connection= mongoose.connect('mongodb+srv://mtgprimaria:155383070@clustertrinidad.ohzqqhf.mongodb.net/ecommerce?retryWrites=true&w=majority')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))

//handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')


//rutas//
//users
const userRouter= new UserRouter()
app.use('/api/users', userRouter.getRouter()) 
//producst
const productsRouter= new ProductsRouter()
app.use('/api/products', productsRouter.getRouter())
//carts
const cartRouter= new CartRouter()
app.use('/api/carts', cartRouter.getRouter())
//session
const sessionRouter= new SessionRouter()
app.use('/api/session', sessionRouter.getRouter())
//views
app.use('/',viewsRouter )

initializePassportStrategies()

const server= app.listen(PORT, ()=> console.log(`listening on ${PORT}`))




