import { Input } from '../input.js'

class Text extends Input {
  constructor(label, placeholder, col, callback) {
    super('input', label, placeholder, col, callback)
    this.placeholder = placeholder
    this.callback = callback
    
  }

  async Load() {

    return await this.ConfiguraCampos()
  }

  ConfiguraCampos() {
    
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

}

export { Text }