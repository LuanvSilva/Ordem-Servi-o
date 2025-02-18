import SolicitacaoUseCase from '../../use_case/solicitacao/SolicitacaoUseCase.js'

class SolicitacaoController{
    
    constructor(){
        this.solicitacao_useCase = new SolicitacaoUseCase()
        this.SetToken(req.session?.user?.token)
        this.SetEmpresa(String(req.session?.user?.empresa))

    }

    SetToken(token){

        this.solicitacao_useCase.SetToken(token)
    }

    SetEmpresa(empresa){

        this.solicitacao_useCase.SetEmpresa(empresa)
    }

    async PostSolicitacao(req, res){

        let solicitacao = await this.solicitacaoService.PostSolicitacao(req.body)
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }

    async PutSolicitacao(req, res){

        let solicitacao = await this.solicitacaoService.PutSolicitacao(req.body)
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }

    async DeleteSolicitacao(req, res){

        let solicitacao = await this.solicitacaoService.DeleteSolicitacao(req.body)
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }

    async GetSolicitacao(req, res){

        let solicitacao = await this.solicitacaoService.GetSolicitacao()
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }

    async GetSolicitacaoById(req, res){

        let solicitacao = await this.solicitacaoService.GetSolicitacaoById(req.params.id)
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }

    async PatchSolicitacaoAlteraStatus(req, res){

        let solicitacao = await this.solicitacaoService.PatchSolicitacaoAlteraStatus(req.body)
        solicitacao.success ? res.status(200).json(solicitacao) : res.status(400).json(solicitacao)
    }
}

export default SolicitacaoController;