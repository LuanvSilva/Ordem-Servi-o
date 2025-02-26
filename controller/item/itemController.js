import ItemUseCase from '../../use_case/item/ItemUseCase.js'

class itemController{
    constructor(token, empresa){
        this.itemUseCase = new ItemUseCase(token, empresa)
    }

    async PostItem(req, res){
        
        let result = await this.itemUseCase.PostItem(req.body)
        result.success ? res.status(200).json(result) : res.status(400).json(result)
    }

    async PutItem(req, res){
       
        let result = await this.itemUseCase.PutItem(req.body)
        result.success ? res.status(200).json(result) : res.status(400).json(result)
    }

    async DeleteItem(req, res){

        let result = await this.itemUseCase.DeleteItem(req.body)
        result.success ? res.status(200).json(result) : res.status(400).json(result)
    }

    async GetItem(req, res){
        
        let result = await this.itemUseCase.GetItem()
        result.success ? res.status(200).json(result) : res.status(400).json(result)
    }

    async GetItemById(req, res){

        let result = await this.itemUseCase.GetItemById(req.params.id)
        result.success ? res.status(200).json(result) : res.status(400).json(result)
    }
}

export default itemController;