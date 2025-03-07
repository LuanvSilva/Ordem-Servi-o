import ItemUseCase from '../../use_case/item/ItemUseCase.js'
import Validator from '../../util/Validator.js'
class itemController{
    constructor(token, empresa){
        this.itemUseCase = new ItemUseCase(token, empresa)
    }

    async PostItem(req, res){
        
        const campos = ['codigo', 'descricao', 'unidade', 'valor', 'tipo', 'categoria', 'ativo', 'observacao']

        if(!Validator.isCamposObjPreenchidos(campos, req.body)){
            return res.status(400).json({ success: false, error: 'Preencha todos os campos obrigatórios!' })
        }

        const values = new Object()
        values.codigo = req.body.codigo
        values.descricao = req.body.descricao
        values.unidadeId = req.body.unidade.id
        values.valor = req.body.valor
        values.tipoId = req.body.tipo.id
        values.categoriaId = req.body.categoria.id
        values.ativo = req.body.ativo
        values.observacao = req.body.observacao
        values.dataHoraCadastro = new Date().toISOString()
        values.dataHoraAtualizacao = new Date().toISOString()

        let result = await this.itemUseCase.PostItem(values)
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