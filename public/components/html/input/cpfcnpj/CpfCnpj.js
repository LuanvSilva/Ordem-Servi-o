import { Input } from "../input.js";

class CpfCnpj extends Input {

    constructor(label, placeholder, col, callback) {
        super('input', label, placeholder, col, callback)
        this.placeholder = placeholder
        this.callback = callback
        
      }

    async Load() {
       await this.ConfiguraCamposCpfCnpj()
       await this.ConfiguraMaskCpfCnpj()
    }

    ConfiguraCamposCpfCnpj(){

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

    ConfiguraMaskCpfCnpj(){

        let self = this
        this.On('input', async function() {
           await self.ApplyCpfCnpjMask(self.Val())
        })
    }

    ApplyCpfCnpjMask(value){

        let self = this
        value = value.replace(/\D/g, '')

        if (value.length <= 11) { 

            value = value
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

            self.Atributo('maxlength', '15')
        } else {

            value = value
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')

            self.Atributo('maxlength', '18')
        }

        self.Val(value) 
    }

}

export { CpfCnpj }