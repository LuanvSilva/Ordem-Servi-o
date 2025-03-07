import Constantes from "./Constantes.js"
import validator from 'validator';

class Validator {

    static isEmail(email) {
        if (!email) return false
        return validator.isEmail(email)
    }

    static isPassword(password) {
        if (!password) return false
        return validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
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
        return validator.isMobilePhone(telefone, 'pt-BR')
    }

    static isCep(cep) {
        if (!cep) return false
        return validator.isPostalCode(cep, 'BR')
    }

    static isCamposArrayPreenchidos(camposVerify, campos) {
        if (!campos) return false
        return camposVerify.every(campo => validator.isEmpty(campos[campo]) === false)
    }

    static isCamposObjPreenchidos(camposVerify, campos) {

        if (!campos) return false

        return camposVerify.every(campo => {
            const value = campos[campo]?.id || campos[campo]
            if(value === true || value === false) return this.isBoolean(value) === true
            return validator.isEmpty(value) === false
        })
    }

    static isCamposPreenchidos(campos) {
        if (!campos) return false
        return validator.isEmpty(campos) === false;
    }

    static isBoolean(value) {
        if (!value) return false
        if(value === true || value === false) return validator.isBoolean(String(value), { strict: true }) === true
    }

    static isDate(date) {
        if (!date) return false
        return validator.isDate(date)
    }

    static isDateAfter(date, dateCompare) {
        if (!date || !dateCompare) return false
        return validator.isAfter(date, dateCompare)
    }

    static IsCurrency(value) {
        if (!value) return false
        return isCurrency(value, { allow_negatives: false, require_decimal: true })
    }

    static ToBoolean(value) {
        if (!value) return false
        return validator.toBoolean(value, true)
    }


}

export default Validator;