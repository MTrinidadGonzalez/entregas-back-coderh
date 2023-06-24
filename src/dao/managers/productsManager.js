import productsModel from '../models/productsModel.js';

export default class ProductsManager{
    getProducts= ()=>{
        return productsModel.find().lean()
    }

    getProductBy=(params)=>{
        return productsModel.findOne(params).lean().populate('products.product')
    }

    createProduct=(product)=>{
        return productsModel.create(product)
    }

    createProducts=(products)=>{
        return productsModel.insertMany(products)
    }

    updateProduct=(id, product)=>{
        return productsModel.findByIdAndUpdate(id, {$set: product})
    }

    deleteProduct=(id)=>{
        return productsModel.findByIdAndDelete(id)
    }
}