import {userServices} from '../services/services.js'
import RouterPadre from './router.js'
import { passportCall, generateToken } from '../utils.js'

export default class SessionRouter extends RouterPadre{
    init(){
        this.post('/register', ["PUBLIC"],passportCall('register',{strategyType:'locals'}),async (req,res)=>{
           try{
            console.log(`llego a la ruta de registro el user con el siguiente carrito ${req.user.cart}`)
            res.send({status:'success', message:`Usuario ${req.user.first_name} registrado`})
           }
           catch(error){
            console.log(error)
           }
        } )

        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),async (req,res)=>{
            try{
               
                const accessToken = generateToken(req.user);
       
                res.cookie('authToken',accessToken, {
                    maxAge:1000*60*60*24,
                  //  httpOnly:true,
                   // sameSite:"none"
                }).send({status:'success', message: `llego a login router ${req.user.name}`})
            }
            catch(error){
                console.log(error)
            }
        })

        this.get('/pueboaccesodelogueado',["USER"], async(req,res)=>{
           try{
            if(req.user){
                console.log(`ya está el user en el req.user un una ruta con privacidad "user" ${req.user.name}`)
            }
            res.send({status:"success", message:"esta con la sesion vigente"})
           }
           catch(error){
            console.log(error)
           }
        })

    }//cierre del init
}//cierre de clase