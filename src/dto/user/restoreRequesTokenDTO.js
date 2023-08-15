
export default class RestoreRequestTokenDto{
    static getFrom= user =>{
        return {
            email: user.email
        }
    }
}