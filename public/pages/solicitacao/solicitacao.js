import { HTML } from "../../components/html/html.js";
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"

class SolicitacaoPage extends HTML {

    constructor(){
        super()
        this.title = 'Solicitações'
        this.noty = new Noty()
        this.campos_filtros = new Map()
        this.campos_solitacao = new Object()
        this.input_loader = new ComponentLoader()
    }

    async Open(){

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

        const button_search = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            console.log(self.campos_filtros["money"].Val())
        })

        button_search.Load()

        for (let campo in this.campos_filtros) {

            this.Find("#filtros").appendChild(this.campos_filtros[campo].div.html)
        }

        this.Find("#botao_search").appendChild(button_search.html)

      
    }

    async MontaModalSolicitacao(editar){

        this.modal = new Modal("modal_solicitacao", "Solicitação", "Salvar", async () => {
            await this.SalvaSolicitacao(editar)
        })

        this.modal.AddBody(await this.MontaCamposHTML())
        this.modal.Load()
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

        this.campos_filtros["cliente"]  = await this.input_loader.GetComponent('Text', "Cliente", "Cliente", "col-md-3", null, { id: "cliente",  name: "cliente"})
        this.campos_filtros["codigo"]  = await this.input_loader.GetComponent('Text', "Código", "Código", "col-md-3", null, { id: "codigo",  name: "codigo"})
        this.campos_filtros["urgente"]  = await this.input_loader.GetComponent('Checkbox', "Urgente", "Urgente", "col-md-3", null, { id: "urgente",  name: "urgente"})
        this.campos_filtros["data_inicio"]  = await this.input_loader.GetComponent('Date', "Data Início", "Data Início", "col-md-3", null, { id: "data_inicio",  name: "data_inicio"})
        this.campos_filtros["hora_inicio"]  = await this.input_loader.GetComponent('Time', "Hora Início", "Hora Início", "col-md-3", null, { id: "hora_inicio",  name: "hora_inicio"})
        this.campos_filtros["data_fim"]  = await this.input_loader.GetComponent('Date', "Data Fim", "Data Fim", "col-md-3", null, { id: "data_fim",  name: "data_fim"}) 
        this.campos_filtros["hora_fim"]  = await this.input_loader.GetComponent('Time', "Hora Fim", "Hora Fim", "col-md-3", null, { id: "hora_fim",  name: "hora_fim"})
        this.campos_filtros["obsevacao"]  = await this.input_loader.GetComponent('TextArea', "Obesvações", "Obesvações", "col-md-3", null, { id: "obsevacao",  name: "obsevacao"})
        this.campos_filtros["valor"]  = await this.input_loader.GetComponent('Money', "Valor", "Valor", "col-md-3", null, { id: "valor",  name: "valor"})
    }
}

export { SolicitacaoPage }