import Constantes from '../../util/Constantes.js';
import axios from 'axios';
import TableController from '../../controller/table/TableController.js';

class TableRoute {

    constructor() {
        this.tableController = new TableController()
    }

    RoutesMain(app) {

        app.post(Constantes.URL_BASE_TABLE.GET_TABLE, (req, res) => {

            this.tableController.GetTable(req, res)

        })
        return app
    }

}


export default TableRoute