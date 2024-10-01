import axios from 'axios'
import Constantes from '../../util/Constantes.js'
import Validator from '../../util/Validator.js'


class Autenticacao{

  constructor(teste = false) {
    this.teste = teste
  }
  
  SetResponse(data, success, message, error, url) {

    return {
        data,
        success,
        message,
        error,
        url,
    }
}

  Auth(app) {

    app.post('/api/v1/auth/logar', async (req, res) => {
        const { login, password } = req.body

        if (!Validator.isEmail(login)) {
            return res.status(400).json({
                success: false,
                message: Constantes.MENSAGEM.EMAIL_INVALIDO,
                redirectUrl: Constantes.URL_PAGES.LOGIN,
            })
        }
    
        if (!Validator.isPassword(password)) {
            return res.status(400).json({
                success: false,
                message: Constantes.MENSAGEM.SENHA_INVALIDA,
                redirectUrl: Constantes.URL_PAGES.LOGIN,
            })
        }
    
        try {
            const response = await axios.post(Constantes.URL_API_LOGIN.LOGAR, { login, password })
            req.session.user = response.data
    
            return res.status(response.status).json(
                this.SetResponse(response.data, true, Constantes.MENSAGEM.LOGIN_SUCESSO, null, Constantes.URL_PAGES.HOME)
            )
        } catch (error) {
            return res.status(error.status).json(
                this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LOGIN, error.message, Constantes.URL_PAGES.LOGIN)
            )
        }
    })

    return app
  }
}

export default Autenticacao
