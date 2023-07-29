import { Router } from "express";

const router= Router()

router.get('/logger', (req,res)=>{
    const loggers = req.logger.getLogs();
    res.send({message:'Loggers', payload:loggers})
})

export default router