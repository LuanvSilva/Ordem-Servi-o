import axios from 'axios'
import Constantes from '../util/Constantes.js'

class Routes {
    constructor(app, path, __dirname) {
        this.express = app
        this.app = app.Router()
        this.path = path
        this.__dirname = __dirname
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

        this.LoginAuthRoutes()
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

    LoginAuthRoutes() {
        this.app.post('/api/v1/auth/logar', (req, res) => {

            const { login, senha } = req.body
    
            axios.post(Constantes.URL_API_LOGIN.LOGAR, { login, senha })
                .then(response => {
                   req.session.user = response.data
                    res.status(200).json(
                        this.SetResponse(response.data, true, 'Login realizado com sucesso', null, Constantes.URL_PAGES.HOME))
                })
                .catch(error => {
                    res.status(500).json(
                        this.SetResponse({}, false, 'Erro ao realizar login', error.message, Constantes.URL_PAGES.LOGIN))
                })
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
