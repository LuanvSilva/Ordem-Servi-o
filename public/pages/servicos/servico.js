import { HTML } from '../../components/html/html.js'
import { Table } from '../../components/html/table/table.js'
import { Modal } from '../../components/html/modal/modal.js'
import { Noty } from '../../components/html/noty/noty.js'
import { Button } from '../../components/html/input/button/button.js'
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
import { Bootstrap } from '../../components/html/bootstrap/bootstrap.js'
import { Footer } from "../../components/html/footer/footer.js"
import { Constantes } from '../../resources/util/constantes.js'
import { TranslationManager } from '../../components/modulos/translationManager/translation_manager.js'

class ServicoPage extends HTML {
    constructor() {
        super()
        this.title = 'Serviços'
        this.campos = []
        this.campos_servicos = new Object()
        this.noty = new Noty()
        this.bootstrap = new Bootstrap()
        this.input_loader = new ComponentLoader()
    
       // this.translationManager = new TranslationManager()
        //this.translationManager.ConfigurarIdiomaPadrao()
    }

    async Open() {
        this.AddHeader()
        await this.AddMain()
        //this.AddFooter()
        //this.AddLanguageSwitcher()
        //this.translationManager.ScanElements()
    }

    AddHeader() {
        this.Find("#header").innerHTML += `<span class="translate">${this.title}</span>`
    }

    async AddMain() {
        await this.Filtros()
        await this.LoadTableServico()
    }

    async GetCamposToJSON() {
        this.campos_servicos = await fetch('./campos_servicos.json').then(response => response.json())
    }

    async Filtros() {
        await this.GetCamposToJSON()

        const button_serach = new Button('<i class="fa-solid fa-magnifying-glass"></i>', 'primary', 'col-md-1 mb-3', async () => {
            await this.BuscarServicos()
        })

        button_serach.Load()
        this.Find("#botao_search").appendChild(button_serach.GetHtml())
        
        const filtrosContainer = await this.GetCamposHTML(this.campos_servicos.filtros)
        this.AppendChild(filtrosContainer, "#filtros")
        //await this.translationManager.TraduzirContainer(filtrosContainer)
    }

    async LoadTableServico(servicos) {
        const self = this

        this.button_cadastrar = new Button('<span class="translate">Cadastrar Novo</span>', 'success', 'col-md-2 mb-3 mt-3', async () => {
            await self.MontaModalServico(false)
            await self.modal.Show()
        })
        
        this.button_cadastrar.Load()
        this.Find("#botao_add").appendChild(this.button_cadastrar.GetHtml())
        
        this.table = new Table('item')
        this.table.Load()
        await self.MontaModalServico(true)
        this.table.AddRowClickListener(async (params) => {
            await self.modal.Show()
            await self.SetValuesCampos(params)
        })
        
        this.Find("#table").appendChild(this.table.GetHtml())
        
        //this.translationManager.TraduzirContainer(this.button_cadastrar.GetHtml())
    }

    async MontaModalServico(button_excluir) {
        const self = this
        this.modal = new Modal('large', '<span class="translate">Serviço</span>')
        this.modal.Load()
        
        const modalBody = await this.GetCamposHTML(this.campos_servicos.campos)
        this.modal.LoadBody(modalBody)
        
        this.modal.AddButton('<span class="translate">Fechar</span>', 'secondary ', 'col-md-2', async () => {
            self.modal.Hide()
        })

        if(button_excluir) {
            this.modal.AddButton('<span class="translate">Excluir</span>', 'danger ', 'col-md-2', async () => {
                self.modal.Hide()
                await self.ExcluirServico()
                
                let mensagem = 'Serviço excluído com sucesso!'
                // if (this.translationManager.GetIdioma() !== 'pt') {
                //     mensagem = await this.translationManager.TraduceText(mensagem)
                // }
                
                await self.noty.Noty('success', mensagem)
            })
        }

        this.modal.AddButton('<span class="translate">Salvar</span>', 'success ', 'col-md-2', async () => {
            await self.SalvarServico()
        })
        
        //await this.translationManager.TraduzirContainer(this.modal.GetHtml())
    }
  
    async GetCamposHTML(estrutura_campos) {
        const html_campos = this.bootstrap.Row()
    
        for (const campo of estrutura_campos) {
            if(campo.callback && typeof campo.callback === 'string' && this[campo.callback]) {
                campo.callback = this[campo.callback].bind(this)
            }
            
        
            if (campo.placeholder) {
                campo.attrs = campo.attrs || {}
                campo.attrs['data-translate'] = 'true'
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
            
            html_campos.appendChild(this.campos[campo.key].div.GetHtml())
        }
    
        return html_campos
    }

    SetValuesCampos(params){

        for (const campo in this.campos) {

            this.campos[campo].Val(params[campo])
        }
    }

    ReturnValueCampos(){

        let params = {}

        for (const campo in this.campos) {

            params[campo] = this.campos[campo].Val()
        }

        return params
    }


    async SalvarServico() {
        let params = this.ReturnValueCampos()

        try {
            let response = await fetch(Constantes.URL_BASE_ITENS.CADASTRAR, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(response => response.json())

            if(response.success) {
                // Traduzir mensagem de sucesso se necessário
                let mensagem = response.message || 'Serviço salvo com sucesso!'
                // if (this.translationManager.GetIdioma() !== 'pt') {
                //     mensagem = await this.translationManager.TraduceText(mensagem)
                // }
                
                this.noty.Noty('success', mensagem)
                this.modal.Hide()
            } else {
                // Traduzir mensagem de erro
                let mensagemErro = response.error || 'Erro ao salvar o serviço'
                // if (this.translationManager.GetIdioma() !== 'pt') {
                //     mensagemErro = await this.translationManager.TraduceText(mensagemErro)
                // }
                
                this.noty.Noty('error', mensagemErro)
            }
        } catch (error) {
            this.noty.Noty('error', error.message)
        }
    }

    
    AddFooter(){
        // const footer = new Footer()
        // footer.Load()
        // this.Find("#footer").appendChild(footer.GetHtml())
    }


       // AddLanguageSwitcher() {
    //     const languageContainer = document.createElement('div')
    //     languageContainer.className = 'language-switcher'
    //     languageContainer.style.position = 'fixed'
    //     languageContainer.style.top = '10px'
    //     languageContainer.style.right = '10px'
    //     languageContainer.style.zIndex = '1000'
        
    //     const languages = [
    //         { code: 'pt', name: 'Português' },
    //         { code: 'en', name: 'English' },
    //         { code: 'es', name: 'Español' },
    //         { code: 'fr', name: 'Français' }
    //     ]
        
    //     languages.forEach(lang => {
    //         const button = document.createElement('button')
    //         button.innerText = lang.code.toUpperCase()
    //         button.className = 'btn btn-sm ' + 
    //             (lang.code === this.translationManager.GetIdioma() ? 'btn-primary' : 'btn-outline-primary')
    //         button.style.marginLeft = '5px'
            
    //         button.addEventListener('click', async () => {
    //             this.translationManager.SetIdioma(lang.code)
    //             this.translationManager.SalvarIdioma()
                
    //             // Atualizar aparência dos botões
    //             languageContainer.querySelectorAll('button').forEach(btn => {
    //                 btn.className = 'btn btn-sm ' + 
    //                     (btn.innerText.toLowerCase() === this.translationManager.GetIdioma() ? 
    //                      'btn-primary' : 'btn-outline-primary')
    //             })
                
    //             // Traduzir ou restaurar os textos dependendo do idioma
    //             await this.translationManager.TraduzirElementosRegistrados()
    //         })
            
    //         languageContainer.appendChild(button)
    //     })
        
    //     document.body.appendChild(languageContainer)
    // }

}

export { ServicoPage }