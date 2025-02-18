import axios from 'axios'
import Constantes from '../../util/Constantes.js'

class SolicitacaoUseCase{
    
    constructor(){
        this.SetEmpresa(null)
        this.SetToken(null)
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

    async PostSolicitacao(body){

        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const response = await axios.post(Constantes.URL_API_SOLICITACAO.CADASTRAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.CADASTRO_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_CADASTRO, error.message, null)
        }
    }

    async PutSolicitacao(body){

        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const response = await axios.put(Constantes.URL_API_SOLICITACAO.ATUALIZAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.ATUALIZACAO_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_ATUALIZACAO, error.message, null)
        }
        
    }

    async DeleteSolicitacao(body){

        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const response = await axios.delete(Constantes.URL_API_SOLICITACAO.DELETAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.DELETAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_DELETAR, error.message, null)
        }
        
    }

    async GetSolicitacao(){
        
        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const response = await axios.get(Constantes.URL_API_SOLICITACAO.LISTAR, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.LISTAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LISTAR, error.message, null)
        }
        
    }

    async GetSolicitacaoById(id){
        
        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const url = `${Constantes.URL_API_SOLICITACAO.LISTAR_ID}${id}`
            const response = await axios.get(url, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.LISTAR_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LISTAR, error.message, null)
        }
        
    }

    async PatchSolicitacaoAlteraStatus(body){
        
        const headers = {
            'Content-Type': 'application/json',
            'empresa': this.empresa
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`
        }

        try {
            const response = await axios.patch(Constantes.URL_API_SOLICITACAO.ALTERAR_STATUS, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.ALTERAR_STATUS_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_ALTERAR_STATUS, error.message, null)
        }
        
    }
}

export default SolicitacaoUseCase;