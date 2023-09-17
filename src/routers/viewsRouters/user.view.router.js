import RouterPadre from '../router.js'
import {userServices} from '../../services/services.js'


export default class UserViewRouter extends RouterPadre{
    init(){
        

        this.get('/premiumDocumentsForm',["ADMIN","PREMIUM","USER"], async (req,res)=>{
            res.render('FormPremiumDocuments')
        })
        
        this.get('/users', ["USER","ADMIN","PREMIUM"], async (req,res)=>{
            const users= await userServices.getUsers()
            
            res.render('users',{
                users:users
            })
        })

    }//cierre init

}