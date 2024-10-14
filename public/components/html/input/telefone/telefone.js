import { Input } from "../input.js";

class Telefone extends Input{

    constructor(label, placeholder, col, callback){
        super("input", label, placeholder, col, callback)
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.callback = callback
    }

    async Load(){

        this.ConfiguraCamposTelefone()
        this.ConfiguraMaskTelefone()
    }

    ConfiguraCamposTelefone(){

        let self = this
        this.Atributo('type','text')
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")

        if (this.placeholder) {
            this.Placeholder(self.placeholder)
        }

        if (this.callback) {
            this.Change(this.callback)
        }
    }

    ConfiguraMaskTelefone(){

        let self = this
        this.On('input', async function() {
            await self.ApplyTelefoneMask(self.Val())
        })
    }

    ApplyTelefoneMask(value){
        debugger
        let self = this
        value = value.replace(/\D/g, '')

        value = value
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2')

        self.Atributo('maxlength', '15')
        self.Val(value)
    }
}

export { Telefone };