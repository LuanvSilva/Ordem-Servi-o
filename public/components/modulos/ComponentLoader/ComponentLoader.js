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
import { MultiSelect } from "../../html/input/multiselect/multiselect.js";
import { Select } from "../../html/input/select/select.js";

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
    this.components["MultiSelect"] = MultiSelect
    this.components["Select"] = Select

  } 

  SetAtributes(atributes) {

    this.atributes = atributes
  }

  SetAtributesComponent(component, params) {

    if (params.id) component.Id(params.id)
    if (params.name) component.Name(params.name)
    if (params.value) component.Val(params.value)
    if (params.class) component.AddClass(params.class)
    if (params.disabled) component.Disabled(params.disabled)
    if (params.required) component.Required(params.required)
    if (params.readonly) component.Readonly(params.readonly)
    if (params.type) component.Atributo('type', params.type)
    if (params.callback) component.SetCallback(params.callback)
    if (params.placeholder) component.Placeholder(params.placeholder)
    if( params.options) component.SetOption(params.options)
  }

  async GetComponent(componentName, ...args) {

    args = args.filter(arg => arg != null)

    if (this.components[componentName]) {

        const componentInstance = new this.components[componentName](...args)
        await componentInstance.Load()
        await this.SetAtributesComponent(componentInstance, this.atributes)
  
        return componentInstance

    } else {
        throw new Error(`Componente ${componentName} não encontrado.`)
    }
  }
}

export { ComponentLoader }