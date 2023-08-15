import {userServices} from '../services/services.js'
import RouterPadre from './router.js'
import { passportCall} from '../utils.js'
import sessionControllers from '../controllers/session.controllers.js'
import { generateToken } from '../utils.js'
export default class SessionRouter extends RouterPadre{

    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionControllers.registerUser)

    
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        this.get('/github',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),(req,res)=>{});
     
        this.get('/githubcallback',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),sessionControllers.loginWidthGitHub)

        this.post('/convertToPremium', ["USER","PREMIUM"], sessionControllers.convertToPremium)

        this.post('/revertPremium', ["USER","PREMIUM"], sessionControllers.revertPremium)

        this.post('/restoreRequest', ["PUBLIC"], async(req,res)=>{
            const {email}= req.body
           const user= await userServices.getUser("email", email)
           if(user){
            const restoreToken= generateToken()
            res.send({status:"success"})
           }
           if(!user){
            res.send({status:"error", error: "Correo no encontrado"})
           }
            
        })

    }//cierre del init
}//cierre de clase