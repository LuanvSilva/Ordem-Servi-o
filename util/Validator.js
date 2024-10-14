import Constantes from "./Constantes.js"

class Validator {

    static isEmail(email) {
        if (!email) return false
        return Constantes.VALIDA.EMAIL.test(email)
    }

    static isPassword(password) {
        if (!password) return false
        return Constantes.VALIDA.PASSWORD.test(password)
    }

    static isCpf(cpf) {
        if (!cpf) return false
        return Constantes.VALIDA.CPF.test(cpf)
    }

    static isCnpj(cnpj) {
        if (!cnpj) return false
        return Constantes.VALIDA.CNPJ.test(cnpj)
    }

    static isTelefone(telefone) {
        if (!telefone) return false
        return Constantes.VALIDA.TELEFONE.test(telefone)
    }

    static isCep(cep) {
        if (!cep) return false
        return Constantes.VALIDA.CEP.test(cep)
    }

    static isCamposArraPreenchidos(campos) {
        if (!campos) return false
        return Array.isArray(campos) && campos.every(campo => campo != null && campo.trim() !== '');
    }

    static isCamposObjPreenchidos(campos) {
        if (!campos) return false
        return Object.keys(campos).every(key => campos[key] != null && campos[key].trim() !== '');
    }

    static isCamposPreenchidos(campos) {
        if (!campos) return false
        return campos != null && campos.trim() !== '';
    }
    
}

export default Validator;