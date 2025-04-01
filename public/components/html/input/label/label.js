import { HTML } from "../../html.js"
class Label extends HTML {
    constructor(label) {
        super("label")
        this.SetLabel(label)
        this.ConfiguraCamposLabel()
    }

    SetLabel(label) {

        this.Text(label)

    }

    SetLabelSize(size) {
       this.size = size
    }

    ConfiguraCamposLabel() {

        if (this.size) {

            this.AddClass(`label-${this.size}`)

        }

        this.Atributo("class",`label-carwash translate`)

        return this.GetHtml()

    }
}

export { Label }