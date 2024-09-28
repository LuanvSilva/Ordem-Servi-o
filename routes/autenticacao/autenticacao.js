import Routes from '../Routes.js'
import axios from 'axios'
import Constantes from '../../util/Constantes.js'
import Validator from '../../util/Validator.js'


class Autenticacao{

  constructor(teste = false) {
    this.teste = teste
  }

  Auth(app) {

    app.post('/api/v1/auth/logar', async (req, res) => {
        const { email, senha } = req.body

        if (!Validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: Constantes.MENSAGEM.EMAIL_INVALIDO,
                redirectUrl: Constantes.URL_PAGES.LOGIN,
            })
        }
    
        if (!Validator.isPassword(senha)) {
            return res.status(400).json({
                success: false,
                message: Constantes.MENSAGEM.SENHA_INVALIDA,
                redirectUrl: Constantes.URL_PAGES.LOGIN,
            })
        }
    
        try {
       
            const response = await axios.post(Constantes.URL_API_LOGIN.LOGAR, { email, senha })
            //req.session.user = response.data
    
            return res.status(200).json(
                this.SetResponse(response.data, true, Constantes.MENSAGEM.LOGIN_SUCESSO, null, Constantes.URL_PAGES.HOME)
            )
        } catch (error) {
            return res.status(500).json(
                this.SetResponse({}, false, Constantes.MENSAGEM.ERRO_LOGIN, error.message, Constantes.URL_PAGES.LOGIN)
            )
        }
    })

    return app
  }
}

export default Autenticacao
