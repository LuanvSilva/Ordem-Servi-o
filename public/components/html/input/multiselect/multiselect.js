import { HTML } from '../../html.js'
import { Label } from '../label/label.js'
import { Constantes } from '../../../../resources/util/constantes.js'

class MultiSelect extends HTML {
    constructor(modelo, label, placeholder, classe, callback, parametros, options = []) {
        super("input")
        this.label = label
        this.placeholder = placeholder
        this.classe = classe
        this.modelo = modelo
        this.SetParametros(parametros)
        this.SetCallback(callback)
        this.SetOptions(options)
        this.SetLabel(label)
        this.registros = []
        this.selectedValues = []
    }

    SetLabel(label) {
        if(label) this.label = new Label(label)
    }

    SetOptions(options) {
        this.options = options
    }

    SetCallback(callback) {
        this.callback = callback
    }

    SetParametros(parametros) {
        this.parametros = parametros
    }

    async Load() {
        await this.CreateFields()
    }

    async BuscaRegistros(modelo, parametros) {

        if (!modelo) throw new Error('Modelo não informado')

        try {
            const response = await fetch(Constantes.URL_GET_MULTISELECT_MODELOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ modelo, parametros: parametros || {} }), 
            })

            if (!response.ok) {
                throw new Error('Erro ao buscar registros')
            }

            this.registros = await response.json()
            this.registros = this.registros.data

        } catch (error) {

            console.log(error)
            throw new Error('Erro ao buscar registros')
        }
        
    }

    async CreateFields() {

        let self = this
        this.Readonly(true)
        this.Atributo("class", "form-control multiselect-input")
        this.Atributo("placeholder", self.placeholder)

        const container = this.CreateElement('div', { class: 'multiselect-container ' + this.classe })
        container.appendChild(this.label.html)
        container.appendChild(this.html)

        this.dropdownElement = this.CreateElement('div', { class: 'dropdown-menu' })

        await this.LoadOptions()

        container.appendChild(this.dropdownElement)
        this.html.div = container
        this.div = {}
        this.div.html = container

        this.On('click', () => this.dropdownElement.classList.toggle('show'))
        
        document.addEventListener('click', (event) => {
            if (!container.contains(event.target)) this.dropdownElement.classList.remove('show')
        })
    }

    async LoadOptions() {

        let self = this
        if (this.options.length > 0 && !this.modelo) {

            this.options.forEach(option => self.CreateOption(option))

        }else if (this.modelo && this.options.length === 0) {

            await this.BuscaRegistros(this.modelo, this.parametros)
            this.registros.forEach(option => self.CreateOption(option))
            
        }else{
                
            throw new Error('Opções não informadas')
        }
    }

    CreateOption(option) {

        let self = this
       
        const optionElement = this.CreateElement('div', { class: 'multiselect-option dropdown-item' })
        optionElement.dataset.value = option.value

        const checkIcon = this.CreateElement('span', { class: 'check-icon me-2' }, self.selectedValues.includes(option.value) ? '✔️' : '')
    
        optionElement.appendChild(checkIcon)
        optionElement.appendChild(self.TextNode(option.label))

        this.On('click', () => {
            this.ToggleOption(option.value, option.label)
            this.UpdateCheckIcons()
        }, optionElement)

        this.dropdownElement.appendChild(optionElement)
    }

    ToggleOption(value, label) {

        const index = this.selectedValues.indexOf(value)

        if (index === -1) {

            this.selectedValues.push(value)

        } else {

            this.selectedValues.splice(index, 1)
        }

        this.UpdateInput(label)

        if (this.callback) {

            this.callback(this.selectedValues)
        }
    }

    UpdateInput() {
        let self = this
        this.Val(self.selectedValues.join(', ')) 
    }

    UpdateCheckIcons() {

        const optionElements = this.dropdownElement.querySelectorAll('.multiselect-option')

        optionElements.forEach(optionElement => {

            const value = optionElement.dataset.value
            const checkIcon = optionElement.querySelector('.check-icon')
            checkIcon.innerHTML = this.selectedValues.includes(Number(value)) ? '✔️' : ''

        })
    }


    Val(value) {

        if (value !== undefined) {

            super.Val(value) 
            this.UpdateCheckIcons()

        }else{

            return super.Val().split(',')
        }

    }
}

export { MultiSelect }
