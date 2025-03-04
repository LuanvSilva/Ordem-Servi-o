import { Input } from '../input.js'

class Select extends Input{
    constructor(modelo, label, placeholder, col, callback, option = null){
        super('select', label, placeholder, col, callback)
        this.placeholder = placeholder
        this.callback = callback
        this.modelo = modelo
        //this.texto_inicial = texto_inicial
        this.SetOption(option)
        this.SetModelo(modelo)
        
    }

    SetOption(option){

        this.option = option
    }

    SetModelo(modelo){

        this.modelo = modelo
    }
    
    async Load() {

        await this.GetModelo()
        return await this.ConfiguraCampos()
    }

    async GetModelo() {
    
       // await this.FetchPost(this.modelo, {}, function() {})
            
        let dados = [ // Exemplo de dados que viriam do servidor caso o modelo fosse um passando como parâmetro no construtor
            { id: 1, name: 'Alice',     age: 30,    descricao: 'A software engineer from New York.' },
            { id: 2, name: 'Bob',       age: 25,    descricao: 'A graphic designer with a passion for art.' },
            { id: 3, name: 'Charlie',   age: 35,    descricao: 'An experienced project manager in the tech industry.' }
        ]

        if (this.option) {
                
            await this.LoadSelect(this.option)

        }else if (this.modelo) {

            await this.LoadSelect(dados)

        }else {

            this.LoadOption([])
        }
    }

    ConfiguraCampos() {

        this.AddClass('input-carwash')
        if (this.placeholder) this.Placeholder(this.placeholder)
        if (this.callback) this.Change(this.callback)
    }

    async LoadSelect(dados){

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

            return {
                id: this.GetValue(),
                data: this.GetSelectedData()
            }
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