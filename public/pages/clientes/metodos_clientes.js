import { HTML } from "../../components/html/html.js"
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"
import { Constantes } from "../../resources/util/constantes.js"
import { Noty } from "../../components/html/noty/noty.js"
import { Bootstrap } from "../../components/html/bootstrap/bootstrap.js"

class MetodosClientesPage extends HTML {

    #campos_preenchidos = new Object()
    constructor() {
        super()
        this.noty = new Noty()
        this.campos = new Array()
        this.bootstrap = new Bootstrap()
        this.input_loader = new ComponentLoader()
    }

    async MontaCamposModalClientes() {

        const div_row = this.bootstrap.Row()

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

             div_row.appendChild(this.campos[campo.key].div.html)
        }

        return div_row
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