import RouterPadre from '../router.js'

export default class CartView extends RouterPadre{
    init(){
        this.get('/cart', ["PUBLIC"], async (req,res)=>{
            res.render('cart',{
                css:'cart'
            })
        })

    }
}