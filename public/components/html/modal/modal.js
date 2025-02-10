import { HTML } from '../html.js'
import { Button } from '../input/button/button.js'

class Modal extends HTML {
    constructor(size, title) {
        super("div")
        this.SetSize(size)
        this.SetTitle(title)
    }

    SetSize(size) {

        this.size = size
    }

    SetTitle(title) {
        
        this.title = title
    }

    LoadBody(content) {

        this.modal_body.appendChild(content)
    }

    LoadFooter(footer) {
        
        this.footer.appendChild(footer)
    }

    AddButton(label, tipo, col, callback) {
            
        let btn = new Button(label, tipo, col, callback)
        btn.Load()
        this.footer.appendChild(btn.html)
    }

    async Load() {
        
        this.GetClassModalSize(this.size)
        this.ConfiguraModal()
        this.AddEvent()
    }

    GetClassModalSize(size) {
        
        switch (size) {
            case "small":
                this.size = "modal-sm"
                break;
            case "large":
                this.size = "modal-lg"
                break;
            case "extra-large":
                this.size = "modal-xl"
                break;
            case "default":
            default:
                this.size = "modal-sm"
                break;
        }
    }

    ConfiguraModal() {

        this.Atributo("class", 'modal fade')
        this.Atributo('tabindex', '-1')
        this.Atributo('role', 'dialog')
        this.Atributo('aria-labelledby', 'staticBackdropLabel')
        this.Atributo('aria-hidden', 'true')
        this.Atributo("data-bs-backdrop", "static")
        this.Atributo("data-bs-keyboard", "false")
    
        this.modal_div     = this.CreateElement("div", { class: "modal-dialog " + this.size })
        this.modal_content = this.CreateElement("div", { class: "modal-content " })
        this.modal_header  = this.CreateElement("div", { class: "modal-header modal-header-dark" })
        this.modal_body    = this.CreateElement("div", { class: "modal-body modal-body-dark" })
        this.footer        = this.CreateElement("div", { class: "modal-footer modal-body-dark" })
        this.modal_title   = this.CreateElement("h5",  { class: "modal-title" }, this.title)
        this.modal_button  = this.CreateElement("button", {
            type: "button",
            class: "btn-close",
            "data-bs-dismiss": "modal",
            "aria-label": "Close"
        })
    
        this.modal_header.appendChild(this.modal_title)
        this.modal_header.appendChild(this.modal_button)
        this.modal_content.appendChild(this.modal_header)
        this.modal_content.appendChild(this.modal_body)
        this.modal_content.appendChild(this.footer)
        this.modal_div.appendChild(this.modal_content)
        this.html.appendChild(this.modal_div)
    }
    
    AddEvent() {

        let self = this
        this.modal_button.addEventListener('click', () => {
            self.Hide()
        })

    }

    Show() {
        const modal = new bootstrap.Modal(this.html)
        modal.show()
    }

    Hide() {
        const modal = bootstrap.Modal.getInstance(this.html)
        modal.hide()
    }


}

export { Modal }
