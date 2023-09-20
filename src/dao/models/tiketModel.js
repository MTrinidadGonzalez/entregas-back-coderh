import mongoose from "mongoose";

const collection= 'Tikets'

const schema= new mongoose.Schema({

    purchase: { type: Date, default: Date.now },
    totalQuantity: Number,
    amount:Number,
    code:String,
    purchaser: String,
    status:{
        type:String,
        enum:["false", "true"],
        default:"true"
    }
}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})

const tiketModel= mongoose.model(collection,schema)
export default tiketModel