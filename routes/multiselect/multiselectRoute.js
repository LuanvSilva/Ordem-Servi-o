import Constantes from '../../util/Constantes.js';
import axios from 'axios';
import MultiSelectController from '../../controller/multiselect/MultiSelectController.js';

class MultiSelectRoute {

    constructor() {

        this.multiSelectController = new MultiSelectController()
    }

    RoutesMain(app) {

        app.post(Constantes.URL_GET_MODELOS_MULTISELECT.GET_CLIENTES, (req, res) => {

            this.multiSelectController.GetTable(req, res)

        })
        return app
    }

}

export default MultiSelectRoute