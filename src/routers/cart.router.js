
import {productsService} from '../services/services.js'
import RouterPadre from './router.js'
import cartControllers from '../controllers/cart.controllers.js'
import productsCntrolles from '../controllers/products.controllers.js'
import tiketControllers from '../controllers/tiket.controllers.js'
import { generateTiketsData} from '../meddlewares/tiket.meddleware.js'

export default class CartRoute extends RouterPadre{
    init(){
     
        this.get('/',["USER","PREMIUM"], cartControllers.getUserCart)
        this.post('/deleteproductcart', ['USER',"PREMIUM"],productsCntrolles.deleteProductCart)
        this.post('/clearCart', ["USER","PREMIUM"],cartControllers.clearCart )
        this.post('/:cid/purchase', ['USER',"PREMIUM"],  generateTiketsData, tiketControllers.operacionTiket)
     
    }//cierre del init

}
