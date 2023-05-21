import { Router } from "express";
import ProductsManager from "../dao/mongo/mangersMongo/productsManager.js";

const router= Router()
const productsService= new ProductsManager()

router.get('/products/', async(req,res)=>{
    const products= await productsService.getProducts()
    res.render('products', {products})
} )

router.get('/chat', async(req,res)=>{
    res.render('chat')
})

export default router