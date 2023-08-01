import { Router } from "express";


const router= Router()

router.get('/loggerTest', (req,res)=>{
   console.log(req.logger)
    res.send({message:'Loggers'})
})

export default router