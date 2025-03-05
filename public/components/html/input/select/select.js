import { Input } from '../input.js'
import { Constantes } from '../../../../resources/util/constantes.js'
class Select extends Input{
    constructor(modelo, label, placeholder, col, callback, option = null){
        super('select', label, placeholder, col, callback)
        this.placeholder = placeholder
        this.callback = callback
        this.registros = null
        this.SetOption(option)
        this.SetModelo(modelo)
        
    }

    SetOption(option){

        this.option = option
    }

    SetModelo(modelo){

        this.modelo = modelo
    }

    SetTextoInicial(texto_inicial){

        this.texto_inicial = texto_inicial
    }
    
    async Load() {
        await this.LoadSelect()
        return await this.ConfiguraCampos()
    }

    async GetModelo() {

        if (!this.modelo) {
            throw new Error('Modelo não informado')
        }

        try {
            const response = await fetch(Constantes.URL_GET_MULTISELECT_MODELOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ modelo: this.modelo, parametros: this.parametros || {} }), 
            })

            if (!response.ok) {
                throw new Error('Erro ao buscar registros')
            }

            this.registros = await response.json()
            this.registros = this.registros.data

        } catch (error) {

            console.log(error)
            throw new Error('Erro ao buscar registros')
        }
    }

    async LoadSelect() {
    

        if (this.option && this.option.length > 0) {
                
            await this.CreateSelect(this.option)

        }else if (this.modelo) {

            await this.GetModelo()
            await this.CreateSelect(this.registros)

        }else {

            this.LoadOption([])
        }
    }

    ConfiguraCampos() {

        this.AddClass('input-carwash')
        if (this.placeholder) this.Placeholder(this.placeholder)
        if (this.callback) this.Change(this.callback)
            
    }

    async CreateSelect(dados){

        let option = document.createElement('option')
        option.text = this.texto_inicial ? this.texto_inicial : 'Selecione'
        this.AppendChild(option)

        for (let dado of dados) {
            
            this.CreateOption(dado.id, dado.descricao, dado)
        }
    }

    CreateOption(value, label, data = null){

        let option = document.createElement('option')
        option.value = value
        option.text = label

        if (data) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    option.dataset[key] = data[key];
                }
            }
        }

        this.AppendChild(option)
    }

    Val(value){

        if (value) {

           super.Val(value)

        }else{

            return this.GetSelectedData()
        }
    }

    GetValue() {

        return this.html.options[this.html.selectedIndex].value
    }

    GetSelectedData() {

        const selectedOption = this.html.options[this.html.selectedIndex]
        const data = {}

        for (let key in selectedOption.dataset) {

            if (selectedOption.dataset.hasOwnProperty(key)) {

                data[key] = selectedOption.dataset[key]
            }
        }

        return data
    }

}

export { Select }