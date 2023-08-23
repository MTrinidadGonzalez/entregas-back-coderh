import { cartsService } from "../services/services.js"

const getUserCart=async(req,res)=>{
    try{
        cart= req.user.cart
        req.logger.debug(req.user.cart)
        res.send({status:"success", payload:cart })
      }
      catch(error){
        console.log('Error getUserCart:', error)
      }
}


const clearCart=async (req,res)=>{
try{
  const cid= req.body.cid
  const result=await cartsService.clearCart(cid)
  
  res.status('200').send({status:'success'})
}
catch(error){
  console.log(error)
}
}


export default{
    getUserCart,
    clearCart
}