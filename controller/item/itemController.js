import ItemUseCase from '../../useCase/item/itemUseCase.js'

class itemController{
    constructor(){
        this.itemUseCase = new ItemUseCase()
        this.SetToken(req.session?.user?.token)
        this.SetEmpresa(String(req.session?.user?.empresa))
    }

    SetToken(token){

        this.itemUseCase.SetToken(token)
    }

    SetEmpresa(empresa){

        this.itemUseCase.SetEmpresa(empresa)
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