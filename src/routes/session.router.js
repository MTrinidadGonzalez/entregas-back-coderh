import passport from 'passport';
import {createHash, generateToken, passportCall, validatePassword } from '../utils.js';
import { authToken, authRoles } from "../meddlewares/jwtAuth.js";
import RouterBase from '../router.js'
import UsersManager from '../dao/managers/usersManager.js'



const usersServices= new UsersManager

export default class SessionRouter extends RouterBase{
    init(){

        this.post('/register',['NO_AUTH'],passportCall('register', {strategyType:'locals'}), async(req,res)=>{
            res.send({status:"success",message:"Usuario registrado"});
        })

        /*
        this.get('/registerFail',(req,res)=>{
            console.log(req.session.messages);
            res.status(400).send({status:"error",error:req.session.messages})
        })*/

        this.post('/login',['NO_AUTH'],passportCall('login', {strategyType:'locals'}),async(req,res)=>{
          
            const accessToken = generateToken(req.user);
       
          res.cookie('authToken',accessToken, {
              maxAge:1000*60*60*24,
            //  httpOnly:true,
             // sameSite:"none"
          }).sendStatus(200);
        
      })

      this.get('/github',passportCall('github'),(req,res)=>{});
      
      this.get('/githubcallback',passportCall('github'),(req,res)=>{
        const user = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
          };
          const accessToken = generateToken(user);
        //Aquí envío el token por el body, para que el front lo guarde
        //   res.send({status:"success",accessToken})
    
        //Envío desde una cookie:
        res.cookie('authToken',accessToken, {
            maxAge:1000*60*60*24,
            httpOnly:true,
            sameSite:"strict"
        }).sendStatus(200);
        res.send({status:"success",message:"Logueado, PERO CON GITHUB!!!!!"})
    })

    this.get('/profile',authToken,async(req,res)=>{
        console.log(req.user);
        res.send({status:"success",payload:req.user})
    })
    
    this.post('/restorePassword',async(req,res)=>{
        const {email, password } = req.body;
        //¿El usuario sí existe?
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).send({status:"error",error:"User doesn't exist"})
        const isSamePassword = await validatePassword(password,user.password);
        if(isSamePassword) return res.status(400).send({status:"error",error:"Cannot replace password with current password"})
        //Ahora sí, actualizamos
        const newHashedPassword = await createHash(password);
        await userModel.updateOne({email},{$set:{password:newHashedPassword}});
        res.sendStatus(200);
    })

    }//cierre del init
}//cierre de la clase