import { HTML } from '../../html.js'
import { Label } from '../label/label.js'

class MultiSelect extends HTML {
    constructor(label, placeholder, classe, callback, options = []) {
        super("input")
        this.label = label
        this.placeholder = placeholder
        this.classe = classe
        this.callback = callback
        this.options = options
        this.SetLabel(label)
        this.selectedValues = []
    }

    SetLabel(label) {
            
        if (label) this.label = new Label(label)
    }

    async Load() {

        await this.createFields()
    }

    async setOptions(options) {

        this.options = options
        await this.Load()
    }

    async createFields() {

        let self = this
        this.Readonly(true)
        this.Atributo("class", "form-control multiselect-input")
        this.Atributo("placeholder", self.placeholder)

        const container = this.CreateElement('div', { class: 'multiselect-container ' + this.classe })
        container.appendChild(this.label.html)
        container.appendChild(this.html)

        this.dropdownElement = this.CreateElement('div', { class: 'dropdown-menu' })
        this.options.forEach(option => self.createOption(option))

        container.appendChild(this.dropdownElement)
        this.html.div = container

        this.On('click', () => this.dropdownElement.classList.toggle('show'))
        document.addEventListener('click', (event) => {
            if (!container.contains(event.target)) this.dropdownElement.classList.remove('show')
        })
    }

    createOption(option) {

        let self = this
       
        const optionElement = this.CreateElement('div', { class: 'multiselect-option dropdown-item' })
        optionElement.dataset.value = option.value

        const checkIcon = this.CreateElement('span', { class: 'check-icon me-2' }, self.selectedValues.includes(option.value) ? '✔️' : '')
    
        optionElement.appendChild(checkIcon)
        optionElement.appendChild(self.TextNode(option.label))

        this.On('click', () => {
            this.toggleOption(option.value, option.label)
            this.updateCheckIcons()
        }, optionElement)

        this.dropdownElement.appendChild(optionElement)
    }

    toggleOption(value, label) {

        const index = this.selectedValues.indexOf(value)

        if (index === -1) {

            this.selectedValues.push(value)

        } else {

            this.selectedValues.splice(index, 1)
        }

        this.updateInput(label)

        if (this.callback) {

            this.callback(this.selectedValues)
        }
    }

    updateInput() {
        let self = this
        this.Val(self.selectedValues.join(', ')) 
    }

    updateCheckIcons() {

        const optionElements = this.dropdownElement.querySelectorAll('.multiselect-option')

        optionElements.forEach(optionElement => {

            const value = optionElement.dataset.value
            const checkIcon = optionElement.querySelector('.check-icon')
            checkIcon.innerHTML = this.selectedValues.includes(value) ? '✔️' : ''

        })
    }


    Val(value) {

        if (value !== undefined) {

            super.Val(value) 
            this.updateCheckIcons()

        }else{

            return super.Val().split(',')
        }

    }
}

export { MultiSelect }
