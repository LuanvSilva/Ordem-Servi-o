import Constantes from "./Constantes";

class Validator {

    static isEmail(email) {
        if (!email) return false
        return email.test(Constantes.VALIDA.EMAIL)
    }

    static isPassword(password) {
        if (!password) return false
        return password.test(Constantes.VALIDA.PASSWORD)
    }

    static isCpf(cpf) {
        if (!cpf) return false
        return cpf.test(Constantes.VALIDA.CPF)
    }

    static isCnpj(cnpj) {
        if (!cnpj) return false
        return cnpj.test(Constantes.VALIDA.CNPJ)
    }

    static isTelefone(telefone) {
        if (!telefone) return false
        return telefone.test(Constantes.VALIDA.TELEFONE)
    }

    static isCep(cep) {
        if (!cep) return false
        return cep.test(Constantes.VALIDA.CEP)
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