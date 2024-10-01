import axios from 'axios'
import Constantes from '../util/Constantes.js'
import Autenticacao from './autenticacao/autenticacao.js'

class Routes {
    constructor(app, path, __dirname) {
        this.express = app
        this.app = app.Router()
        this.path = path
        this.__dirname = __dirname
        this.rotas_autenticacao = new Autenticacao()

    }

    SetResponse(data, success, message, error, url) {

        return {
            data,
            success,
            message,
            error,
            url,
        }
    }

    SendFile(res, file) {
        res.sendFile(this.path.join(this.__dirname, 'public', 'pages', file))
    }

    RoutesMain() {

        this.app = Object.assign(this.app, this.rotas_autenticacao.Auth(this.app))
        this.RoutesClientes()

        return this.app
    }

    async RoutesLoginMain() {

        this.app.get('/login', (req, res) => this.SendFile(res, '/login/login.html'))
        return this.app
    }

    PagesRoutes() {

        this.app.get('/clientes/cliente',(req, res) => {
            this.SendFile(res, '/clientes/cliente.html')
        })

        this.app.get('/home/home',(req, res) => {
            this.SendFile(res, '/home/home.html')
        })

        this.app.get('/agenda/agenda',(req, res) => {
            this.SendFile(res, '/agenda/agenda.html')
        })

        this.app.get('/relatorio/relatorio',(req, res) => {
            this.SendFile(res, '/relatorio/relatorio.html')
        })

        return this.app
    }


    RoutesClientes() {

        this.app.post("/api/v1/clientes/cadastrarCliente", (req, res) => {
                
            const { nome, cpf, telefone, email, cep } = req.body
    
            axios.post(Constantes.URL_API_CLIENTES.CADASTRAR, { nome, cpf, telefone, email, cep })
                .then(response => {
                    res.status(200).json(
                        this.SetResponse(response.data, true, 'Cliente cadastrado com sucesso', null, null))
                })
                .catch(error => {
                    res.status(500).json(
                        this.SetResponse({}, false, 'Erro ao cadastrar cliente', error.message, null))
                })
        })
    }

}

export default Routes
