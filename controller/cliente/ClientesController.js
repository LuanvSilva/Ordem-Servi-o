import ClientesUseCase from '../../use_case/cliente/ClientesUseCase.js'

class ClientesController {

    constructor() {
        this.clientesUseCase = new ClientesUseCase()
    }

    async PostClientes(req, res) {

        try {

            const { token, empresa  } = req.session?.user?.token || {}
            const result = await this.clientesUseCase.PostClientes(req.body, token, String(empresa))

            res.json(result)

        } catch (error) {

            res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message })
        }
    }
}

export default ClientesController