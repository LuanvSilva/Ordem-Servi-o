import Constantes from '../../util/Constantes.js';
import axios from 'axios';

class MultiSelectRoute {

    constructor() {
        this.multiSelectController = new MultiSelectController()
    }

    RoutesMain(app) {

        app.post(Constantes.URL_GET_MODELOS_MULTISELECT.GET_CLIENTES, (req, res) => {

            this.multiSelectController.GetTable(req, res)

        })
        return app
    }

}

class MultiSelectController {

    constructor() {
        this.multiSelectUseCase = new MultiSelectUseCase()
    }

    async GetTable(req, res) {

        try {

            let url = null
            const { modelo,  parametros } =  req.body
            const token = req.session?.user?.token ? req.session.user.token : ''

            if (!modelo) {
                res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, null))
            }

            switch (modelo) {

                case 'clientes':
                    url = Constantes.URL_GET_MODELOS_TABLE.GET_CLIENTES
                    break;
                default:
                    res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, null))
                    break;
            }

            const result = await this.multiSelectUseCase.GetTable(parametros, url, token)

            result.data = result.data.map((item) => {
                return { value: item.id, label: item.name }
            })

            res.json(result)

        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message })
        }
    }
}

class MultiSelectUseCase {

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    async GetTable(parametros, url, bearerToken) {

        try {

            const response = await axios.post(url, { parametros }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`,
                },
            })

            return this.SetResponse(response.data, true, Constantes.MENSAGEM.GET_TABLE_SUCESSO, null, null)

        } catch (error) {
            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_GET_TABLE, error.message, null);
        }
    }
}

export default MultiSelectRoute