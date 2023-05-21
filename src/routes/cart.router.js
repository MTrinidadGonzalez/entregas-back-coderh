import { Router } from "express";

import CartsManager from "../dao/mongo/mangersMongo/cartsManager.js";
const cartServices= new CartsManager()

const router= Router()

router.get('/', async (req,res)=>{
    try{
        const carts= await cartServices.getCarts()
        res.send({status: 'sucess', payload: carts})
    }
    catch(err){
        console.log(err)
    }
 
})

router.get('/:cid', async (req,res)=>{
    try{
        
    const {cid}= req.params.cid
    const cart= await cartServices.getCartById(cid)
    res.send({status: 'succes', payload: cart})
    }
    catch(err){
        console.log(err)
    }
    
})
//creo un carrito:
router.post('/', async(req,res)=>{
    const creoCart= await cartServices.getActiveCart()
})
//http://localhost:8080/cart
router.post('/:cid/:pid', async(req,res)=>{
    try{
        const {cid}= req.params.cid
        const {pid}= req.params.pid
        const addProductCart= await cartServices.addProductToCart(cid,pid)
        res.send({status: 'succes', payload: addProductCart})
    }
    catch(err){
        console.log(err)
    }
})

router.put('/:cid/:pid', async(req,res)=>{
    try{
        const {cid}= req.params.cid
        const {pid}= req.params.pid
        const deletedProductCart= await cartServices.deleteProductToCart(cid,pid)
        res.send({status: 'succes', payload:deletedProductCart })
    }
    catch(err){
        console.log(err)
    }
})

export default router