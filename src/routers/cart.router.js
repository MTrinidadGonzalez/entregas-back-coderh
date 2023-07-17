import {cartsService} from '../services/services.js'
import {productsService} from '../services/services.js'
import RouterPadre from './router.js'
import cartControllers from '../controllers/cart.controllers.js'
import productsCntrolles from '../controllers/products.controllers.js'

export default class CartRoute extends RouterPadre{
    init(){
     
        this.get('/',["USER"], cartControllers.getUserCart)

        
        this.post('/deleteproductcart', ['USER'],productsCntrolles.deleteProductCart)

    }//cierre del init
}


