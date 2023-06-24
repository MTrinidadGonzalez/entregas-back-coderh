import userModel from '../models/usersModels.js'


export default class UsersManager{
    getUsers= ()=>{
        return userModel.find().lean()
    }

    getUser=(params)=>{
        return userModel.findOne(params).lean()
    }

    createUser=(user)=>{
        return userModel.create(user)
    }

    updateUser=(id, user)=>{
        return userModel.findByIdAndUpdate(id, {$set: user})
    }

    deleteUser=(id)=>{
        return userModel.findByIdAndDelete(id)
    }
}