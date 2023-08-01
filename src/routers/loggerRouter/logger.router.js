import { Router } from "express";


const router= Router()

router.get('/loggerTest', (req,res)=>{
    const loggers= req.logger.loggers
    console.log('req.logger.loggers', loggers)
    res.send({message:'Loggers'})
})

export default router