import {userServices} from '../services/services.js'
import RouterPadre from './router.js'

export default class UserRouter extends RouterPadre{
    init(){

        this.get('/', ["PUBLIC"], async (req,res)=>{
         try{
            const users= await userServices.getUsers()
            res.send({status:'success', payload:users})
         }
         catch(error){ console.log(error)}
        })

        this.post('/user',["PUBLIC"], async(req,res)=>{
            try{
                const {email}= req.body
                console.log(email)
            const user = await userServices.getUser("email",  email );
         
            res.send({status:'success', payload: user})
            }
            catch(error){
                console.log(error)
            }
        })

        this.put('/:uid', ["NO_AUTH","USER"], async (req,res)=>{
            try{
                const {uid}= req.params
            const user= req.body
            const newuser= await userServices.updateUser(uid,user)
            res.send({status:"success", payload: newuser})
            }
            catch(error){
                console.log(error)
            }
        })

        this.delete('/:uid',["USER"], async (req,res)=>{
            try{
            const {uid}= req.params
            
            const result= await userServices.deleteUser(uid)
            res.send({status:"success", message: `Se eliminó ${result.first_name}`})
            }
            catch(error){
                console.log(error)
            }
        })

    }//cierre del init
}//cierre de la clase