import {generateToken} from '../utils.js'

const registerUser=async (req,res)=>{
    try{   if(req.error){
            req.logger.error(`logger register.Usuario no encontrado: ${req.error}`)
            res.send({status:'error', error: req.error})
             }
             else{
                res.send({status:'success', payload:req.user})    
             }   
       }
       catch(error){
        console.log(error)
       }

}


const loginUser=async (req,res)=>{
    try{
        if(req.error){
            res.send({status:'error', error: req.error})
            req.logger.error(`logger login.Usuario no encontrado: ${req.error}`)
        }
        else{
            const accessToken = generateToken(req.user);
        res.cookie('authToken',accessToken, {
            maxAge:1000*60*60*24,
          //  httpOnly:true,
           // sameSite:"none"
        }).send({status:'success', message: `llego a login router ${req.user.name}`})
        }
    }
    catch(error){
        console.log(error)
    }
}

           

export default{
    registerUser,
    loginUser
}