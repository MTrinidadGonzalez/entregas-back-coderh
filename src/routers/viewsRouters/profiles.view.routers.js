import RouterPadre from '../router.js'

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

    }//cierre del init
}