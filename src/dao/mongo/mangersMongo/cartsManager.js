import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../mangersMongo/productsManager.js";
//deberia inicializar un carrito segun el usuario pero aún no tengo usuarios por lo que lo hare asi

const productsService= new ProductsManager()

export default class CartsManager{

    //por si no hay un cart aún 
 getActiveCart=()=>{
    let cart= cartModel.findOne({status:true})
    if(!cart){
        cart= cartModel.create({status:true})
    }
    return cart
 }

getCarts=()=>{
    return cartModel.find().lean()
}

getCartById=(cid)=>{
    return cartModel.findById(cid)
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}

addProductToCart=(cid,pid)=>{
    //verifico si existe el carrito
    const cart= cartModel.findById(cid)
    if(!cart){
        console.log("ese carrito no existe")
    }
    //si esta el produc sumo uno al quantity 
    const productIsInCart= cart.products.find(
        (product)=> product.product.toString() === pid)
    if (productIsInCart){
        productIsInCart.quantity += 1
    }else{
        cart.products.push({product: pid})
    }

    
//actualizo el total amount del carrito
const product= productsModel.findById(pid)
cart.totalAmount += product.price

//ahora gusrdo todo esto en el carrito con save
cart.save()
return cart
}

deleteProductToCart=(cid,pid)=>{
const cart= cartModel.findById(cid)
if(!cart){
    console.log("carrito no encontrado")
}

const productIndex= cart.products.findIndex((p)=>{
    p.product.toString() === pid
})
if(productIndex === -1){
    console.log("Este Producto no esta en el carrito")
}
//ahora le resto el precio al totalAmount:

const product= productsModel.findById(pid)
cart.totalAmount -= product.price * cart.products[productIndex].quantity 
//borro el profucto del carrito:
cart.products.splice(productIndex,1)
//guardo los cambios del carrito:
cart.save()
return cart

}
}