import { Constantes } from "./constantes.js"

class Util{
    constructor(){
    }

    ValidateEmail(email){
        let re = Constantes.VALIDA.EMAIL
        return re.test(email)
    }

    ValidatePassword(password){
   
        let re = Constantes.VALIDA.PASSWORD
        return re.test(password)
    }
}

export { Util }