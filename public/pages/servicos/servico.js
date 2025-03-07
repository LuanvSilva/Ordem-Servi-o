import { HTML } from '../../components/html/html.js'
import { Text } from '../../components/html/input/text/text.js'
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
import { Bootstrap } from '../../components/html/bootstrap/bootstrap.js'
import { Footer } from "../../components/html/footer/footer.js"
import { Constantes } from '../../resources/util/constantes.js'

class ServicoPage extends HTML{
    constructor(){
        super()
        this.title = 'Serviços'
        this.campos = []
        this.noty = new Noty()
        this.bootstrap = new Bootstrap()
        this.input_loader = new ComponentLoader()
    }

     async Open(){
        
        this.AddHeader()
        await this.AddMain()
        this.AddFooter()
    }

    AddHeader(){

        this.Find("#header").innerHTML += this.title
    }

    async AddMain(){

        let self = this
        await this.Filtros()

        this.button_cadastrar = new Button('Cadastrar Novo', 'success', 'col-md-2 mb-3 mt-3', async () => {
            await self.MontaModalServico(false)
            await self.modal.Show()
        })
        this.button_cadastrar.Load()
        this.Find("#botao_add").appendChild(this.button_cadastrar.html)
        
        this.table = new Table()
        this.table.Load()
        this.table.AddRowClickListener(async (params) => {

            await self.MontaModalServico(true)
            await self.modal.Show()
            await self.SetValCampos(params)
        })

        this.Find("#table").appendChild(this.table.html)
    }

    async Filtros(){

        let self = this
        const nome = new Text('Descrição', 'Digite a Descrição do Serviço', 'col-md-3')
        nome.Load()
        nome.Id('nome_filtros')
        nome.Name('nome_filtros')
        this.Find("#filtros").appendChild(nome.div.html)

        const button_serach = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            await self.BuscarServicos()
        })

        button_serach.Load()
        this.Find("#botao_search").appendChild(button_serach.html)

    }

    async MontaModalServico(button_excluir){

        let self = this
        this.modal = new Modal('large', 'Serviço')
        this.modal.Load()
        this.modal.LoadBody(await this.GetCamposHTML())
        
        this.modal.AddButton('Fechar', 'secondary ', 'col-md-2', async () => {
            self.modal.Hide()
        })

        if(button_excluir){

            this.modal.AddButton('Excluir', 'danger ', 'col-md-2', async () => {
                self.modal.Hide()
                await self.ExcluirServico()
                await self.noty.Noty('success', 'Serviço excluido com sucesso!')
            })
        }

        this.modal.AddButton('Salvar', 'success ', 'col-md-2', async () => {
            await self.SalvarServico()
        })
    }
  
    async GetCamposHTML(){
    
        const estrutura_campos = this.bootstrap.Row()
        const campos_servicos = await fetch('./campos_servicos.json').then(response => response.json())
    
        for (const campo of campos_servicos.campos) {
            
            if(campo.callback && typeof campo.callback === 'string' && this[campo.callback]) {

                campo.callback = this[campo.callback].bind(this)
            }
            
            this.input_loader.SetAtributes(campo.attrs)
            
            this.campos[campo.key] = await this.input_loader.GetComponent(
                campo.type,
                campo.modelo,
                campo.label,
                campo.placeholder,
                campo.class,
                campo.callback,  
                campo.position,
                campo.options,
                campo.attrs
            )
            
            estrutura_campos.appendChild(this.campos[campo.key].div.html)
        }
    
        return estrutura_campos
    }

    OnTipoChange(params){

        console.log(this.campos['tipo'].Val())
    }


    async SalvarServico(){

        let params = {}

        for (const campo in this.campos) {
            params[campo] = this.campos[campo].Val()
        }

        let response = await fetch(Constantes.URL_BASE_ITENS.CADASTRAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json())

        if(response.success){

            this.noty.Noty('success', response.message)
            this.modal.Hide()

        }else{

            this.noty.Noty('error', error)
        }
    
    }
  

    AddFooter(){
        // const footer = new Footer()
        // footer.Load()
        // this.Find("#footer").appendChild(footer.html)
    }
}

export { ServicoPage }