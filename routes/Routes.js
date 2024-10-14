import Autenticacao from './autenticacao/autenticacao.js';
import express from 'express';
import ClientesRoutes from './cliente/clientes.js';

class Routes {
    constructor(path, __dirname) {
        this.app = express.Router()
        this.path = path
        this.__dirname = __dirname
        this.rotas_autenticacao = new Autenticacao()
        this.rotas_clientes = new ClientesRoutes()
    }

    SetResponse(data, success, message, error, url) {
        return {
            data,
            success,
            message,
            error,
            url,
        };
    }

    SendFile(res, file) {
        res.sendFile(this.path.join(this.__dirname, 'public', 'pages', file));
    }

    async RoutesAuthMain() {
        return await this.rotas_autenticacao.Auth(this.app)
    }

    async RoutesClientMain() {
        return await this.rotas_clientes.RoutesMain(this.app)
    }

    RoutesLoginMain() {
        this.app.get('/login', (req, res) => this.SendFile(res, '/login/login.html'))
        return this.app
    }

    PagesRoutes() {
        this.app.get('/clientes/cliente', (req, res) => this.SendFile(res, '/clientes/cliente.html'))
        this.app.get('/home/home', (req, res) => this.SendFile(res, '/home/home.html'))
        this.app.get('/agenda/agenda', (req, res) => this.SendFile(res, '/agenda/agenda.html'))
        this.app.get('/relatorio/relatorio', (req, res) => this.SendFile(res, '/relatorio/relatorio.html'))
        return this.app
    }
}

export default Routes;
