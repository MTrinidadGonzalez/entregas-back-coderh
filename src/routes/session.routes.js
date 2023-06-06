import { Router } from "express";
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'
import { createHash } from "../utils.js";
import {validatePassword } from '../utils.js'

const usersService= new UsersManager()

const router= Router()

router.post('/register', async (req,res)=>{

const{first_name, last_name, email, password}= req.body

//filtro si existe ese correo ya registrado
const exist= await usersService.getUser({email})
if(exist) return res.status(400).send({status:'error', error: 'Usuario ya registrado'})

//si no encripto su password
const hashedPassword= await createHash(password)
//lo creo con la password ya encriptada
const user= {
    first_name,
    last_name,
    email,
    password:hashedPassword
}

const result= await usersService.createUser(user)
res.send({status: 'success', payload: result})
})


router.post('/login', async (req,res)=>{
    const {email, password}= req.body
    
    //aqui pongo filtro de admin:
    if(email==='admin@admin' && password=== '12345'){
        req.session.user = {
            name: `admin`,
            email: '.',
            role: 'admin'
        }
       return res.send({status: "success" })
    }

    const user= await usersService.getUser({email})
    if(!user) return res.send({status: 'error', error: 'User not found'})
//comparo contraseña ingresada con la funcion validatePassword
    const validedPass= await validatePassword(password, user.password)    
if(!validedPass)return res.status(400).send({status:'error', error: 'password incorrecta'})

//si existe creo la session: 

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.send({status: "success", })
})

export default router