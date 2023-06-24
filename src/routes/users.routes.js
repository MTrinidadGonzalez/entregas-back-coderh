import RouterBase from '../router.js'
import UsersManager from '../dao/managers/usersManager.js'



const usersServices= new UsersManager

export default class UserRouter extends RouterBase{
    init(){
        this.get('/', async(req, res)=>{
            const users= await usersServices.getUsers()
            console.log(users)
            res.send({status:'success', payload: users})
     
        })

        this.post('/', async(req,res)=>{
            const {first_name, last_name,email, password}=req.body
            const user= {
                first_name,
                last_name,
                email,
                password
            }
            const result = await usersServices.createUser(user)
        
            res.send({status:'success', payload: result})
            console.log(user)

        })
      

        this.put('/:uid',async (req,res)=>{
            const {uid}= req.params
            const newDataUser= req.body 
            const result = await usersServices.updateUser(uid, newDataUser)
            res.send({status:'success', payload:result})
        })

        
        this.delete('/:uid',async (req,res)=>{
            const {uid}= req.params 
            const result = await usersServices.deleteUser(uid)
            res.send({status:'success', payload:result})
        })
       
    }//cierre de llave del init 

}//llave de cierre de la clase    





  /**
   * usuarios que agregue probar despues lo de login
   {
  "first_name": "Hugo",
  "last_name": "Apellido de Hugo",
  "email": "hugo@correo",
  "password": "12345"
}    
  {
  "first_name": "Paola",
  "last_name": "Apellido de Paola",
  "email": "paola@correo",
  "password": "12345"
}    

 {
  "first_name": "Rana",
  "last_name": "Saltarina",
  "email": "rana@correo",
  "password": "12345"
}    



 */