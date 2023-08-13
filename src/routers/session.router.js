import {userServices} from '../services/services.js'
import RouterPadre from './router.js'
import { passportCall} from '../utils.js'
import sessionControllers from '../controllers/session.controllers.js'

export default class SessionRouter extends RouterPadre{

    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionControllers.registerUser)

    
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        this.get('/github',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),(req,res)=>{});
     
        this.get('/githubcallback',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),sessionControllers.loginWidthGitHub)

       
    }//cierre del init
}//cierre de clase