import axios from 'axios';
import Constantes from '../../util/Constantes.js';

class MultiSelectUseCase {

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    async GetTable(parametros, url, bearerToken) {

        try {

            const headers = {
                'Content-Type': 'application/json'
            }

            if (bearerToken) {
                headers.Authorization = `Bearer ${bearerToken}`
            }

            const response = await axios.get(url, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.GET_TABLE_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_GET_TABLE, error.message, null)
        }
    }
}

export default MultiSelectUseCase