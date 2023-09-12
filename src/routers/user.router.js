import {userServices} from '../services/services.js'
import usersControllers from '../controllers/users.controllers.js'
import RouterPadre from './router.js'
import {documentsUploader} from '../meddlewares/multer.meddleware.js'
import {imgProfileUploader} from '../meddlewares/multer.meddleware.js'

export default class UserRouter extends RouterPadre{
    init(){

        this.get('/', ["PUBLIC"],usersControllers.getAllUsers)
        this.put('/', ["USER","PREMIUM","ADMIN"], usersControllers.putUser)
        this.delete('/',["USER","PREMIUM","ADMIN"],usersControllers.deleteUser )
        this.post('/user', ["PUBLIC"], usersControllers.getUser)
        
        this.post('/postPremiumDocuments', ["USER","ADMIN","PREMIUM"],documentsUploader,usersControllers.postPremiumDocuments)
        this.post('/postImgProfile', ["USER","ADMIN","PREMIUM"],imgProfileUploader,usersControllers.postImgProfile)
        
    }//cierre del init
}//cierre de la clase