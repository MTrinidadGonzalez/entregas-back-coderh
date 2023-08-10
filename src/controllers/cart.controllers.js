
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


export default{
    getUserCart
}