import RouterPadre from '../router.js'
import {cartsService, productsService} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'
import {generateTiketsData} from '../../meddlewares/tiket.meddleware.js'


export default class CartView extends RouterPadre{
    init(){
        this.get('/cart', ["USER", "PREMIUM"], async (req,res)=>{
           // console.log(`el dueño de este carrito es ${req.user.name}`)
            const user= req.user
            const cid= req.user.cart[0]._id
         
            const cart= await cartsService.getCartById(cid)
            const products=cart.products
            
            const productIds = products.map(p => p._id).join(',')
            let listid= []
            listid.push(productIds)
            const productsColection = await productsService.getProducts({ _id: { $in: listid } });
      
            const listFinalDeProducts = [];
            for (let i = 0; i < products.length; i++) {
              const combinedProduct = { ...products[i] } 
              if (productsColection[i]) {
                combinedProduct.description = productsColection[i].description;
                combinedProduct.price = productsColection[i].price;
                combinedProduct.img = productsColection[i].img
                combinedProduct.category= productsColection[i].category
                
              }
              listFinalDeProducts.push(combinedProduct);
            }   
           // console.log(listFinalDeProducts);       
            res.render('cart',{
                user,
                cart,
                cid,
                css:'cart',
                listFinalDeProducts:listFinalDeProducts
            })
        })

        this.get('/:cid/purchase', ['USER',"PREMIUM"], generateTiketsData, async (req, res) => {
             
                res.render('tiketcompra')
              });

    }//cierre del init
}

