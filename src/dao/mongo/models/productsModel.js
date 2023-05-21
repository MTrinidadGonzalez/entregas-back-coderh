import mongoose from "mongoose";

const collection= 'Products'

const schema= new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category: String,
    stock:{
        type:Number,
        default: 10
    },
    code: String,
    thumbnail: Array,
    status:{
        type: String,
        default:false
    },
    quantity:{
        type: Number,
        default: 1
    }
}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)

const productsModel= mongoose.model(collection, schema)
export default productsModel;