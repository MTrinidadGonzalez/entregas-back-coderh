import productsModel from "../dao/models/productsModel.js"
import { tiketService ,cartsService, ventasService} from "../services/services.js";
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'

 
const operacionTiket=async(req,res)=>{
  const cid= req.body.cid
  const cart= await cartsService.getCartById(cid)
  const purchaser= req.user.email
  const username= req.user.name
  const confirmProductsInCart= cart.products

  const totalAmount= cart.totalAmount
  const triniemail= 'mtgprimaria@gmail.com'

  if(confirmProductsInCart.length < 1){
   res.send({status:'error',error:'carrito vacio'})
  }
 else{
  const comprados= req.userTiketInfo.productsComprados
  const mailingService= new MailingService()
  const sendEmail= await mailingService.sendMail([triniemail,purchaser], Dtemplates.TIKET_COMPRA,{username,comprados,totalAmount})
   const tiket= {
    totalQuantity:cart.totalQuantity,
    amount:cart.totalAmount,
    code: Math.random().toString(),
    purchaser: purchaser
  }
  const result = await  tiketService.createTiket(tiket)
  const newSale = {
    comprador: purchaser,
    products:comprados, 
    totalAmount: totalAmount,
    fecha: new Date()
  }
  const venta= await ventasService.createVenta(newSale) 
  const tiketDb= await tiketService.getTiket('purchaser', purchaser)
  const tid= tiketDb._id
  const payload={
    totalQuantity:tiketDb.totalQuantity,
    amount:tiket.amount
  }
  res.send({status:"success", tid:tid, cid:cid, payload:payload})
}

}

const clearTiketAndCart= async(req,res)=>{
  const {cid, tid}= req.params
  console.log('cid',cid)
  console.log('tid', tid)
  await cartsService.clearCart(cid) 
  //await tiketService.uptateTiketStatus(tid,"false")
  await tiketService.deleteTiket(tid)
  res.send({status:"success"})
}

export default{
operacionTiket,
clearTiketAndCart
}


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
  
 