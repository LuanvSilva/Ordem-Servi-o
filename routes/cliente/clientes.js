import Constantes from '../../util/Constantes.js';
import ClientesController from '../../controller/cliente/ClientesController.js';

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

export default ClientesRoutes
