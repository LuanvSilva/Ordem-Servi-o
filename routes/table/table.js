import Constantes from '../../util/Constantes.js';
import axios from 'axios';

class TableRoute {

    constructor() {
        this.tableController = new TableController()
    }

    RoutesMain(app) {

        app.post(Constantes.URL_BASE_TABLE.GET_TABLE, (req, res) => {

            this.tableController.GetTable(req, res)

        })
        return app
    }

}

class TableController {

    constructor() {
        this.tableUseCase = new TableUseCase()
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

            const result = await this.tableUseCase.GetTable(parametros, url, token)
            res.json(result)

        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message })
        }
    }
}

class TableUseCase {

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

export default TableRoute