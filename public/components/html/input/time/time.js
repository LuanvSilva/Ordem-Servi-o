import { Input } from "../input.js";

class Time extends Input {

    constructor(label, placeholder, classe, callback){
        super("input", label, placeholder, classe, callback)
        this.type = "time"
    }

    Load(){
        this.ConfiguraCampos()
    }

    ConfiguraCampos(){
        let self = this

        this.Atributo('type', this.type)
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")
        
        if (this.placeholder) {
          this.Placeholder(self.placeholder)
        }

        if (this.callback) {
          this.Change(this.callback)
        }
    }
}

export { Time }
