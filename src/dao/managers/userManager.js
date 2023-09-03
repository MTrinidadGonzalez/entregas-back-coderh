import userModel from "../models/userModel.js";


export default class UserManager{
    getUsers= ()=>{
        return userModel.find().lean().populate('cart')
    }

    getUser=(params,user)=>{
        return userModel.findOne({[params]: user}).lean().populate('cart')
    }
    
    updateUserBy = (params, user, newData) => {
        return userModel.findOneAndUpdate({ [params]: user }, newData, { new: true });
    }


    uptateUserRole=(userId, newRole)=>{
        return userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true })
    }

    createUser=(user)=>{
        return userModel.create(user)
    }

    updateUser=(uid, user)=>{
        return userModel.findByIdAndUpdate(uid, {$set: user})
    }

    deleteUser=(uid)=>{
        return userModel.findByIdAndDelete(uid)
    }

}