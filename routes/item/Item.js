import ItemController from '../../controllers/item/ItemController'
import Constantes from '../../util/Constantes'
class Item{

    constructor(){
        this.itemController = new ItemController()
    }

    RoutesMain(app){

        app.post(Constantes.URL_BASE_ITENS.CADASTRAR, (req, res) => {

            this.itemController.PostItem(req, res)
        })

        app.put(Constantes.URL_BASE_ITENS.ATUALIZAR, (req, res) => {

            this.itemController.PutItem(req, res)
        })

        app.delete(Constantes.URL_BASE_ITENS.DELETAR, (req, res) => {
            
            this.itemController.DeleteItem(req, res)
        })

        app.get(Constantes.URL_BASE_ITENS.LISTAR, (req, res) => {

            this.itemController.GetItem(req, res)
        })

        app.get(Constantes.URL_BASE_ITENS.LISTAR_ID, (req, res) => {

            this.itemController.GetItemById(req, res)
        })

        return app
    }
    
}

export default Item;