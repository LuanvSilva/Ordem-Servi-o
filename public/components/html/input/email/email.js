import { Input } from '../input.js';

class Email extends Input {

  constructor(label, placeholder, col, callback) {
    super("input", label, placeholder, col, callback)
    this.placeholder = placeholder
    this.callback = callback
  }

    async Load() {
        this.ConfiguraCamposEmail()
        this.ConfiguraMaskEmail()
    }

    ConfiguraCamposEmail(){

        this.Atributo('type','email')
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")

        if (this.placeholder) {
    
          this.Placeholder(this.placeholder)
        }

        if (this.callback) {
    
          this.Change(this.callback)
        }
    }

    ConfiguraMaskEmail(){

        let self = this;
        this.On('blur', async function() {

            if(!self.ValidateEmail(self.Val())) {
                self.AddClass('is-invalid')
            }else{  
                self.RemoveClass('is-invalid')
            }
        })
    }

    ValidateEmail(email) {
        let re = /\S+@\S+\.\S+/
        return re.test(email)
    }
}

export { Email };