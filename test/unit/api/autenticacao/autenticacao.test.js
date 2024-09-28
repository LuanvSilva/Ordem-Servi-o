import express from 'express'
import request from 'supertest'
import { expect } from '@jest/globals'
import Router from '../../../../routes/Routes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let routes

// Função para inicializar a aplicação
const createApp = async () => {

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(session({
    secret: process.env.SECRET || 'secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }))

  routes = new Router(express, path, __dirname)
  app.use("/", await routes.RoutesMain())

  return app
}

describe('POST /api/v1/auth/logar', () => {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  it('deve realizar login com sucesso', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({ login: 'luan@teste.com', senha: '1234' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body.data).toHaveProperty('token')

  })

  it('deve falhar com credenciais inválidas', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({ login: 'invalido@teste.com', senha: 'senhaerrada' })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    console.log(response.body.message)
    expect(response.body.data).toHaveProperty('token')

  })

  it('deve falhar se as credenciais estiverem faltando', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({}) // Enviando um objeto vazio

    expect(response.status).toBe(500) // ou outro status adequado
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    console.log(response.body.message)
    expect(response.body.data).toHaveProperty('token')

  })
})
