import RouterPadre from '../router.js'
import {cartsService, productsService,tiketService,userServices} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'
import {generateTiketsData} from '../../middlewares/tiket.middleware.js'


export default class CartView extends RouterPadre{
    init(){
      /*  this.get('/cart', ["USER", "PREMIUM"], async (req,res)=>{
           // console.log(`el dueño de este carrito es ${req.user.name}`)
            const user= req.user
            const cid= req.user.cart[0]._id
            const userDb= await userServices.getUserById(user.id)
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
        })*/

        this.get('/cart', ["USER", "PREMIUM"], async (req,res)=>{
          // console.log(`el dueño de este carrito es ${req.user.name}`)
          const cart= req.user.cart 
          const cid= cart[0]._id
          //const clear= await cartsService.clearCart(cid)
         const cartDb= await cartsService.getCartById(cid)
        // console.log(cartDb.products)
        let listFinalDeProducts=[]
        const integro= cartDb.products.map(p=>{
          const obj={
            id: p.product._id,
            description: p.product.description,
            price: p.product.price,
            img: p.product.img,
            category: p.product.category,
            talle: p.product.talle,
            color:p.product.color,
            amount: p.amount,
            quantity: p.quantity
          }
         // console.log(p.quantity, p.product.description)
         listFinalDeProducts.push(obj)
        })
        //console.log('listafinalproducts', listFinalDeProducts)
         
          res.render('cart',{
            cid:cid,
            listFinalDeProducts:listFinalDeProducts,
            cart:cart
          })
       })






        this.get('/:cid/purchase', ["ADMIN",'USER',"PREMIUM"], generateTiketsData, async (req, res) => {
            const email= req.user.email
            const tiketDb= await tiketService.getTiket("purchaser", email)
              
            const tiket={
              code: tiketDb.code,
              totalQuantity: tiketDb.totalQuantity,
              amount: tiketDb.amount,
              purchaser:tiketDb.purchaser,
              dataTime: tiketDb.created_at
            }
            console.log(tiket)
               res.render('tiketcompra',{
              tiket:tiket
            })
              });

             

    }//cierre del init
}

