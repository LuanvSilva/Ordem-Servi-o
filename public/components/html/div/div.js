import { HTML } from "../html.js"

class Div extends HTML {
  constructor(className) {
    super("div")
    this.className = className
  }
  
  SetClass(className) {

    if (className) {

      this.Atributo("class", className)
    }

  }

  async Load() {
    
    return await this.ConfiguraCampos()
  }

  ConfiguraCampos() {

    if (this.className) {

      this.AddClass(this.className)
    }

    return this.html

  }

}

export { Div }