import {userServices} from '../services/services.js'

const getAllUsers= async (req,res)=>{
    try{
        const users= await userServices.getUsers()
        res.send({status:'success', payload:users})
     }
     catch(error){
         console.log(error)
    }
}
const putUser = async (req, res) => {
    try {
       const {id} = req.user
        const newuser = req.body
        console.log('me llega el new user peticion', newuser)
        const user = await userServices.updateUser(id,newuser)
        res.send({ status: "success", payload: user })
    } catch (error) {
        console.log(error)
    }
};

const deleteUser=async(req,res)=>{
    try{
        const uid= req.user.id
        console.log('eliminaría a:',uid)
       // const result= await userServices.deleteUser(uid)
       // res.send({status:"success", message: `Se eliminó ${result.first_name}`})
        res.send({status:'success'})
        }
        catch(error){
            console.log(error)
        }
}

 const getUser= async(req,res)=>{
    try{
        const {email}=req.body
        const user = await userServices.updateUserBy('email', email)
        res.send({status:'success', payload: user})
  
 }
 catch(error){
    console.log(error)
}
 }



export default{
    getAllUsers,
    putUser,
    deleteUser,
    getUser
}