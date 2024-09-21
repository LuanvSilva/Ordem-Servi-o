import { HTML } from '../html.js'
import { Label } from '../input/label/label.js'
import { Div } from '../div/div.js'

class Input extends HTML{

    constructor(element, label, placeholder, size, callback) {
        super(element)
        this.SetLabel(label)
        this.div = new Div()
        this.SetDivClass(size)
        this.SetPlaceholder(placeholder)
        this.SetCallback(callback)
        this.ConfiguraCamposInput()

    }

    SetLabel(label) {

        if (label != false && label != undefined) {

            this.label = new Label(label)
        }

    }

    SetDivClass(className) {
            
        if (className !== undefined) {

            this.div.SetClass(className)
        }
    }

    SetLabelSize(size) {

        this.label.SetLabelSize(size)

    }

    SetPlaceholder(placeholder) {

        this.placeholder = placeholder

    }

    SetCallback(callback) {

        if (callback) {
    
            this.Change(callback)
        }

    }

    ConfiguraCamposInput() {

        const colunm = []

        if(this.label?.html !== undefined){

            colunm.push(this.label.html)
        }

        colunm.push(this.html)

        for (let coluna of colunm) {

            if (coluna !== undefined) {

                this.div.AppendChild(coluna)
            }
        }
    }


}

export { Input }