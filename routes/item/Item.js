import ItemController from '../../controller/item/itemController.js'
import Constantes from '../../util/Constantes.js'
class Item{

    constructor(){
        this.itemController = null
    }

    RoutesMain(app){

        app.post(Constantes.URL_BASE_ITENS.CADASTRAR, (req, res) => {

            this.itemController = new ItemController(req.session?.user?.token, String(req.session?.user?.empresa))
            this.itemController.PostItem(req, res)
        })

        app.put(Constantes.URL_BASE_ITENS.ATUALIZAR, (req, res) => {

            this.itemController = new ItemController(req.session?.user?.token, String(req.session?.user?.empresa))
            this.itemController.PutItem(req, res)
        })

        app.delete(Constantes.URL_BASE_ITENS.DELETAR, (req, res) => {
            
            this.itemController = new ItemController(req.session?.user?.token, String(req.session?.user?.empresa))
            this.itemController.DeleteItem(req, res)
        })

        app.get(Constantes.URL_BASE_ITENS.LISTAR, (req, res) => {

            this.itemController = new ItemController(req.session?.user?.token, String(req.session?.user?.empresa))
            this.itemController.GetItem(req, res)
        })

        app.get(Constantes.URL_BASE_ITENS.LISTAR_ID, (req, res) => {

            this.itemController = new ItemController(req.session?.user?.token, String(req.session?.user?.empresa))
            this.itemController.GetItemById(req, res)
        })

        return app
    }
    
}

export default Item;