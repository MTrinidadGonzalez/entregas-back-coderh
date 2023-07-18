import RouterPadre from '../router.js'
import {cartsService, productsService} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'

export default class CartView extends RouterPadre{
    init(){
        this.get('/cart', ["USER"], async (req,res)=>{
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

        this.get('/:cid/purchase', ['USER'], async (req,res)=>{
          const user= req.user
          const cart= user.cart[0]
          const products=cart.products
          //const idProducts= products.map(p=> p._id)
          const productscollection= await productsModel.find({ _id: { $in: idProducts } })
          
          
          const cambios = products.map(product => ({
            updateOne: {
              filter: { _id: product._id },
              update: { $inc: { stock: -product.quantity } }
            }
          }));

          await productsModel.bulkWrite(cambios)



          res.render('tiketcompra',{
            user:user
          })
        })

    }//cierre del init
}


/*
Ten en cuenta que el método bulkWrite() 
te permite realizar múltiples operaciones de escritura en un solo llamado a la base de datos, 
lo que puede ser más eficiente en comparación con hacer una consulta y 
una actualización para cada documento por separado.
*/