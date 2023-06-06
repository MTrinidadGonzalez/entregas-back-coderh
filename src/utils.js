import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename= fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)
export default __dirname

import bcrypt from 'bcrypt';
//creo la password
export const createHash = async(password) => {
    
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts);
}
// funcion para comparar la password q ingresa con la encriptada
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password,hashedPassword);