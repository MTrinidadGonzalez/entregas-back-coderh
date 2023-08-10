import productsModel from "../dao/models/productsModel.js"
import { tiketService } from "../services/services.js";

const operacionTiket=async(req,res)=>{
  const userTiketInfo = req.userTiketInfo;
  const productsTiket= req.userTiketInfo.productsComprados
  
//console.log('products tikets',productsTiket)
 /* const cambios = productsTiket.map(product => ({
    updateOne: {
      filter: { _id: product._id },
      update: { $inc: { stock: -product.quantity } }
    }
  }))

  await productsModel.bulkWrite(cambios)*/
  const producstWithStock= []
  const productsWithoutStock= []
  const productIds = productsTiket.map(product => product._id) 
  const productsDb = await productsModel.find({ _id: { $in: productIds } })
  
  productsDb.forEach(p=>{
    const stock= p.stock
    if(stock > 0){
      //console.log('tiene stock')
      producstWithStock.push({...p})
     // console.log('productos con stock',producstWithStock)
    }
    else{
      
      req.logger.debug('Producto sin stock:', error)
      productsWithoutStock.push({...p})
    //  console.log('productos sin stock', productsWithoutStock)
    }
  })
  const sumoQuantity = productosConStock.reduce((total, producto) => total + producto._doc.quantity, 0)
    const sumoAmount = productosConStock.reduce((total, producto) => total + producto._doc.price, 0);
    const tiket= {
      buyerEmailTiket:userTiketInfo.useremail ,
      productsWithStock:producstWithStock ,
      productsWithoutStock:productsWithoutStock,
      totalQuantity:sumoQuantity,
      totalAmount:sumoAmount,
    }
  const result = await  tiketService.createTiket(tiket)
  req.logger.debug('result de operacion product', result)
 
  res.send({status:'success', payload: result})
}

export default{
  operacionTiket
}