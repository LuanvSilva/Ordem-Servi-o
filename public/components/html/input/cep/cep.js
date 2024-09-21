import { Input } from "../input.js"
import { ComponentLoader } from "../../../modulos/ComponentLoader/ComponentLoader.js"

class Cep extends Input {
    
    #nome
    constructor(label, placeholder, col, callback) {
        super("input", label, placeholder, col, callback)
        this.label = label
        this.placeholder = placeholder
        this.callback = callback
        this.col = col
        this.input_loader = new ComponentLoader()
        this.campos_cep = new Array()
        this.#nome = 'cep'
        
    }

    async Load() {
        await this.ConfiguraCamposCep()
        await this.ConfiguraMaskCep()
        await this.MontaCamposCep()
    }

    ConfiguraCamposCep(){

        let self = this
        this.Atributo('type','text')
        this.Atributo("autocomplete", "off")
        this.AddClass('input-carwash')

        if (this.placeholder) {
            this.Placeholder(self.placeholder)
        }

        if (this.callback) {
            this.Change(this.callback)
        }
    }

    ConfiguraMaskCep(){

        let self = this
        this.On('input', async function() {
           await self.ApplyCepMask()
        })

        this.On('blur', async function() {
            await self.BuscaCep()
        })
    }

    ApplyCepMask(){
        
        let value = super.Val()
        value = value.replace(/\D/g, '')

        value = value
                .replace(/^(\d{5})(\d)/, '$1-$2')

        this.Atributo('maxlength', '9')  
        super.Val(value)   
   
    }

    async BuscaCep() {

        let cep = super.Val()
        let self = this
        await this.FetchGet(`https://viacep.com.br/ws/${cep}/json/`, (data) => {
            self.SetVal(data)
        })
    }

    async MontaCamposCep(){

        let self = this

        this.campos_cep["endereco"]     =  await this.input_loader.GetComponent("Text", "Endereço", "Digite o endereço", self.col, false , { id: "endereco", obrigatorio: true, disabled: false })
        this.campos_cep["bairro"]       =  await this.input_loader.GetComponent("Text", "Bairro", "Digite o bairro", self.col, false, { id: "bairro", obrigatorio: true, disabled: false })
        this.campos_cep["cidade"]       =  await this.input_loader.GetComponent("Text", "Cidade", "Digite a cidade", self.col, false, { id: "cidade", obrigatorio: true, disabled: false })
        this.campos_cep["estado"]       =  await this.input_loader.GetComponent("Text", "Estado", "Digite o estado", self.col, false, { id: "estado", obrigatorio: true, disabled: false })
        this.campos_cep["complemento"]  =  await this.input_loader.GetComponent("Text", "Complemento", "Digite o complemento", self.col, false, { id: "complemento", obrigatorio: true, disabled: false })
        this.campos_cep["numero"]       =  await this.input_loader.GetComponent("Text", "Número", "Digite o número", self.col, false, { id: "numero", obrigatorio: true, disabled: false })

        await this.MontaCamposHTML(this.campos_cep)
    }

    async MontaCamposHTML() {

        this.divCep = this.CreateElement("div", { class: "row" })
        this.divCep.appendChild(this.div.html)

       for (const campo in this.campos_cep) {

            this.divCep.appendChild(this.campos_cep[campo].div.html)
        }

        this.div.html = this.divCep

    }

    SetVal(data){

        super.Val(data.cep || '')
        this.campos_cep["estado"].Val(data.uf || '')
        this.campos_cep["cidade"].Val(data.localidade || '')
        this.campos_cep["endereco"].Val(data.logradouro || '')
        this.campos_cep["bairro"].Val(data.bairro || '')
        this.campos_cep["numero"].Val(data.numero || '')
        this.campos_cep["complemento"].Val(data.complemento || '')
     
    }

    LimpaCampos() {

       for (const campo in this.campos_cep) {

            this.campos_cep[campo].Val('')
        }
    }


    Val(value) {

        if(value && typeof value == "string"){

            super.Val(value)
            this.Blur()

        }else if(typeof value === "object"){

           for (const campo in this.campos_cep) {

                this.campos_cep[campo].Val(value[campo])
            }

        }else{
            return{
                cep: super.Val(),
                bairro: this.campos_cep["bairro"].Val(),
                cidade: this.campos_cep["cidade"].Val(),
                estado: this.campos_cep["estado"].Val(),
                numero: this.campos_cep["numero"].Val(),
                endereco: this.campos_cep["endereco"].Val(),
                complemento: this.campos_cep["complemento"].Val()
            }
        }
    }


}

export { Cep }