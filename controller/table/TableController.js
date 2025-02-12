import TableUseCase from '../../use_case/table/TableUseCase.js'
import Constantes from '../../util/Constantes.js'

class TableController {
    constructor() {
        this.tableUseCase = new TableUseCase()
    }

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    GetUrlByModelo(modelo) { 
        
        switch (modelo) {
            case 'clientes':
                return Constantes.URL_GET_MODELOS_TABLE.GET_CLIENTES;
            default:
                return null;
        }
    }

    async GetTable(req, res) {
        try {
            const { modelo, parametros } = req.body;
            const token = req.session?.user?.token ?? ''

            if (!modelo) {
                return res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, null))
            }

            const url = this.GetUrlByModelo(modelo)

            if (!url) {
                return res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, null))
            }

            const result = await this.tableUseCase.GetTable(parametros, url, token)
            res.json(result)

        } catch (error) {

            res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_GET_TABLE, error.message, null))
        }
    }
}

export default TableController;