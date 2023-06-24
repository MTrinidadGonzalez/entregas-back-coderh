

//esto es similar a lo de privacy que usaba en sesion, y si esta aqui es porque ya el user llogó a este punto
//este meedleware lo uso en el ruteo luego de la estrategia de login, porque primero me llega el user y luego autentifica el rol
export const authRoles = (role) =>{
    return async(req,res,next) => {
      if(req.user.role!=role) return res.status(403).send({status:"error",error:"Fobidden"})
      next();
    }
  }


  //funcion de authToken
  //esto lo hago si lo tomo del header del fornt pero ahora lo mandamos desde el enpoint al front por medio de cookie
  import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
  
    const authHeader = req.headers.authorization;
    if(!authHeader) res.status(401).send({status:"error",error:"Not authenticated"})
    const token = authHeader.split(" ")[1];
  
    jwt.verify(token,'jwtSecret',(error,credentials) =>{
        if(error) return res.status(401).send({error:"Token inválido"});
        req.user = credentials.user;
        next();
    })
    
};

//no lo usearemos salvo q lo reciva del header edel front
