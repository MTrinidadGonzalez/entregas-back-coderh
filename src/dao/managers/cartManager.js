import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../managers/productsManager.js";
import mongoose, { mongo } from "mongoose";

const productsService= new ProductsManager()

export default class CartsManager{

createCart=()=>{
    return cartModel.create({products:[]})
}

getCarts=()=>{
    return cartModel.find().lean().populate('products')
}

getCartById=(cid)=>{
    return cartModel.findById(cid).lean().populate('products.product')
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}


subtractProduct = async (cid, pid) => {
  const newproduct = await productsModel.findById(pid);
  const cart = await cartModel.findById(cid);

  const productsList = cart.products;

  const index = productsList.findIndex(p => p._id.equals(new mongoose.Types.ObjectId(pid)));
  if (index > -1) {
    if (productsList[index].quantity > 1) {
      productsList[index].quantity--;
      productsList[index].amount = productsList[index].amount - newproduct.price;
      cart.totalAmount = cart.totalAmount - newproduct.price;
      cart.totalQuantity--;
    } else {
      productsList.splice(index, 1);
      if (productsList.length === 0) {
        // El carrito está vacío, actualiza totalAmount y totalQuantity a 0
        cart.totalAmount = 0;
        cart.totalQuantity = 0;
      }
    }
    await cart.save();
    return cart;
  }
}



// addproduct tu cart
addProductToCart = async (cid, product) => {
    const newproduct = await productsModel.findById(product.pid)
    const cart= await cartModel.findById(cid)
    const productsList= cart.products
  
    const index= productsList.findIndex(p=> p._id.equals(new mongoose.Types.ObjectId(product.pid)))
    if(index > -1){
   
    const prodcuctoEncontrado=  productsList[index]
    prodcuctoEncontrado.quantity = product.productQuantity
    prodcuctoEncontrado.amount=  newproduct.price * prodcuctoEncontrado.quantity
    cart.totalAmount = cart.totalAmount + prodcuctoEncontrado.amount
    cart.totalQuantity= cart.totalQuantity + prodcuctoEncontrado.quantity

  }
  else{
    //console.log('el producto no estaba en el carrito')
    const productadd={
      _id: new mongoose.Types.ObjectId(product.pid),
      amount: newproduct.price * product.productQuantity,
      quantity: product.productQuantity
    }
    productsList.push(productadd)
    cart.totalAmount = cart.totalAmount + productadd.amount
    cart.totalQuantity = cart.totalQuantity + productadd.quantity
    console.log('el producto se agrego por primera vez me queda totalquantity', cart.totalQuantity, 'totalamount:', cart.totalAmount )
  }
    
    await cart.save()
    //console.log('como queda el cart luego de el prodcuto agregado', cart)
    return cart
  };

 //Limpiar el carrito
 clearCart=async(cid)=>{
try{
  const updateCart = {
    $set: {
      products: [],
      totalAmount: 0,
      totalQuantity: 0
    }
  };

  return await cartModel.updateOne({ _id: cid }, updateCart)
}
catch(error){
  console.log(error)
}
 } 


}