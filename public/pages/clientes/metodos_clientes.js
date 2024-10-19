import { HTML } from "../../components/html/html.js"
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
import { Constantes } from "../../resources/util/constantes.js"
import { Noty } from "../../components/html/noty/noty.js"
class MetodosClientesPage extends HTML {

    #campos_preenchidos = new Object()
    constructor() {
        super()
        this.noty = new Noty()
        this.campos = new Array()
        this.input_loader = new ComponentLoader()
    }

    async MontaCamposModalClientes() {

        const campos = [
            { key: "name", type: "Text", label: "Nome" },
            { key: "email", type: "Email", label: "Email" },
            { key: "telefone", type: "Telefone", label: "Telefone" },
            { key: "cpfcnpj", type: "CpfCnpj", label: "CPF/CNPJ" },
            { key: "endereco", type: "Cep", label: "CEP" },
        ]
    
        for (const campo of campos) {
            
            this.campos[campo.key] = await this.input_loader.GetComponent(
                campo.type, campo.label, campo.label, "col-md-3 mt-3", null, { id: campo.key, name: campo.key }
            )
        }
    }

    async MontaCamposHTML(){

        const campos_clientes = new Array()
        await this.MontaCamposModalClientes()
        const div = this.CreateElement("div", { class: "row" })
    
        for (const campo in this.campos) {

            const campoHtml = this.campos[campo].div.html
    
            if (campo !== "cep") {

                div.appendChild(campoHtml)
                campos_clientes.push(div)

            } else {

                campos_clientes.push(campoHtml)
            }
        }

        return campos_clientes
    }

    ProcessaCampos(){

        for (const campo in this.campos) {

            this.#campos_preenchidos[campo] = this.campos[campo].Val()
     
        }

    }

    async SalvarCliente(){

        this.ProcessaCampos()

        try {

            const response = await fetch(Constantes.URL_API_POST_CLIENTES.CADASTRAR, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.#campos_preenchidos),
            })
    
            const data = await response.json()

            if(!data.success) throw new Error(data.message)
            console.log(data)
            this.noty.Noty("success", "Cliente cadastrado com sucesso")

        } catch (error) {

            this.noty.Noty("warning", `Erro ao cadastrar cliente: ${error.message}`)
        }
        
    }

}

export { MetodosClientesPage }