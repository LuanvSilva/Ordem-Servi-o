import express from 'express';
import http from 'http';
import Router from './routes/Routes.js';
import path from 'path';
import JwtCheck from './middleware/jwtcheck.js';
import session from 'express-session';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class App {
    constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(express.static(path.join(__dirname, 'public')))
        this.express.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }))
    }

    async routes() {

        const routes = new Router(path, __dirname)
        const jwtCheck = new JwtCheck(process.env.SECRET)

        // Roteamento das páginas e autenticação
        this.express.use('/', await routes.RoutesAuthMain())
        this.express.use('/pages/login', await routes.RoutesLoginMain())
        this.express.use('/pages', jwtCheck.check, await routes.PagesRoutes())
        this.express.use('/api/v1/client', jwtCheck.check, await routes.RoutesClientMain())
        this.express.use('/api/v1/modelos', jwtCheck.check, await routes.RoutesModelosTable())
    }

    startServer() {
        const server = http.createServer(this.express)
        const port = process.env.PORT || 3000 // Define uma porta padrão
        server.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
    }
}

export default App
