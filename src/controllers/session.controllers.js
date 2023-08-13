import {generateToken} from '../utils.js'

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


export default{
    registerUser,
    loginUser,
    loginWidthGitHub
}