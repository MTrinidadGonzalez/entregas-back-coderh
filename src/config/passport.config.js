import passport from 'passport'
import local from 'passport-local'
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'
import {createHash , validatePassword} from '../utils.js'

const userService= new UsersManager()
const LocalStrategy= local.Strategy

const initializePassportStrategies = () => {
    
    ////////funcion para register
    passport.use(
      'register',
      new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
          try {
            const { first_name, last_name } = req.body;
            //busco si el usuario ya existe:
            const exists = await userService.getUser({ email });
            //false porque no guarde usuario en req.user:
            if (exists)
              return done(null, false, { message: 'El usuario ya está registrado' });
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
            done(null, result);
          } catch (error) {
            done(error);
          }
        }
      )
    )
/////////funcion para login
passport.use('login', new LocalStrategy({usernameField:'email'}, async(email,password,done)=>{

if(email=== 'admin@correo' && password=== '12345'){
   let user={
        name: 'administrador',
        role:'admin',
        email: '.'
    }
    return done(null, user)
}
const user= await userService.getUser({email})
if(!user) return done(null, false, {message: 'Usuario no encontrado'})

const isValidePass= await validatePassword(password,user.password)
if(!isValidePass) return done(null, false, {message:'Contraseña incorrecta'})

//la sesion la pngo en el router de loguin, con este codigo nada mas le paso al usuario q se creo con los filtros

user={
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role
}
}))



};

    export default initializePassportStrategies