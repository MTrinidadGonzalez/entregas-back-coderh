import { Router } from "express";
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'
import passport from "passport";


const router= Router()


router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),async(req,res)=>{
    try{
        
    res.send({status:"success",message:"Registered"});
    }
  catch(error){
    console.log(error)
  }
})

router.get('/registerfail',async (req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages})
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