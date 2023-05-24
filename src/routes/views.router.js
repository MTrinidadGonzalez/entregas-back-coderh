import { Router } from "express";
import ProductsManager from "../dao/mongo/mangersMongo/productsManager.js";

const router= Router()
const productsService= new ProductsManager()

router.get('/products/', async(req,res)=>{
    const products= await productsService.getProducts()
    res.render('products', {products})
} )
//chat
router.get('/chat', async(req,res)=>{
    res.render('chat')
})

//realTimeProducts

router.get('/realTimeProducts', async (req,res)=>{
    res.render('realTimeProducts')

})

export default router