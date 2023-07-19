import productsModel from "../dao/models/productsModel.js"


/*
 el método bulkWrite() 
te permite realizar múltiples operaciones de escritura en un solo llamado a la base de datos, 
lo que puede ser más eficiente en comparación con hacer una consulta y 
una actualización para cada documento por separado.
*/

const stockConfimCompra=async (req,res)=>{
try{
    const user= req.user
    const cart= user.cart[0]
    const products=cart.products
           /*
          const cambios = products.map(product => ({
            updateOne: {
              filter: { _id: product._id },
              update: { $inc: { stock: -product.quantity } }
            }
          }));

          await productsModel.bulkWrite(cambios)

*/



const operacionTiket= async (req,res)=>{
  try{

  }
  catch(error){
    console.log('fallo la operacion tiket, lo siento tri sos muy tonta',error)
  }
}




    res.send({status:'success'})
}
catch(error){
    console.log(error)
}
}

export default{
    stockConfimCompra,
   
}