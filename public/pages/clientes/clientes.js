import { MetodosClientesPage } from './metodos_clientes.js'
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { Footer } from "../../components/html/footer/footer.js"
import { Bootstrap } from '../../components/html/bootstrap/bootstrap.js'


class ClientePage extends MetodosClientesPage {

    constructor(){
        super()
        this.title = 'Clientes'
        this.noty = new Noty()
        this.campos_filtros = new Map()
    }

     async Open(){

        this.AddHeader()
        this.AddFooter()
        await this.AddMain()
    }

    AddHeader(){

        this.Find("#header").innerHTML += this.title
    }

    async AddMain(){

        let self = this
        await this.Filter()

        this.button_cadastrar = new Button('Cadastrar Novo', 'success', 'col-md-2 mb-3 mt-3', async () => {
            await self.MontaModalCliente(false)
            self.modal.Show()
        })

        this.button_cadastrar.Load()
        
        this.table = new Table("clientes")
        this.table.Load()
        this.table.AddRowClickListener(async (params) => {

            await self.MontaModalCliente(true)
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

        const button_serach = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            console.log(self.campos_filtros["money"].Val())
        })

        button_serach.Load()

        for (let campo in this.campos_filtros) {

            this.Find("#filtros").appendChild(this.campos_filtros[campo].div.html)
        }

        this.Find("#botao_search").appendChild(button_serach.html)

    }

    async MontaModalCliente(button_excluir){

        let self = this
        this.modal = new Modal('large', 'Cliente')
        this.modal.Load()

         this.modal.LoadBody(await this.MontaCamposModalClientes())
        
        this.modal.AddButton('Fechar', 'secondary ', 'col-md-2', async () => {
            self.modal.Hide()
        })

        this.modal.AddButton('Salvar', 'success ', 'col-md-2', async () => {
            
            self.modal.Hide()
            await self.table.ReloadTable()
            await self.SalvarCliente()
        })

        if(button_excluir){

            this.modal.AddButton('Excluir', 'danger ', 'col-md-2', async () => {
                self.modal.Hide()
                // await self.ExcluirCliente()
                self.noty.Noty('success', 'Cliente excluido com sucesso!')
            })
        }

        const existingModal = document.querySelector('.modal')

        if (existingModal) {
            existingModal.remove()
        }
        
       document.querySelector("body").append(this.modal.html)

    }

    SetValCampos(params){

        for (const campo in this.campos) {

            this.campos[campo].Val(params[campo])
        }
        
    }

    AddFooter(){

        // let footer = new Footer()
        // footer.Load()
        // this.Find("#footer").appendChild(footer.html)
    }

    

}

export { ClientePage };