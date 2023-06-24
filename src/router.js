import { Router } from "express";


export default class RouterBase{
    constructor(){
        this.router= Router()
        this.init()//esto lo van a usar los childrens de esta clase
    }

    getRouter(){
        return this.router
    }

    init(){}
      //hago los métos (get,port,put,delete) llamando a esa función que desmenuza y ejecuta los callbacks y sus parámetros

    get(path,policies, ...callbacks){
        this.router.get(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    post(path,policies, ...callbacks){
        this.router.post(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    put(path, policies,...callbacks){
        this.router.put(path, passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    delete(path, policies,...callbacks){
        this.router.delete(path, passportCall('jwt',{strategyType:'jwt'}),handlePolicies(policies),thisthis.applyCallbacks(callbacks))
    }

    //para enviar respuesta de forma sistematizada:
    generateCustomResponse =(req,res,next)=>{
        res.sendSuccess= (message)=>{
            res.send({status:'success', message})
        }

        res.sendSuccessAndPayload=(payload)=>{
            res.send({status:'success', payload})
        }

        res.sendError= (error)=>{
            res.status(500).send({status:'error', error})
        }
        /*si la quiero usear en los end points deberia agregarla como meddleware en las rutas de aqui
           get(path, ...callbacks){
        this.router.get(path,this.generateCustomResponse,this.applyCallbacks(callbacks))
    }*/
        next()
    }

    //metodo para el manejo de politicas:
    handlePolicies= (policies)=>{
        return(req,res,next)=>{
            if(policies[0]=== 'PUBLIC') return next()
            const user= req.user
            //si no está autenticado pero si existe el user por si ya está registrado o logueado:
            if(policies[0]=== 'NO_AUTH'&&user) return res.status(401).send({status:error, error: 'no autenticado'})
            //ahora si en las políticas dice no auth pero no encontró al user(por ejemplo para la ruta de login):
            if(policies[0]=== 'NO_AUTH'&&!user) return next()

            //ahora para las rutas en que el usuario ya tenga q existir:
            if(!user)res.status(401).send({status:error, error: 'no autenticado'})

            //si ya existe el user, y no es una politica puplica
            if(!policies.include(user.role.toUpperCase())) return res.status(403).send({status:'error', error:'forbiden'})

            //si ya cumplio con todo y está dentro de las políticas:
            next()

        }
    }


    //applyCallbacks recibe todos los callbacks(medlewares tmb) que tenga ese endpoint, los mapea y a cada
    //uno lo ejecuta con la función aplly
    //(...params) serían los parametros de ese enpoint, y el apply le pngo el this primero indicando q tome ese contexto
    //por ejemplo el req y res, son parámetros de ese callback que recibe router.get 
    //this hace referencia que que pertence a esa claseo sea ese ruteo es una intancia de este clase, y hace referencia a si mismo

    applyCallbacks(callbacks){
        return callbacks.map(callback=> async(...params)=>{
            try{
                await callback.apply(this,params)
            }
            catch(error){
                //ya que todos los meddlewares recibidos tienen un (req,res,next), tomo el parametro de la posicion 1 o sea res y mando el status
               /* params[1].status(500).send(error)*///este el el custom error que es el arametro que ocupa el lugar [1]
               console.log(error)
            }
        })
    }
}