import axios from 'axios'
import Constantes from '../util/Constantes.js'

class Routes {
    constructor(app, path, __dirname) {
        this.app = app.Router()
        this.path = path
        this.__dirname = __dirname
    }

    RoutesMain() {

        this.app.get('/', (req, res) => this.sendFile(res, 'home.html'))
        this.app.get('/login', (req, res) => this.sendFile(res, 'login.html'))
        this.LoginRoutes()
        this.ClientRoutes()

        return this.app
    }

    sendFile(res, file) {
        res.sendFile(this.path.join(this.__dirname, 'public', 'pages', file));
    }

    LoginRoutes() {

        this.app.post('/api/vi/auth/logar', (req, res) => {
            const { email, password } = req.body
    
            axios.post(Constantes.URL_API_LOGIN.LOGAR, { email, password })
                .then(response => {
                    res.json(response.data)
                })
                .catch(error => {
                   
                    console.error(error)
                    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
                })
        })
    }

    ClientRoutes() {
        this.app.get('/cliente', (req, res) => res.send('Cliente'))
    }
}

export default Routes
