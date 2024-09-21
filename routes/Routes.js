import axios from 'axios'
import Constantes from '../util/Constantes.js'

class Routes {
    constructor(app, path, __dirname) {
        this.express = app
        this.app = app.Router()
        this.path = path
        this.__dirname = __dirname
    }

    async RoutesMain(jwtCheck) {

        this.app.get('/login', (req, res) =>{
            this.sendFile(res, '/login/login.html')
        })
        this.LoginRoutes()

        return this.app
    }

    sendFile(res, file) {
        res.sendFile(this.path.join(this.__dirname, 'public', 'pages', file));
    }

    LoginRoutes() {

        this.app.post('/api/vi/auth/logar', (req, res) => {
            const { login, senha } = req.body
    
            axios.post(Constantes.URL_API_LOGIN.LOGAR, { login, senha })
                .then(response => {
                    req.session.user = response.data
                    res.json(response.data)
                })
                .catch(error => {
                   
                    console.error(error)
                    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
                })
        })
    }

    ClientRoutes() {

        this.app.get('/clientes/cliente',(req, res) => {
            this.sendFile(res, 'clientes.html')
        })

        return this.app
    }
}

export default Routes
