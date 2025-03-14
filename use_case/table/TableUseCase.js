import axios from 'axios';
import Constantes from '../../util/Constantes.js';

class TableUseCase {

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    SetToken(token) {

        this.token = token
    }

    SetEmpresa(empresa) {

        this.empresa = empresa
    }

    async GetTable(parametros, url) {
        
        try {
            const headers = {
                'Content-Type': 'application/json',
                'empresa': this.empresa,
            };

            if (this.token) {
                headers.Authorization = `Bearer ${this.token}`;
            }

            const response = await axios.get(url, { headers })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.GET_TABLE_SUCESSO, null, null)

        } catch (error) {

            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_GET_TABLE, error.message, null)
        }
    }
}

export default TableUseCase