//funcion meddleware para el ruteo de la privacidad:

export const privacy=(privacyType)=>{
    return(req,res,next)=>{
        const {user}=req.body
        switch(privacyType){
            case "PRIVATE":
            //las que estan logueadas con session:
            if(user)next()
            else res.redirect('/login')//si no existe la sesion lo mando a loguearse
            break
            case "NO_AUTH":
                if (!user)next()
                else res.redirect('/profile')
        }

    }
}