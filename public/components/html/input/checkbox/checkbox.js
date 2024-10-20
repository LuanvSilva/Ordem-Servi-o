import { Input } from "../input.js";
import { HTML } from "../../html.js";
import { Label } from "../label/label.js";

class Checkbox extends HTML{

    constructor(label, placeholder, classe, callback, labelPosition = "top") {
        super("input")
        this.type = "checkbox"
        this.label = label 
        this.SetLabel(label)
        this.placeholder = placeholder
        this.classe = classe
        this.callback = callback
        this.labelPosition = labelPosition 
    }

    SetLabel(label) {

        if (label) this.label = new Label(label)
    }

    Load() {
        this.ConfiguraCampos()
    }

    ConfiguraCampos() {

        let colunm = []

        this.Atributo('type', 'checkbox')
        this.Atributo('input-checkbox')

        this.div = this.CreateElement('div', { class: this.classe})

        this.PositionLabel(this.label.html)

        this.div.html = this.div
        
        if (this.callback) {
            this.Change(this.callback)
        }
    }

    PositionLabel(labelElement) {
        
        switch (this.labelPosition) {
            case "top":
                this.div.appendChild(labelElement)
                this.div.appendChild(this.html)
                break
            case "left":
                this.div.appendChild(labelElement)
                labelElement.style.marginRight = "10px"
                this.div.appendChild(this.html)
                break
            case "right":
                this.div.appendChild(this.html)
                labelElement.style.marginLeft = "10px"
                this.div.appendChild(labelElement)
                break
            case "bottom":
                this.div.appendChild(this.html)
                this.div.appendChild(labelElement)
                break
            default:
                this.div.appendChild(labelElement)
                this.div.appendChild(this.html)
        }
    }

}

export { Checkbox }
