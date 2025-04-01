import Constantes from '../../util/Constantes.js'
import TranslateController from '../../controller/translate/translateController.js'

class translateRouter{
    constructor(app, token, empresa){
        this.app = app
        this.token = token
        this.empresa = empresa
        this.translateController = null
    }

    SetApp(app){
        this.app = app
    }

    RoutesMain(app){

        this.SetApp(app)

        this.app.post(Constantes.URL_BASE_TRANSLATE.GET_TRANSLATE, (req, res) => {
            
            this.translateController = new TranslateController()
            this.translateController.GetTranslate(req, res)
        })

        return this.app
    }
}

export default translateRouter