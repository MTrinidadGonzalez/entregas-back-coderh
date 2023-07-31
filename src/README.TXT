LOGGER CON WINSTON:

Carpeta services - archivo logger.sevice.js : Clase, incio logger. 
Carpeta meddlewares - archivo logger.meddleware.js : Meddleware, genero req.logger
Carpeta src - archivo app.js : utilizo el meddleware a nivel aplicacion. 
Carpera routers- archivo routers.js- metodo handlePolicies : utilizo req.loggers si: 
    -llega el token y user: logger.info / 
    -si no llega token y user : logger.error
Carpeta controllers- archivo productControllers.js - método addProductToCart:
    -Producto sin stock: req.logger.error
Carpeta config- archivo passport.config.js- estrategia:
    -'register' : usuario ya reqistrado : req.logger.error
    -'login' : correo o contraseña no encontrados: req.logger.error
Carpeta routers- carpeta loggerRouter- archivo logger.router.js : router.get('/loggerTest') 