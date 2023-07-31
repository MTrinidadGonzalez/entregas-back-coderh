import { Router } from "express";


const router= Router()

router.get('/loggerTest', (req,res)=>{
    const info= req.logger.info
    console.log('req.loggerinfo', info)
    res.send({message:'Loggers'})
})

export default router