import request from 'supertest'
import { expect } from '@jest/globals'
import App from '../../../../app.js'

class AuthTests {
  constructor() {
    this.app = new App().express
    
  }

  async loginSuccess() {

    const response = await request(this.app)
      .post('/api/v1/auth/logar')
      .send({ login: 'admin@teste.com', password: 'Admin2024@' })

    console.log(response.body.message)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body.data).toHaveProperty('token')
    expect(response.body.message).toBe('Login realizado com sucesso')

  }

  async loginFailureInvalidCredentials() {

    const response = await request(this.app)
      .post('/api/v1/auth/logar')
      .send({ login: 'invalido@teste.com', password: 'senhaerrada' })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toMatch(/Erro ao realizar login|Email inválido|Senha inválida\. Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial\./);
    console.log(response.body.message)

  }

  async loginFailureMissingCredentials() {

    const response = await request(this.app)
      .post('/api/v1/auth/logar')
      .send({}) // Enviando um objeto vazio

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toMatch(/Erro ao realizar login|Email inválido|Senha inválida\. Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial\./);
    console.log(response.body.message)

  }
}

export default AuthTests

describe('POST /api/v1/auth/logar', () => {

  const authTests = new AuthTests()

  it('deve realizar login com sucesso', async () => {
    await authTests.loginSuccess()
  })

  it('deve falhar com credenciais inválidas', async () => {
    await authTests.loginFailureInvalidCredentials()
  })

  it('deve falhar se as credenciais estiverem faltando', async () => {
    await authTests.loginFailureMissingCredentials()
  })
})
