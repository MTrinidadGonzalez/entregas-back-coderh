import RouterPadre from '../router.js'



export default class UserViewRouter extends RouterPadre{
    init(){
        

        this.get('/premiumDocumentsForm',["ADMIN","PREMIUM","USER"], async (req,res)=>{
            res.render('FormPremiumDocuments')
        })
        

    }//cierre init

}