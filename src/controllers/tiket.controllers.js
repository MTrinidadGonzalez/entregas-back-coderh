import productsModel from "../dao/models/productsModel.js"
import { tiketService ,cartsService} from "../services/services.js";
/*
  const operacionTiket=async(req,res)=>{
  try{
    const userTiketInfo = req.userTiketInfo
    const productsTiket= req.userTiketInfo.productsComprados
    if(!productsTiket){
      req.send({status:"error", error:"no hay productos agregados"})
    }
    const cambios = productsTiket.map(product => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.quantity } }
      }
    }))
 
    await productsModel.bulkWrite(cambios)
    const producstWithStock= []
    const productsWithoutStock= []
    const productIds = productsTiket.map(product => product._id) 
    const productsDb = await productsModel.find({ _id: { $in: productIds } })
    
    productsDb.forEach(p=>{
      const stock= p.stock
      if(stock > 0){
        producstWithStock.push({...p})
      
      }
      else{ 
        productsWithoutStock.push({...p}) 
        
      }
    })
  
    const sumoQuantity = producstWithStock.reduce((total, producto) => total + producto._doc.quantity, 0)
    const sumoAmount = producstWithStock.reduce((total, producto) => total + producto._doc.price, 0);
     
      const tiket= {
        buyerEmailTiket:userTiketInfo.useremail ,
        productsWithStock:producstWithStock ,
        productsWithoutStock:productsWithoutStock,
        totalQuantity:sumoQuantity,
        amount:sumoAmount,
        code: Math.random().toString(),
        purchaser: req.user.email
      }
    const result = await  tiketService.createTiket(tiket)

    const cid= req.body.cid
  //  await cartsService.clearCart(cid)     
    res.send({status:'success'})
  }

  catch(error){
    console.log(error)
  }

  }
  */
  
  
  const operacionTiket=async(req,res)=>{
    const cid= req.body.cid
    const cart= await cartsService.getCartById(cid)
     const purchaser= req.user.email
    
    const tiket= {
      totalQuantity:cart.totalQuantity,
      amount:cart.totalAmount,
      code: Math.random().toString(),
      purchaser: purchaser
    }
    const result = await  tiketService.createTiket(tiket)
 //   await cartsService.clearCart(cid)   
    res.send({status:"success"})

  }





export default{
  operacionTiket
}