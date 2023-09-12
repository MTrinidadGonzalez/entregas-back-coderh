import multer from 'multer'
import __dirname from '../../utils.js'
import path from 'path'
/*
const storage= multer.diskStorage({
    destination: function (req,file,callback){
       
        callback(null,`${__dirname}/public/${folder}`)
    },
    filename: function(req,file,callback){
        callback(null,`${Date.now()}-${file.originalname}`)
    } 
})

const uploader= multer({storage})
export default uploader
*/

function createUploader(destinationFolder) {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            const destinationPath = path.join(`${__dirname}/public/files/${destinationFolder}`)
            callback(null, destinationPath);
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    });

    return multer({ storage })
}

export default createUploader