import RouterPadre from '../router.js'
import {cartsService, productsService} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'
import {generateTiketsData} from '../../meddlewares/tiket.meddleware.js'


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

        this.get('/:cid/purchase', ['USER'], generateTiketsData, async (req, res) => {
         


          res.render('tiketcompra');
        });

    }//cierre del init
}


/*
productiket me devuelve estos :
products tikets [
  {
    quantity: 2,
    amount: 10000,
    _id: new ObjectId("64a9eae6485bb32648bf0b83"),
    description: 'Remera musculosa lisa',
    price: 5000,
    img: [
      'https://i.pinimg.com/564x/d5/b0/c3/d5b0c3a65b87289acc77f3db919b9d3a.jpg'
    ],
    category: 'remeras'
  },
  {
    quantity: 3,
    amount: 15000,
    _id: new ObjectId("64a9eae6485bb32648bf0b84"),
    description: 'Pupera musculosa lisa',
    price: 5000,
    img: [
      'https://i.pinimg.com/564x/7a/91/a1/7a91a164d0b7f9d620716478eb5b18a5.jpg'
    ],
    category: 'remeras'
  }
]
*/