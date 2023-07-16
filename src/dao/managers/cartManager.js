import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../managers/productsManager.js";
import mongoose, { mongo } from "mongoose";

const productsService= new ProductsManager()

export default class CartsManager{

createCart=()=>{
    return cartModel.create({products:[]})
}
 //OCION 2 PARA USAR EL POPULATE AL HACER FIND   
getCarts=()=>{
    return cartModel.find().lean().populate('products')
}

getCartById=(cid)=>{
    return cartModel.findById(cid).lean().populate('products.product')
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}

//fucion de addproduct tu cart
addProductToCart = async (cid, product) => {
    const newproduct = await productsModel.findById(product.pid)
    const cart= await cartModel.findById(cid)
    const productsList= cart.products
  
    const index= productsList.findIndex(p=> p._id.equals(new mongoose.Types.ObjectId(product.pid)))
    if(index > -1){
   
    const prodcuctoEncontrado=  productsList[index]
    prodcuctoEncontrado.quantity++
    prodcuctoEncontrado.amount= prodcuctoEncontrado.amount + newproduct.price
    cart.totalAmount = cart.totalAmount + prodcuctoEncontrado.amount
    cart.totalQuantity++

  }
  else{
    console.log('el producto no estaba en el carrito')
    const productadd={
      _id: new mongoose.Types.ObjectId(product.pid),
      amount: newproduct.price,
      quantity: product.productQuantity
    }
    productsList.push(productadd)
    cart.totalAmount = cart.totalAmount + productadd.amount
    cart.totalQuantity++

  }
    
    await cart.save()
    console.log('como queda el cart luego de el prodcuto agregado', cart)
    return cart
  };


  deleteProductTocart=async(cid, pid)=>{

    const cart= await cartModel.findById(cid)
    const productsList= cart.products
    const index= productsList.findIndex(p=> p._id.equals(new mongoose.Types.ObjectId(product.pid)))
    productsList.slice(index,1)
    await cart.save()
    console.log('como queda el cart luego de borrar producto', cart)
    return cart

  }


}