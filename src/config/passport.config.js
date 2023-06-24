import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import UsersManager from '../dao/managers/usersManager.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { cookieExtractor, createHash, validatePassword } from '../utils.js';

const usersService= new UsersManager()

const LocalStrategy = local.Strategy; 

const initializePassportStrategies = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;
          const exists = await usersService.getUser({ email });
          if (exists)
            return done(null, false, { message: 'El usuario ya existe' });
        
          const hashedPassword = await createHash(password);
          const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          };
          const result = await usersService.createUser(user);
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //para login aca genero al user pero la sesion la inicio en el endpoint
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        if (email === 'admin@admin.com' && password === '123') {
          const user = {
            id: 0,
            name: `Admin`,
            role: 'admin',
            email: '...',
          };
          return done(null, user);
        }
        let user;
      
        user = await usersService.getUser({ email });
        if (!user)
          return done(null, false, { message: 'Credenciales incorrectas' });

        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword)
          return done(null, false, { message: 'Contraseña inválida' });

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

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.e63146038bc90095',
        clientSecret: '72bfccf11d3469bccf973d4362b04fa6380b294f',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
        
          const { name, email } = profile._json;
          const user = await usersService.getUser({ email });
          //DEBO GESTIONAR AMBAS LÓGICAS AQUÍ, OMG!!!
          if(!user) {
           
            const newUser =  {
              first_name: name,
              email,
              password:''
            }
            const result = await usersService.createUser(newUser);
            done(null,result);
          }
          
          done(null,user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //aca va lo de serialize si lo hago con session 
  
  //Passport se encargade la verificación del token
  passport.use('jwt', new Strategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:'jwtSecret'
  }, async(payload,done)=>{
    return done(null,payload);
  }))

};
export default initializePassportStrategies;