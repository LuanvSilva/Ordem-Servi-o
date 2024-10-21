import { Input } from "../input.js";
import { HTML } from "../../html.js";
import { Label } from "../label/label.js";

class Checkbox extends HTML {
    constructor(label, placeholder, classe, callback, labelPosition = "top") {
        super("input")
        this.type = "checkbox"
        this.label = label;
        this.placeholder = placeholder
        this.classe = classe
        this.callback = callback
        this.labelPosition = labelPosition
        this.SetLabel(label)
    }

    SetLabel(label) {

        if (label) {
            this.label = new Label(label)
        }
    }

    Load() {
        this.ConfiguraCampos()
    }

    ConfiguraCampos() {

        this.Atributo('type', this.type)
        this.div = this.CreateElement('div', { class: `input-checkbox ${this.classe}` })

        this.PositionLabel(this.label.html)

        this.div.appendChild(this.label.html)
        this.div.appendChild(this.html)
  

        this.div.html = this.div

        if (this.callback) {
            
            this.Change(this.callback)
        }
    }

    PositionLabel(labelElement) {
        switch(this.labelPosition) {
            case "left":
                this.AddClass("mr-1", labelElement);
                this.CSS("flex-direction", "row", this.div)
                break;
            case "right":
                this.AddClass("ml-1", labelElement);
                this.CSS("flex-direction", "row-reverse", this.div)
                break;
            case "top":
                this.CSS("flex-direction", "column", this.div)
                break;
            case "bottom":
                this.CSS("flex-direction", "column-reverse", this.div)
                break;
            case "top-left":
                this.CSS("flex-direction", "row", this.div)
                this.CSS("align-items", "flex-start", this.div)
                break;
            default:
                this.AddClass("mr-1", labelElement)
                break;
        }
    }

    Val(value) {

        if (value != undefined) {

            this.html.checked = value

        }else{

            return this.html.checked
        }
       
    }
}

export { Checkbox }
