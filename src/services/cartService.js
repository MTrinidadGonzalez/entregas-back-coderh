
export default class CartsService{
    constructor(dao){
        this.dao= dao
    }

    createCart=(cart)=>{
        return this.dao.createCart(cart)
    }
     //OCION 2 PARA USAR EL POPULATE AL HACER FIND   
    getCarts=()=>{
        return this.dao.getCarts()
    }
    
    getCartById=(cid)=>{
        return this.dao.getCartById(cid)
    }
    
    deleteCart=(cid)=>{
        return this.dao.deleteCart(cid)
    }
    
    //AGREGO PRODUCT AL CARRITO MEDIANTE REF AL OBJECT ID 
    addProductToCart=(cid,pid)=>{
    return this.dao.addProductToCart(cid,pid)
    
    }

    subtractProduct=(cid,pid)=>{
        return this.dao.subtractProduct(cid,pid)
    }

    clearCart=(cid)=>{
        return this.dao.clearCart(cid)
    }
    getDetailsOfProductsInCart =(cartProducts)=>{
        return this.dao.getDetailsOfProductsInCart(cartProducts)
    }


}