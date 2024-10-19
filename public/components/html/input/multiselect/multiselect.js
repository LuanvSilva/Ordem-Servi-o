import { HTML } from '../../html.js'
class MultiSelect extends HTML {
    constructor(label, placeholder, classe, callback, options = []) {
        super("input")
        this.label = label
        this.placeholder = placeholder
        this.classe = classe
        this.callback = callback
        this.options = options
        this.selectedValues = []
        this.html = null
    }

    async Load() {

        await this.createFields()
    }

    async setOptions(options) {

        this.options = options
        await this.Load()
    }

    async createFields() {

        const container = document.createElement('div')
        container.classList.add('multiselect-container', this.classe)

        const labelElement = document.createElement('label')
        labelElement.innerText = this.label
        container.appendChild(labelElement)

        this.inputElement = document.createElement('input')
        this.inputElement.setAttribute('readonly', true)
        this.inputElement.classList.add('form-control', 'multiselect-input')
        this.inputElement.placeholder = this.placeholder
        container.appendChild(this.inputElement)

        this.dropdownElement = document.createElement('div')
        this.dropdownElement.classList.add('multiselect-dropdown', 'dropdown-menu')
        this.options.forEach(option => {

            const optionElement = document.createElement('div')
            optionElement.classList.add('multiselect-option', 'dropdown-item')
            optionElement.dataset.value = option.value

            const checkIcon = document.createElement('span')
            checkIcon.classList.add('check-icon', 'me-2')
            checkIcon.innerHTML = this.selectedValues.includes(option.value) ? '✔️' : '';

            optionElement.appendChild(checkIcon);
            optionElement.appendChild(document.createTextNode(option.label))

            optionElement.addEventListener('click', () => {
                this.toggleOption(option.value)
                this.updateCheckIcons()
            });

            this.dropdownElement.appendChild(optionElement)
        });

        container.appendChild(this.dropdownElement)
        this.html = container

        this.inputElement.addEventListener('click', () => {

            this.dropdownElement.classList.toggle('show')
        });

        document.addEventListener('click', (event) => {

            if (!container.contains(event.target)) {
                this.dropdownElement.classList.remove('show')
            }
        })
    }

    toggleOption(value) {

        const index = this.selectedValues.indexOf(value)
        
        if (index === -1) {
            this.selectedValues.push(value)
        } else {
            this.selectedValues.splice(index, 1)
        }

        this.updateInput()

        if (this.callback) {

            this.callback(this.selectedValues)
        }
    }

    updateInput() {

        this.inputElement.value = this.selectedValues.join(', ') || this.placeholder
    }

    updateCheckIcons() {

        const optionElements = this.dropdownElement.querySelectorAll('.multiselect-option')

        optionElements.forEach(optionElement => {

            const value = optionElement.dataset.value
            const checkIcon = optionElement.querySelector('.check-icon')
            checkIcon.innerHTML = this.selectedValues.includes(value) ? '✔️' : ''

        })
    }
}

export { MultiSelect }
