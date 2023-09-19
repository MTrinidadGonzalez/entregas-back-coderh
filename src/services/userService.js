
export default class UserServices{

        constructor(dao){
            this.dao= dao
        }
        getUsers(){
            return this.dao.getUsers()
        }

        getUserById=(uid)=>{
            return this.dao.getUserById(uid)
        }

        getUser(params,user){
            return this.dao.getUser(params,user)
        }

        uptateUserRole=(userId, newRole)=>{
            return this.dao.uptateUserRole(userId,newRole)
        }

        createUser(user){
            return this.dao.createUser(user)
        }

        updateUser(uid,user){
            return this.dao.updateUser(uid,user)
        }

        updateUserBy(params, user, newData){
            return this.dao.updateUserBy(params, user, newData)
        }

        deleteUser(uid){
            return this.dao.deleteUser(uid)
        }
}