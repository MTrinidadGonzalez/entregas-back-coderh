import { Router } from "express";

const router= Router()

router.get('/logger', (req,res)=>{
    const logger= req.logger
    logger.info('informacion que consologueo')
    res.send({message:'Loggers'})
})

export default router