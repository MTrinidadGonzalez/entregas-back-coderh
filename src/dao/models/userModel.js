import mongoose from "mongoose";

const collection= 'Users'
const schema= new mongoose.Schema({
   
    imgProfile:{
        type:String,
        default:'https://i.pinimg.com/564x/3b/94/6e/3b946eb954f03a7eb2bbe6bfa02a22be.jpg'
    },
    first_name: String, 
    last_name: String,
    alias:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true,
        unique:true
    },
    cart:[
        {
            type: mongoose.SchemaTypes.ObjectId,
             ref: 'Carts',
           
        }
    ],
    role:{
        type:String,
        enum:['ADMIN', 'USER', 'PREMIUM'],
        default: 'USER'
    },
    documents:[
        {
            name:String,
            reference: String
        }
    ],
    las_conection:String
})
      
const userModel= mongoose.model(collection, schema)
export default userModel