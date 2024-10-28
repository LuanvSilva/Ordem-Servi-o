import { Input } from "../input.js";

class DatePicker extends Input {

    constructor(label, placeholder, classe, callback){
        super("input", label, placeholder, classe, callback)
        this.type = "date"
    }

    Load(){
        this.ConfiguraCampos()
        this.SetMinDate()
    }

    ConfiguraCampos(){
        
        let self = this

        this.Atributo('type', this.type)
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")
        
        if (this.placeholder) {
    
          this.Placeholder(self.placeholder)
        }

        this.Blur(() => {
            this.SetMinDate()
        })
    
        if (this.callback) {
    
          this.Change(this.callback)
        }
    }

    SetMinDate(){
        const today = new Date().toISOString().split('T')[0] 
        this.Atributo('min', today) 
    }

 
}

export { DatePicker }