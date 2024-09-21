class Bootstrap{

    constructor(){
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

    CreatePopover(element, options) {

        return new bootstrap.Popover(element, options)

    }

    CreateTooltip(element, options) {

        return new bootstrap.Tooltip(element, options)

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