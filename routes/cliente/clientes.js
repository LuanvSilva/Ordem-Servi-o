import Constantes from '../../util/Constantes.js';
import axios from 'axios';

class ClientesRoutes {

    constructor() {
        this.clientesController = new ClientesController()
    }

    RoutesMain(app) {
        app.post(Constantes.URL_BASE_CLIENTES.CADASTRAR, (req, res) => {
            this.clientesController.PostClientes(req, res)
        })

        return app
    }
}

class ClientesController {
    constructor() {
        this.clientesUseCase = new ClientesUseCase()
    }

    async PostClientes(req, res) {

        try {

            const { token, empresa  } = req.session?.user || {}
            const result = await this.clientesUseCase.PostClientes(req.body, token, String(empresa))

            res.json(result)
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message })
        }
    }
}

class ClientesUseCase {

    SetResponse(data, success, message, error, url) {

        return { data, success, message, error, url }
    }

    async PostClientes(body, bearerToken, empresa) {
        try {

            const response = await axios.post(Constantes.URL_API_CLIENTES.CADASTRAR, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: bearerToken ? `Bearer ${bearerToken}` : '', 
                    'empresa ': empresa
                },
            })
            return this.SetResponse(response.data, true, Constantes.MENSAGEM.CADASTRO_SUCESSO, null, null)

        } catch (error) {
            return this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_CADASTRO, error.message, null);
        }
    }
}

export default ClientesRoutes;
