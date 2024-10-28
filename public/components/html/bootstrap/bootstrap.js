import { HTML } from "../html.js"
class Bootstrap extends HTML {

    constructor(){
        super()
    }

    AddColumns(columns, row) {
            
        for (const column of columns) {

            row.appendChild(column)
        }

        return row
    }

    Form() {
            
        return this.CreateElement("form")
    }

    Row(classe) {

        return this.CreateElement("div", { class: classe || "row" }) 
    }

    Col(classe) {

        return this.CreateElement("div", { class: classe || "col" })
    }

    Container() {

        return this.CreateElement("div", { class: "container" })
    }

    CreateToast(options) {

        return new bootstrap.Toast(options)

    }

    CreateAlert(element) {

        return new bootstrap.Alert(element)

    }

    CreateCollapse(element) {

        return new bootstrap.Collapse(element)

    }

}

export { Bootstrap }