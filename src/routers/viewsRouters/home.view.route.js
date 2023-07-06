import RouterPadre from '../../routers/router.js'

export default class HomeViewRouter extends RouterPadre{
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{

            
            res.render('home',{
                css:'home'
            })
        })

    }//cierre del init
}