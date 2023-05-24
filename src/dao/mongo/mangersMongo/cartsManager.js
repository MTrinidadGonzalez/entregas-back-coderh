import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../mangersMongo/productsManager.js";
import mongoose from "mongoose";

const productsService= new ProductsManager()

export default class CartsManager{

createCart=(cart)=>{
    return cartModel.create(cart)
}
    
getCarts=()=>{
    return cartModel.find().lean().populate('products.product')
}

getCartById=(cid)=>{
    return cartModel.findById(cid)
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}

addProductToCart=(cid,pid)=>{
return cartModel.updateOne({_id:cid}, {$push: {products:{product: new mongoose.Types.ObjectId(pid)}}})


}



}