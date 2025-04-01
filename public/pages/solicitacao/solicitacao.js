import { HTML } from "../../components/html/html.js";
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { Bootstrap } from '../../components/html/bootstrap/bootstrap.js'
import { Constantes } from '../../resources/util/constantes.js'
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
import { LoadingHTML } from "../../components/html/skeleton/skeleton.js"

class SolicitacaoPage extends HTML {

    constructor(){
        super()
        this.title = 'Solicitações'
        this.noty = new Noty()
        this.bootstrap = new Bootstrap()
        this.campos = new Array()
        this.campos_solicitacao = new Object()
        this.input_loader = new ComponentLoader()
        this.skeleton_container = new LoadingHTML()
    }

    async Open(){

        this.AddHeader()
        await this.AddMain()
    }

    AddHeader(){

        this.Find("#header").innerHTML += this.title
    }

    AddMain(){

        this.Filter()
        this.LoadTableSolicitacao()
        
    }

    async GetCamposToJSON(){

        this.campos_solicitacao = await fetch('./campos_solicitacao.json').then(response => response.json())    
    }

    async Filter(){

        let self = this        
        await this.GetCamposToJSON()

        const button_search = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            console.log(this.multiSelect.Val())
        })

        button_search.Load() 
 
        this.Find("#filtros").appendChild(await self.input_loader.GetCamposHTML(this.campos_solicitacao.filtros))
        this.Find("#botao_search").appendChild(button_search.GetHtml())

    }

    LoadTableSolicitacao(){

        let self = this
        this.button_cadastrar = new Button('Cadastrar Novo', 'success', 'col-md-2 mb-3 mt-3', async () => {
            await self.MontaModalSolicitacao(false)
            self.modal.Show()
        })

        this.button_cadastrar.Load()
        
        this.table = new Table("solicitacoes")
        this.table.Load()
        this.table.AddRowClickListener(async (params) => {

            await self.MontaModalSolicitacao(true)
            self.modal.Show()
            await self.SetValuesCampos(params)
        })

        this.Find("#table").appendChild(this.table.GetHtml())
        this.Find("#botao_add").appendChild(this.button_cadastrar.GetHtml())
    }

    async MontaModalSolicitacao(editar){
 
        let self = this

        this.modal = new Modal('large', 'Solicitação', "Salvar", async () => await this.SalvaSolicitacao(editar))
        await this.modal.Load()

            this.skeleton_container.SetRows([['input', 4], ['input', 4],'textarea']);
            this.skeleton_container.Load()

        this.modal.LoadBody(this.skeleton_container.targetElement)

        this.modal.AddButton('Fechar', 'secondary ', 'col-md-2', async () => self.modal.Hide())
        this.modal.AddButton('Salvar', 'success ', 'col-md-2', async () => {
            
            self.modal.Hide()
           // await self.table.ReloadTable()
           // await self.SalvarCliente()
        })

        setTimeout(async () => {
            this.skeleton_container.Destroy()
            this.modal.LoadBody(await self.input_loader.GetCamposHTML(this.campos_solicitacao.campos))
        }, 1000)
        
    }

    async SalvaSolicitacao(editar){

        if (editar) {

            await this.UpdateSolicitacao()

        } else {

            await this.InsertSolicitacao()
        }
    }

   
    SetValuesCampos(params){

        this.campos = this.input_loader.GetCampos()
        
        for (const campo in this.campos) {

            this.campos[campo].Val(params[campo])
        }
    }

    ReturnValueCampos(){

        let params = {}
        this.campos = this.input_loader.GetCampos()

        for (const campo in this.campos) {

            params[campo] = this.campos[campo].Val()
        }

        return params
    }

    async InsertSolicitacao(){

        let params = this.ReturnValueCampos()
        console.log(params)

        // let response = await fetch(Constantes.URL_BASE_SOLICITACOES.CADASTRAR, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(params)
        // }).then(response => response.json())

        // if(response.success){

        //     this.noty.Noty('success', response.message)
        //     this.modal.Hide()

        // }else{

        //     this.noty.Noty('error', error)
        // }
    }
}

export { SolicitacaoPage }