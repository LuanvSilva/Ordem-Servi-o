import axios from 'axios'
import Constantes from '../util/Constantes.js'

class Routes {
    constructor(app, path, __dirname) {
        this.express = app
        this.app = app.Router()
        this.path = path
        this.__dirname = __dirname
    }

    async RoutesMain() {

        this.app.get('/login', (req, res) => this.sendFile(res, '/login/login.html'))
        this.LoginRoutes()
        return this.app
    }

    sendFile(res, file) {
        res.sendFile(this.path.join(this.__dirname, 'public', 'pages', file));
    }

    PagesRoutes() {

        this.app.get('/clientes/cliente',(req, res) => {
            this.sendFile(res, '/clientes/cliente.html')
        })

        this.app.get('/home/home',(req, res) => {
            this.sendFile(res, '/home/home.html')
        })

        this.app.get('/agenda/agenda',(req, res) => {
            this.sendFile(res, '/agenda/agenda.html')
        })

        this.app.get('/relatorio/relatorio',(req, res) => {
            this.sendFile(res, '/relatorio/relatorio.html')
        })

        return this.app
    }

    LoginRoutes() {

        this.app.post('/api/vi/auth/logar', (req, res) => {

            const { login, senha } = req.body
    
            axios.post(Constantes.URL_API_LOGIN.LOGAR, { login, senha })
                .then(response => {
                    req.session.user = response.data
                    res.status(200).json(
                        this.DataResponse({}, Constantes.URL_PAGES.HOME, 'Login realizado com sucesso', true, null))
                })
                .catch(error => {
                    console.error(error)
                    res.status(500).json(
                        this.DataResponse({}, Constantes.URL_PAGES.LOGIN,'Erro ao realizar login', false, error.message))
                })
        })

        return this.app

    }

    DataResponse(data, url, message, success, error) {

        return {
            data,
            url,
            message,
            success,
            error
        }
    }

}

export default Routes
