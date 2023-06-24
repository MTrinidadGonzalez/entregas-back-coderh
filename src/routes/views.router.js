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

export default router