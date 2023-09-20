import {userServices} from '../services/services.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'

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
        const uid= req.body.userId
        const userDb= await userServices.getUserById(uid)
        console.log(req.body)
        const newDataUser = {
            first_name: req.body.first_name || userDb.first_name,
            last_name: req.body.last_name || userDb.last_name,
            alias: req.body.alias || userDb.alias,
            email: req.body.email || userDb.email,
           
        }
        const user = await userServices.updateUser(uid,newDataUser)
        res.send({ status: "success" })
    } catch (error) {
        console.log(error)
    }
};

const deleteUser=async(req,res)=>{
    try{
        const {uid}= req.params
       const user= await userServices.getUserById(uid)
       const username= `${user.first_name} ${user.last_name}`
       const userEmail= user.email
        const mailingService= new MailingService()
        const sendEmail= await mailingService.sendMail(userEmail, Dtemplates.DELETE_USER,username)
        const result= await userServices.deleteUser(uid)
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
 const postPremiumDocuments = async (req, res) => {
    //console.log('req.body', req.body);
    const indentificacion=  req.files['identificacion'][0].filename
    const comprobanteDomicilio= req.files['comprobanteDomicilio'][0].filename
    const comprobanteCuenta= req.files['comprobanteEstadoCuenta'][0].filename
    const documnments=[
        {
            name: 'Identificación',
            reference: `http://localhost:8080/api/documents/${indentificacion}?folder=documents`
        },
        {
            name: 'Comprobante de domicilio',
            reference: `http://localhost:8080/api/documents/${comprobanteDomicilio}?folder=documents`
        },
        {
            name: 'Comprobante de Estado de cuenta',
            reference: `http://localhost:8080/api/documents/${comprobanteCuenta}?folder=documents`
        }
    ]
    const response= await userServices.updateUserBy('email',req.user.email,{'documents': [...documnments]})
    console.log(documnments)
    res.send({ status: 'success' });
  };

  const postImgProfile = async (req, res) => {
    try{
       const filename= req.file.filename
       const imgProfile= `http://localhost:8080/api/documents/${req.file.filename}?folder=profile`
       const response= await userServices.updateUserBy('email',req.user.email,{'imgProfile':imgProfile})
        res.send({ status: 'success' })
    }
    catch(error){
    console.log(error)
    }
  }


export default{
    getAllUsers,
    putUser,
    deleteUser,
    getUser,
    postPremiumDocuments,
    postImgProfile
}