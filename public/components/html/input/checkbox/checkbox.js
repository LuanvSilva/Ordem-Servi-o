import { Input } from "../input.js";
import { HTML } from "../../html.js";
import { Label } from "../label/label.js";
import { Div } from "../../div/div.js";

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
        this.div = new Div(`input-checkbox ${this.classe}`)
        this.div.SetClass(`input-checkbox ${this.classe}`)

        this.PositionLabel(this.label.GetHtml())

        this.div.AppendChild(this.label.GetHtml())
        this.div.AppendChild(this.GetHtml())
  

        this.div.SetHtml(this.div.GetHtml()) 

        if (this.callback) {
            
            this.Change(this.callback)
        }
    }

    PositionLabel(labelElement) {
        switch(this.labelPosition) {
            case "left":
                this.AddClass("mr-1", labelElement);
                this.CSS("flex-direction", "row", this.div.GetHtml())
                break;
            case "right":
                this.AddClass("ml-1", labelElement);
                this.CSS("flex-direction", "row-reverse", this.div.GetHtml())
                break;
            case "top":
                this.CSS("flex-direction", "column", this.div.GetHtml())
                break;
            case "bottom":
                this.CSS("flex-direction", "column-reverse", this.div.GetHtml())
                break;
            case "top-left":
                this.CSS("flex-direction", "row", this.div.GetHtml())
                this.CSS("align-items", "flex-start", this.div.GetHtml())
                break;
            default:
                this.AddClass("mr-1", labelElement)
                break;
        }
    }

    Val(value) {

        if (value != undefined) {

            this.GetHtml().checked = value

        }else{

            return this.GetHtml().checked
        }
       
    }
}

export { Checkbox }
