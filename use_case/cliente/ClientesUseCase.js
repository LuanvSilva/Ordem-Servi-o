import axios from 'axios';
import Constantes from '../../util/Constantes.js';

class ClientesUseCase {

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    async PostClientes(body, bearerToken, empresa) {

        try {
            const headers = {
                'Content-Type': 'application/json',
                'empresa': empresa
            }

            if (bearerToken) {
                headers.Authorization = `Bearer ${bearerToken}`
            }
            
            const response = await axios.post(Constantes.URL_API_CLIENTES.CADASTRAR, body, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.CADASTRO_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_CADASTRO, error.message, null)
        }
    }
}

export default ClientesUseCase;