import { HTML } from "../../components/html/html.js"
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
class MetodosClientesPage extends HTML {

    constructor() {
        super()
        this.campos = new Array()
        this.input_loader = new ComponentLoader()
    }

    async MontaCamposModalClientes() {

        this.campos["nome"]     = await this.input_loader.GetComponent('Text',  "Nome", "Nome", "col-md-3", null, { id: "nome", name: "nome" })
        this.campos["email"]    = await this.input_loader.GetComponent('Email', "Email","Email", "col-md-3", null, { id: "email", name: "email" })
        this.campos["cep"]      = await this.input_loader.GetComponent('Cep',   "CEP", "CEP", "col-md-3", null, { id: "cep", name: "cep" })
        this.campos["telefone"] = await this.input_loader.GetComponent('Text',  "Telefone", "Telefone", "col-md-3", null, { id: "telefone", name: "telefone" })
        this.campos["cpf"]      = await this.input_loader.GetComponent('CpfCnpj', "CPF/CNPJ", "CPF", "col-md-3", null, { id: "cpf", name: "cpf" })

    }

    async MontaCamposHTML(){

        this.clientes = []
        await this.MontaCamposModalClientes()
        let div = this.CreateElement("div", { class: "row" })

        for (const campos in this.campos) {

            if(campos != "cep"){

                div.appendChild(this.campos[campos].div.html)
                this.clientes.push(div)
                continue
            }

            this.clientes.push(this.campos[campos].div.html) 
        }
    }

    async SalvarCliente(){

        let self = this
        let cliente = new Map()

       for (const campo in this.campos) {

            cliente.set(campo, this.campos[campo].Val())
     
        }

        // const response = await fetch('http://localhost:3000/clientes', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(cliente),
        // })
        // if (!response.ok) {

        //     throw new Error('Erro ao salvar cliente!' + response.status)
        // }

        // const data = await response.json()

        console.log(cliente)
    }

}

export { MetodosClientesPage }