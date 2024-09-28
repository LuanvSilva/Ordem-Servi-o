import request from 'supertest'
import { expect } from '@jest/globals'
import App from '../../../../app.js'

let app = new App().express

describe('POST /api/v1/auth/logar', () => {


  it('deve realizar login com sucesso', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({ login: 'luan@teste.com', senha: '1234' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body.data).toHaveProperty('token')
    expect(response.body.message).toBe('Login realizado com sucesso')

  })

  it('deve falhar com credenciais inválidas', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({ login: 'invalido@teste.com', senha: 'senhaerrada' })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Erro ao realizar login')
    console.log(response.body.message)

  })

  it('deve falhar se as credenciais estiverem faltando', async () => {

    const response = await request(app)
      .post('/api/v1/auth/logar')
      .send({}) // Enviando um objeto vazio

    expect(response.status).toBe(400) // ou outro status adequado
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toMatch(/Erro ao realizar login|Email inválido|Senha inválida\. Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial\./);
    console.log(response.body.message)

  })
})
