import RouterPadre from '../router.js'
import jwt from 'jsonwebtoken'

export default class ProfilesViewRouter extends RouterPadre{
    init(){
  
       this.get('/profilepremium',["PREMIUM"], async (req,res)=>{

            res.render('profilepremium',{
                css:'profilepremium'
            })
        })

        this.get('/profileuser', ["USER"], async (req,res)=>{
            res.render('profileuser')
        })

        this.get('/userData', ["USER", "PREMIUM"], async (req,res)=>{
            res.render('userData')
        })

        this.get('/restoreRequest', ["PUBLIC"], async (req,res)=>{
            res.render('restoreRequest')
        })

       this.get('/newPswRestore', ["PUBLIC"], async(req,res)=>{
        try{
            const {token}=req.query
            const validateToken= jwt.verify(token,'jwtSecret')
            res.render('newPswRestore')
        }
        catch(error){
           res.render('tokenInvalido')
        }
       })

    }//cierre del init
}