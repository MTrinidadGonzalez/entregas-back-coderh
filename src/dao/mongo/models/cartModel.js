
import mongoose from "mongoose";

const collection= "Carts"

const schema= new mongoose.Schema({
   products:{
    type:[
        {
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products'

            }
        }
    ]
   },
    totalAmount:{
        type:Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    user:{
        type:String,
        default: "user"
    }

},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)

schema.pre('find', function(){
    this.populate('products.product')
})

const cartModel= mongoose.model(collection,schema)
export default cartModel;

