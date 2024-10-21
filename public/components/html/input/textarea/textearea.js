import { Input } from '../input.js'

class TextArea extends Input {
    constructor(label, placeholder, col, callback) {
        super('textarea', label, placeholder, col, callback)
        this.placeholder = placeholder
        this.callback = callback
        
    }
    
    async Load() {
    
        return await this.ConfiguraCampos()
    }
    
    ConfiguraCampos() {
        
        let self = this
    
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")

        if (this.placeholder) {
                
            this.Placeholder(self.placeholder)
        }

        if(this.callback) {

            this.Change(this.callback)
        }

    }
}   

export { TextArea }