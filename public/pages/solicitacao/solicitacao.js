import { HTML } from "../../components/html/html.js";
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { Bootstrap } from '../../components/html/bootstrap/bootstrap.js'
import { Page } from '../../components/modulos/page/page.js'
import { MultiSelect } from '../../components/html/input/multiselect/multiselect.js'
import { Popover } from "../../components/html/bootstrap/popover/popover.js";
import { Tooltip } from "../../components/html/bootstrap/tooltip/tooltip.js";
import { Toast } from "../../components/html/bootstrap/toast/toast.js";
import { Alert } from "../../components/html/bootstrap/alert/alert.js";
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"

class SolicitacaoPage extends HTML {

    constructor(){
        super()
        this.title = 'Solicitações'
        this.noty = new Noty()
        this.bootstrap = new Bootstrap()
        this.campos_filtros = new Map()
        this.campos_solitacao = new Object()
        this.input_loader = new ComponentLoader()
       // this.page = new Page('Solicitações - Painel de Gestão', 'Você está no Painel de Gestão - ')
    }

    async Open(){
        //await this.page.buildPage()
        this.AddHeader()
        this.AddMain()
    }

    AddHeader(){

        this.Find("#header").innerHTML += this.title
    }

    AddMain(){

        let self = this
        this.Filter()

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
            await self.SetValCampos(params)
        })

        this.Find("#table").appendChild(this.table.html)
        this.Find("#botao_add").appendChild(this.button_cadastrar.html)

    }

    async Filter(){

        let self = this        
        this.campos_filtros["nome"]   = await this.input_loader.GetComponent('Text', "Nome", "Nome", "col-md-3", null, { id: "nome",  name: "nome"})
        this.campos_filtros["cpf"]    = await this.input_loader.GetComponent('CpfCnpj', "CPF/CNPJ", "CPF", "col-md-3", null, { id: "cpf", name: "cpf"})
        this.campos_filtros["money"]  = await this.input_loader.GetComponent('Money', "Valor","Valor", "col-md-3", null, { id: "valor", name: "valor"})
        this.campos_filtros["money"]  = await this.input_loader.GetComponent('Money', "Valor","Valor", "col-md-3", null, { id: "valor", name: "valor"})
        
        this.multiSelect = new MultiSelect("clientes", 'Select Items', 'Select...', 'col-md-3', (selected) => {
            //console.log('Selected values:', selected);
        })
        await this.multiSelect.Load()

        const button_search = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            console.log(this.multiSelect.Val())
        })

        button_search.Load()

        for (let campo in this.campos_filtros) {

            this.Find("#filtros").appendChild(this.campos_filtros[campo].div.html)
        }

        this.Find("#filtros").appendChild(this.multiSelect.html.div)
        this.Find("#botao_search").appendChild(button_search.html)

    }

    async MontaModalSolicitacao(editar){

        await this.MontaCamposHTML()
        let self = this

        this.modal = new Modal('large', 'Solicitação', "Salvar", async () => {
            await this.SalvaSolicitacao(editar)
        })
        
        await this.modal.Load()

        this.modal.LoadBody(this.row_solicitacao)

        this.modal.AddButton('Fechar', 'secondary ', 'col-md-2', async () => {
            self.modal.Hide()
        })

        this.modal.AddButton('Salvar', 'success ', 'col-md-2', async () => {
            
            self.modal.Hide()
           // await self.table.ReloadTable()
           // await self.SalvarCliente()
        })

        const existingModal = document.querySelector('.modal')

        if (existingModal) {
            existingModal.remove()
        }
        
       document.querySelector("body").append(this.modal.html)
            
    }

    async SalvaSolicitacao(editar){

        if (editar) {

            await this.UpdateSolicitacao()

        } else {

            await this.InsertSolicitacao()
        }
    }

    async SetValCampos(params){

        for (const campo in this.campos_solitacao) {

            this.campos_solitacao[campo].SetVal(params[campo])
        }
    }

    async MontaCamposHTML(){

        let campos = new Array()
        this.row_solicitacao = this.bootstrap.Row()

        const camposConfig = [
            { key: "cliente", type: "Text", label: "Cliente", class: "col-md-3 mt-3", attrs: { id: "cliente", name: "cliente" } },
            { key: "codigo", type: "Text", label: "Código", class: "col-md-3 mt-3", attrs: { id: "codigo", name: "codigo" } },
            { key: "urgente", type: "Checkbox", label: "Urgente", class: "col-md-2 mt-3", attrs: { id: "urgente", name: "urgente" }, position: "top" },
            { key: "valor", type: "Money", label: "Valor", class: "col-md-3 mt-3", attrs: { id: "valor", name: "valor" } },
            { key: "data_inicio", type: "Date", label: "Data Início", class: "col-md-3 mt-3", attrs: { id: "data_inicio", name: "data_inicio" } },
            { key: "hora_inicio", type: "Time", label: "Hora Início", class: "col-md-3 mt-3", attrs: { id: "hora_inicio", name: "hora_inicio" } },
            { key: "data_fim", type: "Date", label: "Data Fim", class: "col-md-3 mt-3", attrs: { id: "data_fim", name: "data_fim" } },
            { key: "hora_fim", type: "Time", label: "Hora Fim", class: "col-md-3 mt-3", attrs: { id: "hora_fim", name: "hora_fim" } },
            { key: "obsevacao", type: "TextArea", label: "Obsevações", class: "col-md-6 mt-3", attrs: { id: "obsevacao", name: "obsevacao" }},
        ]
        
        for (const campo of camposConfig) {
            
            campos[campo.key] = await this.input_loader.GetComponent(
                campo.type, campo.label, campo.label, campo.class, null, campo.position, campo.attrs
            )

            this.row_solicitacao.appendChild(campos[campo.key].div.html)
        }

        
    }
}

export { SolicitacaoPage }