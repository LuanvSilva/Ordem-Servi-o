import Constantes from '../../util/Constantes.js'
import MultiSelectUseCase from '../../use_case/multiselect/MultiSelectUseCase.js'

class MultiSelectController {
    constructor() {
        this.multiSelectUseCase = new MultiSelectUseCase()
    }

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    GetUrlByModelo(modelo) {

        switch (modelo) {
            case 'clientes':
                return Constantes.URL_GET_MODELOS_TABLE.GET_CLIENTES;
            case 'categoria':
                return Constantes.URL_GET_MODELOS_TABLE.GET_CATEGORIA;
            case 'status':
                return Constantes.URL_GET_MODELOS_TABLE.GET_STATUS;
            case 'unidade':
                return Constantes.URL_GET_MODELOS_TABLE.GET_UNIDADE;
            case 'tipoItem':
                return Constantes.URL_GET_MODELOS_TABLE.GET_TIPO_DO_ITEM;
            case 'servico':
                return Constantes.URL_GET_MODELOS_TABLE.GET_SERVICO;
            default:
                return null;
        }
    }

    async GetTable(req, res) {
        try {
            const { modelo, parametros } = req.body
            const token = req.session?.user?.token ?? ''

            if (!modelo) {
                return res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, null))
            }

            const url = this.GetUrlByModelo(modelo)

            if (!url) {
                return res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, null))
            }

            const result = await this.multiSelectUseCase.GetTable(parametros, url, token)

            result.data =  result.data.map(item => ({ id: item.id, descricao: item.name || item.descricao || "", codigo: item.codigo || "" }))

            res.json(result)

        } catch (error) {

            res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_GET_TABLE, error.message, null))
        }
    }
}

export default MultiSelectController;