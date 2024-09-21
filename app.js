import express from 'express'
import http from 'http'
import Router from './routes/Routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class App {

  constructor() {
    this.express = express()
    this.Middlewares()
    this.Routes()
  }

  Middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.static(path.join(__dirname, 'public')))
  }

  async Routes() {
    const routes = new Router(express, path, __dirname)
    this.express.use('/', await routes.RoutesMain())
  }

  async startServer() {
    const server = http.createServer(this.express)
    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
  }
}

new App().startServer()
