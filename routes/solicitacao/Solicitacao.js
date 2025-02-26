
import SolicitacaoController from '../../controller/solicitacao/SolicitacaoController.js'
import Constantes from '../../util/Constantes.js'
class Solicitacao{

    constructor(){

        this.solicitacaoController = null
    }

    RoutesMain(app){

        app.post(Constantes.URL_BASE_SOLICITACOES.CADASTRAR, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.PostSolicitacao(req, res)
        })

        app.put(Constantes.URL_BASE_SOLICITACOES.ATUALIZAR, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.PutSolicitacao(req, res)
        })

        app.delete(Constantes.URL_BASE_SOLICITACOES.DELETAR, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.DeleteSolicitacao(req, res)
        })

        app.get(Constantes.URL_BASE_SOLICITACOES.LISTAR, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.GetSolicitacao(req, res)
        })

        app.get(Constantes.URL_BASE_SOLICITACOES.LISTAR_ID, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.GetSolicitacaoById(req, res)
        })

        app.patch(Constantes.URL_BASE_SOLICITACOES.ALTERAR_STATUS, (req, res) => {

            const { token, empresa } = req.session?.user ?? {}
            this.solicitacaoController = new SolicitacaoController(token, String(empresa))
            this.solicitacaoController.PatchSolicitacaoAlteraStatus(req, res)
        })

        return app
    }


}

export default Solicitacao;