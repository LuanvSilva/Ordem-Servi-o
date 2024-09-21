import { HTML } from "../../html.js";
import { Button } from "../button/button.js";
import { Text } from "../text/text.js";
import { Table } from "../../table/table.js";
import { Modal } from "../../modal/modal.js";
import { Constantes } from "../../../../resources/util/constantes.js";

class Zoom extends HTML{

    constructor(modelo, label, col, callback, botao_borracha){
        super("div")
        this.modelo = modelo
        this.label = label
        this.col = col
        this.callback = callback
        this.campos_input = {}
        this.botao_borracha = botao_borracha
        this.campos = {}
    }

    SetRetorno(campos_retorno){

        this.campos_retorno = campos_retorno
    }

    async Load(){
        await this.ConfiguraCamposZoom()
        await this.BuscaRegistros()
        await this.MontaCamposHTML()
        await this.MontaZoom()
    }

    ConfiguraCamposZoom(){

        this.Atributo("class", this.col)
        this.label = this.CreateElement('label', { class: 'label-carwash'}, this.label)

        this.div_campos = this.CreateElement('div', { class: 'input-group'})
        this.div_campos.setAttribute('id', 'div_campos')

        this.div_buttom = this.CreateElement('div', { class: 'input-group-append'})
        this.div_buttom.setAttribute('id', 'div_buttom')
        
        this.AppendChild(this.label)
        this.AppendChild(this.div_campos)
    }

    async BuscaRegistros(){

        try {

            let url = Constantes.URL_ZOOM_CLIENTE.replace("${this.modelo}", this.modelo)
            let response = await fetch(url)
    
            if (!response.ok) {

                throw new Error(`Erro na requisição: ${response.statusText}`)
            }
    
            this.campos = (await response.json())

        } catch (error) {
            console.error("Erro ao buscar registros:", error);
        }
    }

    async MontaCamposHTML(){

        let self = this

        for (const campo of Object.keys(this.campos)) {
            
            this.campos_input[campo] = new Text()
            this.campos_input[campo].Load()
            this.campos_input[campo].Id(campo)
            this.campos_input[campo].Name(campo)

            this.campos_input[campo].Placeholder(self.campos_retorno[campo].placeholder)
            this.campos_input[campo].Readonly(self.campos_retorno[campo].readonly)
            this.campos_input[campo].Obrigatorio(self.campos_retorno[campo].obrigatorio)

            if(self.campos_retorno[campo].visible == false){
                
                this.campos_input[campo].CSS('display', 'none')   
            }

            if(self.campos_retorno[campo].visible == true){

                this.campos_input[campo].div.CSS('flex', 1)
            }

            if(self.campos_retorno[campo].callback == true){

                this.campos_input[campo].Change(self.campos_retorno[campo].callback)
            }

            this.div_campos.appendChild(this.campos_input[campo].div.html)
        }
    }

    MontaZoom(){

            let self = this
            this.botao_zoom = new Button("<i class='fas fa-search-plus'></i>", 'btn btn-primary btn-car-search', 'col-md-1')
            this.botao_zoom.Load()
            this.botao_zoom.Id('btn_zoom_search')
            this.botao_zoom.On('click', async () => {
                await self.MontaTabela(self.modelo)
                await self.MontaModal()
                self.modal.Show()
            })

            this.div_buttom.appendChild(this.botao_zoom.html)

            if(this.botao_borracha){

                this.botao_borracha = new Button("<i class='fas fa-eraser'></i>", 'btn btn-danger', 'col-md-1')
                this.botao_borracha.Load()
                this.botao_borracha.Id('btn_zoom_borracha')
                this.botao_borracha.On('click', async () => {
                    await self.LimpaCampos()
                })

                this.div_buttom.appendChild(this.botao_borracha.html)
            }

            this.div_campos.appendChild(this.div_buttom)

    }

    MontaTabela(){

        this.div_table = this.CreateElement('div', { class: 'container' , id: 'table'})

        let self = this
        this.table = new Table(this.modelo)
        this.table.Load()
        this.table.AddRowClickListener(async (params) => {
            await self.Val(params)
            self.modal.Hide()
        })

        this.div_table.appendChild(this.table.html)
    }

    MontaModal(){
            
            this.modal = new Modal('large', this.label)
            this.modal.Load()
    
            this.modal.LoadBody(this.div_table)
    
            this.modal.AddButton('Fechar', 'secondary ', 'col-md-2', async () => {
                this.modal.Hide()
            })
    
            const existingModal = document.querySelector('.modal')
    
            if (existingModal) {
                existingModal.remove()
            }
            
            document.querySelector("body").append(this.modal.html)
    }

    async LimpaCampos(){

        for (const campo of Object.keys(this.campos_input)) {

            this.campos_input[campo].Val('')
        }
    }

    async Val(value){

        if(value != undefined && typeof value === "object"){
            
            for (const campo of Object.keys(this.campos_input)) {

                this.campos_input[campo].Val(value[campo])
            }

        }else{

            let retorno = {}

            for (const campo of Object.keys(this.campos_input)) {

                retorno[campo] = this.campos_input[campo].Val()

            }

            return retorno
        }
      
    }
}

export { Zoom }