import RouterPadre from '../routers/router.js'
import {productsService} from '../services/services.js'

export default class ProductRouter extends RouterPadre{
    init(){


    this.get('/',["PUBLIC"], async (req,res)=>{
        try{
            const products= await productsService.getProducts()
            res.send({status: "success", payload:products})
        }
        catch(err){
            console.log(err)
        }
    })//

    this.post('/addproduct', ["PUBLIC"],async (req,res)=>{
        try{
            const pid= req.body.productId
        res.send({status:"success", message:`llego el id del product ${pid}`})
        }
        catch(error){
            console.log(error)
        }
    })

    this.get('/:pid', ["PUBLIC"], async (req,res)=>{
        const {pid}=req.params
        const product= await productsService.getProductBy("_id",pid)
        console.log(`se en encontro el producto ${product.description}`)
        res.send({status:'success', payload: product})
    })

    this.post('/',["ADMIN"], async(req,res)=>{
try{
    const {title, description,price,category,code,thumbnail}=req.body
    const product={
        title,
        description,
        price,
        category,
        code,
        thumbnail
    }
    const addProduct= await productsService.createProduct(product)
    res.send({status:'success', message:`Se creó el producto ${product.description}`})
}
catch(error){
    console.log(error)
}
    })

    this.put('/:pid',["ADMIN"], async(req,res)=>{
        const {pid}=req.params
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        const updateProduct= await productsService.updateProduct(pid,product)
        res.send({status:'success', message:`Se modificó ${product.description}`, payload:updateProduct})
    })

    this.delete('/:pid',["ADMIN"],async (req,res)=>{
        const {pid}= req.params
        const deleteProduct= await productsService.deleteProduct(pid)
        res.send({status:'success', message: 'Producto eliminado', payload: deleteProduct})
    })

    //esto es para cargarlos todos de una yo
    this.post('/cargomuchos', ["PUBLIC"], async (req,res)=>{
       try{
        const products= req.body
       const result= await createProducts.createProducts(products)
       res.send({status:"success", message:"productos agregados", payload: result})
       }
       catch(error){
        console.log(error)
       }
    })

    this.post('/', ["ADMIN"], async (req,res)=>{
      try{
        const product= req.body
        const result= await productsService.createProduct(product)
        res.send({status:"success", message:"Producto creado", payload:result})
      }
      catch(error){
        console.log(error)
      }
    })

    this.put('/:pid',["ADMIN"], async(req,res)=>{
        try{
            const {pid}= req.params
            const product= req.body
            const result= await productsService.updateProduct(pid,product)
            res.send({status:"success", message: `Producto modificado a: ${result}`})
        }
        catch(error){
            console.log(error)
        }
    } )




    }//cierre del init
}