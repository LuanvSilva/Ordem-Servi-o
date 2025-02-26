import axios from 'axios'
import Constantes from '../../util/Constantes.js'

class ItemUseCase{
    constructor(token, empresa){
        this.SetToken(token)
        this.SetEmpresa(empresa)
    }

    SetToken(token){

        this.token = token
    }

    SetEmpresa(empresa){

        this.empresa = empresa
    }

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    GetHeaders(){

        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        return headers
    }

    async PostItem(body){

        try {
            const headers = this.GetHeaders()
            const response = await axios.post(Constantes.URL_API_ITEM.CADASTRAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.CADASTRO_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_CADASTRO, error.message, null)
        }
    }

    async PutItem(body){

        try {
            const headers = this.GetHeaders()
            const response = await axios.put(Constantes.URL_API_ITEM.ATUALIZAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.ATUALIZACAO_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_ATUALIZACAO, error.message, null)
        }
    }

    async DeleteItem(body){

        try {
            const headers = this.GetHeaders()
            const response = await axios.delete(Constantes.URL_API_ITEM.DELETAR, { headers, data: body })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.DELETAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_DELETAR, error.message, null)
        }
    }

    async GetItem(){

        try {
            const headers = this.GetHeaders()
            const response = await axios.get(Constantes.URL_API_ITEM.LISTAR, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.LISTAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LISTAR, error.message, null)
        }
    }

    async GetItemById(id){

        try {
            const headers = this.GetHeaders()
            const response = await axios.get(`${Constantes.URL_API_ITEM.LISTAR_ID}${id}`, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.LISTAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LISTAR, error.message, null)
        }
    }
}

export default ItemUseCase;