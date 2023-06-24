import RouterBase from "../router.js";
import ProductsManager from '../dao/managers/productsManager.js'

const productsService= new ProductsManager()

export default class ProductsRouter extends RouterBase{
    init(){
        this.get('/', async (req,res)=>{
            try{
                const products= await productsService.getProducts()
                res.send({status: "success", payload:products})
            }
            catch(err){
                console.log(err)
            }
        })

        
    this.get('/products', async(req,res)=>{
    const { page=1, category, limit: queryLimit}= req.query
    
    const defaultLimit = 3
    const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
    
    const {cid}= req.params
    if(!cid){
        const newCart= await cartsServices.createCart()
        const cid= newCart._id
    }

    if(category){
        const productsfilter= await productsModel.find({category: category}).lean()
        res.render('products',{
            products: productsfilter,
            hasPrevPage: false,
            hasNextPage: false,
            cid:cid
        })
    }else{

        const {docs, totalPages, page: currentPage}=
        await productsModel.paginate({}, {page, limit, lean:true})
        const products= docs
        
         const hasNextPage = currentPage < totalPages;
        const hasPrevPage = currentPage > 1;
        const prevPage = hasPrevPage ? currentPage - 1 : null;
        const nextPage = hasNextPage ? currentPage + 1 : null;
        
        res.send({status:'success', 
        payload:products,
         page:currentPage, 
         hasNextPage,
         hasPrevPage,
         prevPage,
         nextPage,
         cid: cid }     
         )
    }
    
} )

       this.post('/',async (req,res)=>{
        try{
            const {title, description, price,category, status}= req.body
            if(!title || !description || !price || !category) return res.status(400).send({status: "error", error: "Incompleted values"})
            const product= {
                title,
                description,
                price,
                category
            }
            const result= await productsService.createProduct(product)
            res.sendStatus(201)
        }
        catch(err){
            console.log(err)
        }
       }) 

       this.post('/cargoproducts',async(req,res)=>{
        try{
            const products= req.body
            const result= await productsService.createProducts(products)
            res.send({status: 'success', payload: result})
        }
        catch(err){
            console.log(err)
        }
       } )

       this.post('/realTimeProducts', async(req,res)=>{
        try{
            const {title, description, price, category}= req.body
            if(!title || !description || !price || !category) return res.status(400).send({status: "error", error: "Incompleted values"})
            const product= {
                title,
                description,
                price,
                category
            }
            const result= await productsService.createProduct(product)
            res.sendStatus(201)
    
            const allProducts= await productsService.getProducts()
            req.io.emit('productRealTime', allProducts)
        }
        catch(err){
            console.log(err)
        }
       })

       this.get('/:pid', async (req,res)=>{
        try{
            const {pid}= req.params
            const product= await productsService.getProductBy({_id: pid})
        
            if(!product) return res.status(404).send({status: "error", error: "Product not found"})
        
            res.send({status: "success", payload: product})
        }
        catch(err){
            console.log(err)
        }
       })


       this.put('/:pid', async (req,res)=>{
        try{
            const {pid}= req.params
            const updatedProduct= req.body
            const result = await productsService.updateProduct(pid, updatedProduct)
            res.sendStatus(201)
        }
        catch(err){
            console.log(err)
        }
    })
    
    
        this.delete('/:pid', async(req,res)=>{
        try{
            const {pid}= req.params
        await productsService.deleteProduct(pid)
        res.sendStatus(201)
        }
        catch(err){
            console.log(err)
        } 
    })
    
    

    }//cierre del init

}//cierre de la clase