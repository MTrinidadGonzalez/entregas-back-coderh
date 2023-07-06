import RouterPadre from '../router.js'
import {cartsService} from '../../services/services.js'

export default class CartView extends RouterPadre{
    init(){
        this.get('/cart', ["USER"], async (req,res)=>{
            
            const user= req.user
            const cid= req.user.cart[0]._id
            const cart= await cartsService.getCartById(cid)
          

            
            res.render('cart',{
                user,
                cart,
                css:'cart'
            })
        })

    }
}