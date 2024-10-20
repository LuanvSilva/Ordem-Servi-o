import { Text } from "../../html/input/text/text.js";
import { Email } from "../../html/input/email/email.js";
import { Money } from "../../html/input/money/money.js";
import { CpfCnpj } from "../../html/input/cpfcnpj/CpfCnpj.js";
import { Cep } from "../../html/input/cep/cep.js";
import { Telefone } from "../../html/input/telefone/telefone.js";
import { TextArea } from "../../html/input/textarea/textearea.js";
import { Checkbox } from "../../html/input/checkbox/checkbox.js";
import { DatePicker } from "../../html/input/datepicker/datepicker.js";
import { Time } from "../../html/input/time/time.js";

class ComponentLoader {
  constructor() {
    this.components = new WeakMap()
    this.components["Cep"] = Cep
    this.components["Text"] = Text
    this.components["Email"] = Email
    this.components["Money"] = Money
    this.components["CpfCnpj"] = CpfCnpj
    this.components["Telefone"] = Telefone
    this.components["TextArea"] = TextArea
    this.components["Checkbox"] = Checkbox
    this.components["Date"] = DatePicker
    this.components["Time"] = Time

  }

  async GetComponent(componentName, ...args) {

    if (this.components[componentName]) {

        const componentInstance = new this.components[componentName](...args)
        await componentInstance.Load()

        if (args.length > 0 && typeof args[args.length - 1] === 'object') {

            const params = args.pop()
            if (params.id) componentInstance.Id(params.id)
            if (params.name) componentInstance.Name(params.name)
            if (params.value) componentInstance.Val(params.value)
            if (params.class) componentInstance.AddClass(params.class)
            if (params.disabled) componentInstance.Disabled(params.disabled)
            if (params.required) componentInstance.Required(params.required)
            if (params.readonly) componentInstance.Readonly(params.readonly)
            if (params.type) componentInstance.Atributo('type', params.type)
            if (params.callback) componentInstance.SetCallback(params.callback)
            if (params.placeholder) componentInstance.Placeholder(params.placeholder)
            
        }
  
        return componentInstance

    } else {
        throw new Error(`Componente ${componentName} não encontrado.`)
    }
  }
}

export { ComponentLoader }