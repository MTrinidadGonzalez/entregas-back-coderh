import { Router } from "express";
const router= Router()

router.get('/register', (req,res)=>{
    res.render('register',{
        css: 'register'
    })
})

router.get('/login', (req,res)=>{
    res.render('login', {
        css:'login'
    })
})

router.get('/products', async(req,res)=>{
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
        
        res.render('products', 
        {products,
         page:currentPage, 
         hasNextPage,
         hasPrevPage,
         prevPage,
         nextPage,
         cid: cid
         })
    }
    
} )

export default router