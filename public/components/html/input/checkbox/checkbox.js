import { Input } from "../input";

class Checkbox extends Input {

    constructor(label, placeholder, classe, callback, labelPosition = "top") {
        super(null, placeholder, classe, callback)
        this.type = "checkbox"
        this.label = label 
        this.labelPosition = labelPosition 
    }

    Load() {
        this.ConfiguraCampos()
    }

    ConfiguraCampos() {

        this.Atributo('type', 'checkbox')
        this.AddClass('input-checkbox')

        const container = document.createElement('div')
        container.classList.add('checkbox-container')

        const labelElement = document.createElement('label')
        labelElement.innerText = this.label

        this.PositionLabel(container, labelElement)

        if (this.callback) {
            this.Change(this.callback)
        }
    }

    PositionLabel(container, labelElement) {
        
        switch (this.labelPosition) {
            case "top":
                container.appendChild(labelElement)
                container.appendChild(this.element)
                break
            case "left":
                container.appendChild(labelElement)
                labelElement.style.marginRight = "10px"
                container.appendChild(this.element)
                break
            case "right":
                container.appendChild(this.element)
                labelElement.style.marginLeft = "10px"
                container.appendChild(labelElement)
                break
            case "bottom":
                container.appendChild(this.element)
                container.appendChild(labelElement)
                break
            default:
                container.appendChild(labelElement)
                container.appendChild(this.element)
        }
    }

}

export { Checkbox }
