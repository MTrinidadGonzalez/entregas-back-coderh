import productsModel from "../dao/models/productsModel.js"
import { tiketService ,cartsService, ventasService} from "../services/services.js";
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'


const operacionTiket=async(req,res)=>{
  const cid= req.body.cid
  const cartDb= await cartsService.getCartById(cid)
  
  const confirmProductsInCart= cartDb.products
  if(confirmProductsInCart.length < 1){
    res.send({status:'error',error:'carrito vacio'})
   }

  else{
    const username= req.user.name
    const totalAmount= cartDb.totalAmount
    const totalQuantity= cartDb.totalQuantity
  
  let listFinalDeProducts=[]
  const integro= cartDb.products.map(p=>{
    const obj={
      id: p.product._id,
      description: p.product.description,
      price: p.product.price,
      category: p.product.category,
      talle: p.product.talle,
      color:p.product.color,
      amount: p.amount,
      quantity: p.quantity,
      owner: p.product.owner
    }
    listFinalDeProducts.push(obj)
  })
 
  const tiket={
    purchaser: req.user.email,
    totalQuantity:totalQuantity,
    amount:totalAmount,
    code: Math.random().toString()
  }
  const result = await  tiketService.createTiket(tiket)
 

  const tiketDb= await tiketService.getTiket('purchaser', req.user.email)
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
  const username= req.user.name
  const cartDb= await cartsService.getCartById(cid)
  
  const totalAmount= cartDb.totalAmount
  const totalQuantity= cartDb.totalQuantity

let listFinalDeProducts=[]
const integro= cartDb.products.map(p=>{
  const obj={
    id: p.product._id,
    description: p.product.description,
    price: p.product.price,
    category: p.product.category,
    talle: p.product.talle,
    color:p.product.color,
    amount: p.amount,
    quantity: p.quantity,
    owner: p.product.owner
  }
  listFinalDeProducts.push(obj)
})

const newSale={
  comprador: req.user.email,
  products: listFinalDeProducts,
  totalAmount:totalAmount,
  totalQuantity:totalQuantity,
  fecha: new Date()
}
const venta= await ventasService.createVenta(newSale)

const triniemail= 'mtgprimaria@gmail.com'
const mailingService= new MailingService()
const sendEmail= await mailingService.sendMail([triniemail,req.user.email], Dtemplates.TIKET_COMPRA,{username,listFinalDeProducts,totalAmount})


  await cartsService.clearCart(cid) 
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
  
 