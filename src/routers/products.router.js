import RouterPadre from '../routers/router.js'
import {cartsService, productsService} from '../services/services.js'
import productsControllers from '../controllers/products.controllers.js'


export default class ProductRouter extends RouterPadre{
    init(){

        this.get('/',["USER", "PREMIUM","ADMIN"],productsControllers.getProducts)

        //addproduct al carrito
        this.post('/addProductTocart', ["USER","PREMIUM"], productsControllers.addProductCart)

     //   this.post('/deleteProduct',["ADMIN", "PREMIUM","USER"], productsControllers.deleteProductCart)
       
        this.get('/:pid', ["PUBLIC"],productsControllers.getProduct )

        this.post('/newproduct',["USER","PREMIUM"],productsControllers.postProduct)


        this.put('/:pid',["ADMIN"],productsControllers.putProduct )

        this.delete('/deleteProduct/:pid',["ADMIN","PREMIUM"],productsControllers.deleteProduct)




    //esto es para cargarlos todos de una para mi
        this.post('/cargomuchos', ["PUBLIC"], async (req,res)=>{
        try{
        const products= req.body
        const result= await productsService.createProducts(products)
        res.send({status:"success", message:"productos agregados", payload: result})
        }
        catch(error){
        console.log(error)
       }
    })



    }//cierre del init
}