import { Router } from "express";
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'
import passport from "passport";
import {validatePassword } from '../utils.js'

const usersService= new UsersManager()

const router= Router()

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/registerFail'}), async (req,res)=>{

res.send({status: 'success', payload: result})
})

router.get('registerFail',(req,res)=>{
    console.log(req.session.message)
    res.status(400).send({status:'error',error: req.session.message})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail'}),async(req,res)=>{
    req.session.user = {
        name: req.user.name,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    return res.sendStatus(200);
})

router.get('/loginFail',(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages});
})

export default router