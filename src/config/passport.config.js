
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'
import {createHash , validatePassword} from '../utils.js'
import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'

const userService= new UsersManager()
const LocalStrategy= local.Strategy

const initializePassportStrategies = () => {
    
    ////////funcion para register
    passport.use(
      'register',
      new LocalStrategy(
        { passReqToCallback:true, usernameField:'email' },
        async (req, email, password, done) => {
          try {
            const { first_name, last_name } = req.body;
            //busco si el usuario ya existe:
            const exists = await userService.getUser({ email });
            //false porque no guarde usuario en req.user:
            if (exists) return done(null, false, { message: 'El usuario ya está registrado' });
            //Encripto la password
            const hashedPassword = await createHash(password);
            //Registro al usuario
            const user = {
              first_name,
              last_name,
              email,
              password: hashedPassword,
            };
            const result = await userService.createUser(user);
            //Ahi finalizo el done y en lugar de false le mando el result
            done(null, result,{message:'se creo la sesion'});
          } 
          catch (error) {
            done(error);
          }
        }
      )
    )
/////////funcion para login
passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      //PASSPORT SÓLO DEBE DEVOLVER AL USUARIO FINAL, ÉL NO ES RESPONSABLE DE LA SESIÓN
      if (email === 'admin@admin.com' && password === '123') {
        //Desde aquí ya puedo inicializar al admin.
        const user = {
          id: 0,
          name: `Admin`,
          role: 'admin',
          email: '...',
        };
        return done(null, user);
      }
      let user;
      //busco si el user existe
      user = await userService.getUser({ email }); //Sólo busco por mail
      if (!user)
        return done(null, false, { message: 'Credenciales incorrectas' });

      //verifico la contraseña

      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword)
        return done(null, false, { message: 'Contraseña inválida' });

      //devuelvo al user y la sesion se hace en el endpoint

      user = {
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      };
      return done(null, user);
    }
  )
);


////Github strategy:
passport.use('github', new GithubStrategy({
  clientID:'Iv1.e63146038bc90095',
  clientSecret: '72bfccf11d3469bccf973d4362b04fa6380b294f',
  callbackURL:'http://localhost:8080/api/session/githubcallback',
},async (accessToken, refreshToken, profile, done)=>{
try{
 
const {name, email}= profile._json
const user= await userService.getUser({email})
if(!user){
  const newUser={
    first_name: name,
    last_name:"",
    email,
    password: ''
  }
  const result= await userService.createUser(newUser)
  done(null, result)
}
else{
  done(null,user)
}
}
catch(error){ 
  done(error)
}
}
))

//serializessssss
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  if (id === 0) {
    return done(null, {
      role: 'admin',
      name: 'ADMIN',
    });
  }
  const user = await userService.getUser({ _id: id });
  return done(null, user);
});

};

    export default initializePassportStrategies