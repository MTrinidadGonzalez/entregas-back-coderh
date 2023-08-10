import {cartsService, productsService} from '../services/services.js'
import ErrorsService from '../services/ErrorServices/error.services.js'
import {productsErrorIncompleteValues, productsExistYet} from '../constants/productsErrors.js'
import {DictionaryEErrorProducts} from '../constants/EErors.js'

const getProducts=async(req,res)=>{
    try{
        const products= await productsService.getProducts()
        res.send({status: "success", payload:products})
    }
    catch(error){
        console.log('Error catch get products:', error)
    }
}


const getProduct= async(req,res)=>{
    try{
        const {pid}=req.params
        const product= await productsService.getProductById(pid)
        res.send({status:'success', payload: product})
    }
    catch(error){
        console.log('Error catch get product:', error)
    }
}

const addProductCart=async (req,res)=>{
    try{
          
        const cid= req.user.cart[0]._id
        const username= req.user.name
        const pid= req.body.productId
        const productQuantity= req.body.spamQuantity
        console.log(req.body)
        const product= {
            pid:pid,
            productQuantity:productQuantity
        }
         
        const productStock= await productsService.getProductById(pid)
        if (productStock.stock < 0){
            ErrorsService.createError({
                name:"Error al agregar producto producto",
                cause: productsWithoutStock(productStock),
                code: DictionaryEErrorProducts.SIN_STOCK_INIXISTENTE,
                status:400

            }),
            req.logger.error(`producto agregado, sin stock ${productStock}`)
        }
           const result= await cartsService.addProductToCart(cid,product)

    res.send({status:"success", 
              message:`se agrego el product ${pid} en el el carrito ${cid} de ${username}`,
              })
    }
    catch(error){
        console.log(error)
    }
}

const deleteProductCart= async(req,res)=>{
    try{
        const user = req.user;
    const cid = user.cart[0]._id
    console.log('cart id', cid)
    const pid= req.body.pid
    console.log('pid', pid)

    const result= await cartsService.subtractProduct(cid,pid)
    res.send({status:'success',payload:result })
    }
    catch(error){
        console.log('Error catch delete product:', error)
    }
}




const postProduct= async(req,res)=>{
    const useremail= req.user.email
    
    try{
       const {title, description,price,category,code,img}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            img,
            owner:useremail
        }
        
        if(!title || !description || !price || !category || !code || !img){
            ErrorsService.createError({
                name:"Error al crear producto",
                cause: productsErrorIncompleteValues({title,description,price,code,img}),
                code: DictionaryEErrorProducts.INCOMPLETE_VALUES,
                status:400

            })
        }
        
        const addProduct= await productsService.createProduct(product)
        res.send({status:'success'}) 
        
    }
    catch(error){
       console.log('Error catch createProduct:', error)
    }
}

const putProduct=async(req,res)=>{
    try{
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
    }
    catch(error) {
        req.logger.error('Error catch updateProduct:', error)
    }
}

export default{
    getProducts,
    getProduct,
    addProductCart,
    postProduct,
    putProduct,
    deleteProductCart
}