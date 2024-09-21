import { Input } from '../input.js'

class Money extends Input {
  constructor(label, placeholder, col, callback) {
    super("input", label, placeholder, col, callback)
    this.placeholder = placeholder
    this.callback = callback
  }

    async Load() {
        this.ConfiguraCamposMoney()
        this.ConfiguraMaskMoney()
    }

    ConfiguraCamposMoney(){

        this.Atributo('type','text')
        this.AddClass('input-carwash')
        this.Atributo("autocomplete", "off")

        if (this.placeholder) {
    
          this.Placeholder(this.placeholder)
        }

        if (this.callback) {
    
          this.Change(this.callback)
        }
    }

    ConfiguraMaskMoney(){

        let self = this
        this.On('input', async function() {
           await self.ApplyMoneyMask(self.Val())
        })
    }

    ApplyMoneyMask(value){

        let self = this
        value = value.replace(/\D/g, '')

        value = value
                .replace(/(\d)(\d{2})$/, '$1,$2') 
                .replace(/(?=(\d{3})+(\D))\B/g, '.')

        this.Atributo('maxlength', '20')

        super.Val(value)
    }

    Val(value){

        if (value) {

            super.Val(value)

        } else {

            return super.Val()
        }
    }
}

export { Money }