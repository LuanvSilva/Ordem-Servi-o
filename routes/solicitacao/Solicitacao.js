
import SolicitacaoController from '../../controllers/solicitacao/SolicitacaoController'
import Constantes from '../../util/Constantes'
class Solicitacao{

    constructor(){
        this.solicitacaoController = new SolicitacaoController()
    }

    RoutesMain(app){

        app.post(Constantes.URL_BASE_SOLICITACOES.CADASTRAR, (req, res) => {

            this.solicitacaoController.PostSolicitacao(req, res)
        })

        app.put(Constantes.URL_BASE_SOLICITACOES.ATUALIZAR, (req, res) => {

            this.solicitacaoController.PutSolicitacao(req, res)
        })

        app.delete(Constantes.URL_BASE_SOLICITACOES.DELETAR, (req, res) => {
            
            this.solicitacaoController.DeleteSolicitacao(req, res)
        })

        app.get(Constantes.URL_BASE_SOLICITACOES.LISTAR, (req, res) => {

            this.solicitacaoController.GetSolicitacao(req, res)
        })

        app.get(Constantes.URL_BASE_SOLICITACOES.LISTAR_ID, (req, res) => {

            this.solicitacaoController.GetSolicitacaoById(req, res)
        })

        app.patch(Constantes.URL_BASE_SOLICITACOES.ALTERAR_STATUS, (req, res) => {
            
            this.solicitacaoController.PatchSolicitacaoAlteraStatus(req, res)
        })

        return app
    }


}

export default Solicitacao;