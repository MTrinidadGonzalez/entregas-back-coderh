import RouterBase from "../router.js";
import CartsManager from '../dao/managers/cartsManager.js'

const cartServices= new CartsManager()

export default class CartRouter extends RouterBase{
 init(){
    // Obtengo todos los carritos
this.get('/',async (req, res) => {
    try{
      const carts = await cartServices.getCarts();
      res.send({status: 'success', payload: carts})
    }
     catch(err){
      console.log(err)
     }
    });
    
    // Obtengo un carrito por ID
    this.get('/:cid', async (req, res) => {
      try{
        const  cid = req.params.cid;
        const cart = await cartServices.getCartById(cid);
  
       // console.log(JSON.stringify(cart, null, '\t'))
        res.send({status: 'success', payload: cart})
      }
     catch(err){
      console.log(err)
     }
    });

    // Creo un nuevo carrito
    this.post('/', async (req, res) => {
    try{
      const {cart}= req.body
     
      const newCart= await cartServices.createCart(cart)
      
      res.send({status: 'success', payload: newCart})
    }
  catch(err){
    console.log(err)
  }
  });
  
  // Agrego un producto al carrito

  this.put('/:cid/product/:pid',async (req, res) => {
    try{
      const cid = req.params.cid;
      const pid= req.params.pid;
      
      /*const cartGet = await cartServices.getCartById(cid)
      
      const existingProduct = cartGet.products.find(
        (product) => product._id === pid
      )
      if (existingProduct) {
        
        existingProduct.quantity += 1;
        const cart = await  cartServices.addProductToCart(cid, existingProduct._id)
      }*/
      const cart = await  cartServices.addProductToCart(cid, pid);
      console.log(JSON.stringify(cart,null, '\t'))
      res.send({status: 'success', payload:cart })
      
    }
    catch(err){
      console.log(err)
    }
  });
  
  // Elimino  producto del carrito
  this.delete('/:cid/:pid',async (req, res) => {
    try{
      const { cid, pid } = req.params;
      const cart = cartServices.deleteProductToCart(cid, pid);
      res.send({status: 'success', payload: cart})
    }
    catch(err){
      console.log(err)
    }
  });
  
  // Eliminar un carrito por ID
  this.delete('/carts/:id',async (req, res) => {
    try{
      const { id } = req.params;
      const cart = cartServices.deleteCart(id);
      res.send({status: 'success', payload: cart})
    }
  catch(err){
    console.log(err)
  }
  });



 }//cierre del init
}//cierre de la clase