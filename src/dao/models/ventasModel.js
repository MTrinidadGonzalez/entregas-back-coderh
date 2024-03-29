import mongoose from "mongoose";

const collection= 'Ventas'

const schema= new mongoose.Schema({
    comprador:{
        type:String,
        default:'USER'
    },
    products:[
        {
            description:String,
            quantity: Number,
            price:Number,
            owner:String,
            talle:String,
            color:String
        }
    ],
    totalQuantity:String,
    totalAmount:Number,
    fecha: Date

}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})

const ventasModel= mongoose.model(collection,schema)
export default ventasModel