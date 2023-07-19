
import {productsService} from '../services/services.js'
import RouterPadre from './router.js'
import cartControllers from '../controllers/cart.controllers.js'
import productsCntrolles from '../controllers/products.controllers.js'

export default class CartRoute extends RouterPadre{
    init(){
     
        this.get('/',["USER"], cartControllers.getUserCart)

        
        this.post('/deleteproductcart', ['USER'],productsCntrolles.deleteProductCart)


            //aqui voy a mandar el la confirmacion de compra, se supone que recibo los ids de los 
            //products del cart product, luego los comparo a su quantity con el stock y me devuelve el array de 
            //products q si estaban y products q no hay stock la función se llamará stockConfimCompra en el tiketcontroller
        this.post('/:cid/purchase', ['USER'], )


    }//cierre del init

    

}
