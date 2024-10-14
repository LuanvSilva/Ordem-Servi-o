import Autenticacao from './autenticacao/autenticacao.js';
import express from 'express';
import ClientesRoutes from './cliente/clientes.js';
import axios from 'axios';
import Constantes from '../util/Constantes.js';

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

    RoutesModelosTable() {

        this.app.post('/api/v1/modelos/getModelos', async (req, res) => {

            const { modelo,  parametros } =  req.body
            let url = null
            const token = req.session?.user?.token ? `Bearer ${req.session.user.token}` : ''

            if (!modelo) {
                res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, Constantes.MENSAGEM.MODELO_NAO_INFORMADO, null))
            }

            switch (modelo) {
                case 'clientes':
                    url = Constantes.URL_GET_MODELOS_TABLE.GET_CLIENTES
                    break;
                default:
                    res.status(500).json(this.SetResponse({}, false, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, Constantes.MENSAGEM.MODELO_NAO_ENCONTRADO, null))
                    break;
            }

            try {
                const response = await axios.post(url, { parametros }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                })

                res.status(200).json(this.SetResponse(response.data, true, 'Registros encontrados', null, null))
                
            } catch (error) {
                res.status(500).json(this.SetResponse({}, false, 'Erro ao buscar registros', error.message, null))
            }     
        
        });

        return this.app
    }
}

export default Routes;
