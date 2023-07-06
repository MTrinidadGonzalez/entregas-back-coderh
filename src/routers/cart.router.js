import {cartsService} from '../services/services.js'
import {productsService} from '../services/services.js'
import RouterPadre from './router.js'

export default class CartRoute extends RouterPadre{
    init(){
      /*
        this.get('/:cid',["USER"], async (req,res)=>{
          try{
            const {cid}= req.params
            const cart= await cartsService.getCartById(cid)
            res.send({status:"success", payload: cart})
          }
          catch(error){
            console.log(error)
          }
        })*/

        this.get('/',["USER"], async (req,res)=>{
          try{
            cart= req.user.cart
            console.log(req.user.cart)
            res.send({status:"success", payload:cart })
          }
          catch(error){
            console.log(error)
          }
        })


    }//cierre del init
}


