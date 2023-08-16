import {generateToken} from '../utils.js'
import {userServices} from '../services/services.js'
import RestoreTokenDTO from '../dto/user/restoreRequesTokenDTO.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import jwt from 'jsonwebtoken'
import {validatePassword, createHash} from '../utils.js'

const registerUser=async (req,res)=>{
    try{   
        res.send({status:'success', payload:req.user})  
       
       }
       catch(error){
        console.log('Error catch register:', error)
       }

}


const loginUser=async (req,res)=>{
    try{
    
        const accessToken = generateToken(req.user);
        res.cookie('authToken',accessToken, {
            maxAge:1000*60*60*24,
          //  httpOnly:true,
           // sameSite:"none"
        }).send({status:'success', message: `llego a login router ${req.user.name}`})
    }
    catch(error){
       console.log('Error catch login:', error)
    }
}

  const loginWidthGitHub=(req,res)=>{
    try{
        const accessToken = generateToken(req.user);
        res.cookie('authToken',accessToken, {
        maxAge:1000*60*60*24,
      //  httpOnly:true,
       // sameSite:"none"
        })
        res.redirect('/home')
    }
    catch(error){
       console.log('Error catch loginWithGitHub:', error)
    }
  }          

const convertToPremium=async(req,res)=>{
  const userId= req.body.userId
  const result= await userServices.uptateUserRole(userId, "PREMIUM")
  res.clearCookie('authToken').send({status:"success", message:'Rol de usuario cambiado'})
}



const revertPremium= async(req,res)=>{
  const result= await userServices.uptateUserRole(userId, "USER")
  res.clearCookie('authToken').send({status:"success", message:'Rol de usuario cambiado'})
}

const restoreRequest=async(req,res)=>{
  const {email}= req.body
  const user= await userServices.getUser("email", email)
  if(user){
   const restoreToken= generateToken(RestoreTokenDTO.getFrom(user),'1h')
   const mailingService= new MailingService()
    const result= await mailingService.sendMail(user.email, Dtemplates.RESTORE_PASSW,{restoreToken})
   res.send({status:"success"})
  }
  if(!user){
   res.send({status:"error", error: "Correo no encontrado"})
  }
}


const newPswRestore=async(req,res)=>{

 try{
  const{password, token}=req.body
  const userToken= jwt.verify(token,'jwtSecret')
  
  const user= await userServices.getUser("email",userToken.email)
  const comparePassword= await validatePassword(password, user.password)
  if(comparePassword){
    res.send({status:'error', error: 'misma contraseña'})
  }
 /* const hashPassword= await createHash(password)
  await userServices.updateUser(user._id, {password:hashPassword })*/
  res.send({status:'success', message:'Contraseña modificada'})
 }
catch(error){
  console.log(error)
}
}



export default{
    registerUser,
    loginUser,
    loginWidthGitHub,
    convertToPremium,
    revertPremium,
    restoreRequest,
    newPswRestore
}