import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection= 'Products'
const schema= new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:{
        type:String,
        enum:["remeras","pantalones", "abrigos","accesorios"]
    } ,
    stock:{
        type:Number,
        default: 10
    },
    code: String,
    img: String,
    status:{
        type: String,
        default:true
    },
    quantity:{
        type: Number,
        default: 1
    },
    owner: {
        type: String,
        default: 'ADMIN'
    }
}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)
schema.plugin(mongoosePaginate)
const productsModel= mongoose.model(collection, schema)
export default productsModel;