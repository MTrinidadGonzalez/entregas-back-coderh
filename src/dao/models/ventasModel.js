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
            owner:String
        }
    ],
    totalAmount:Number

}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})

const ventasModel= mongoose.model(collection,schema)
export default ventasModel