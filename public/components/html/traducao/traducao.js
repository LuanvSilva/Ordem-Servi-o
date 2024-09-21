
import { Button } from "../input/button/button.js"
import { Text } from "../input/text/text.js"
//import { Textarea } from "../input/textarea/textarea.js"
//import { Number } from "../input/number/number.js"
import { CpfCnpj } from "../input/cpfcnpj/CpfCnpj.js"
import { Telefone } from "../input/telefone/telefone.js"
import { Cep } from "../input/cep/cep.js"

class Traducao{

    constructor(){

        this.objetos = new Object()
    }

    AddObjeto(estrutura, objeto) {

        if (estrutura.id) {

            this.objetos[estrutura.id] = objeto

        }

    }

    async GetHTML(estrutura) {

        switch (estrutura.html_type) {

            case "button":

                let button = new Button(estrutura.label, estrutura.type)
                await button.Load()
                button.Id(estrutura.id)
                button.Name(estrutura.id)
                this.AddObjeto(estrutura, button)
                return button.div.html

            case "text":

                let text = new Text(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await text.Load()
                text.Id(estrutura.id)
                text.Name(estrutura.id)
                text.Placeholder(estrutura.placeholder)
                text.Obrigatorio(estrutura.obrigatorio)
                text.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, text)
                return text.div.html
            
            case "textarea":
                    
                let textarea = new Textarea(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await textarea.Load()
                textarea.Id(estrutura.id)
                textarea.Name(estrutura.id)
                textarea.Placeholder(estrutura.placeholder)
                textarea.Obrigatorio(estrutura.obrigatorio)
                textarea.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, textarea)
                return textarea.div.html
            
            case "number":
                    
                let number = new Number(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await number.Load()
                number.Id(estrutura.id)
                number.Name(estrutura.id)
                number.Placeholder(estrutura.placeholder)
                number.Obrigatorio(estrutura.obrigatorio)
                number.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, number)
                return number.div.html

            case "cpfcnpj":
                        
                let cpfcnpj = new CpfCnpj(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await cpfcnpj.Load()
                cpfcnpj.Id(estrutura.id)
                cpfcnpj.Name(estrutura.id)
                cpfcnpj.Placeholder(estrutura.placeholder)
                cpfcnpj.Obrigatorio(estrutura.obrigatorio)
                cpfcnpj.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, cpfcnpj)
                return cpfcnpj.div.html

            case "telefone":
                            
                let telefone = new Telefone(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await telefone.Load()
                telefone.Id(estrutura.id)
                telefone.Name(estrutura.id)
                telefone.Placeholder(estrutura.placeholder)
                telefone.Obrigatorio(estrutura.obrigatorio)
                telefone.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, telefone)
                return telefone.div.html

            case "cep":
                                
                let cep = new Cep(estrutura.label, estrutura.placeholder, estrutura.col, estrutura.function)
                await cep.Load()
                cep.Id(estrutura.id)
                cep.Name(estrutura.id)
                cep.Placeholder(estrutura.placeholder)
                cep.Obrigatorio(estrutura.obrigatorio)
                cep.Disabled(estrutura.disabled)
                this.AddObjeto(estrutura, cep)
                return cep.div.html
                
            default:
                break;
        }
    }
}

export { Traducao }