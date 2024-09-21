import { Input } from '../input.js'

class Select extends Input{
    constructor(modelo, texto_inicial, label, placeholder, col, callback) {
        super('select', label, placeholder, col, callback)
        this.placeholder = placeholder
        this.callback = callback
        this.modelo = modelo
        this.texto_inicial = texto_inicial
        
    }
    
    async Load() {

        await this.GetModelo()
        return await this.ConfiguraCampos()
    }

    async GetModelo() {
    
       // await this.FetchPost(this.modelo, {}, function() {})
            
        let dados = [
            { id: 1, name: 'Alice',     age: 30,    descricao: 'A software engineer from New York.' },
            { id: 2, name: 'Bob',       age: 25,    descricao: 'A graphic designer with a passion for art.' },
            { id: 3, name: 'Charlie',   age: 35,    descricao: 'An experienced project manager in the tech industry.' }
        ]

        await this.LoadSelect(dados)

       
    }

    async LoadSelect(dados){

        let option = document.createElement('option')
        option.text = this.texto_inicial ? this.texto_inicial : 'Selecione'
        this.AppendChild(option)

        for (let dado of dados) {
                
            let option = document.createElement('option')
            
            option.value = dado.id
            option.text = dado.descricao
            
            this.AppendChild(option)
        }
    }
    
    ConfiguraCampos() {
        
        let self = this
    
        this.AddClass('input-carwash')

        if (this.placeholder) {
                
            this.Placeholder(self.placeholder)
        }

        if(this.callback) {

            this.Change(this.callback)
        }

    }
}

export { Select }