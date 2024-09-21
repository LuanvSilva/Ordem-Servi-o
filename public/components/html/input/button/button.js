import { HTML } from "../../html.js"

class Button extends HTML{
    constructor(label, tipo, col, callback){
        super("button")
        this.tipo = tipo
        this.label = label
        this.col = col
        this.callback = callback
    }

    async Load(){
        await this.ConfiguraButton()
    }

    async ConfiguraButton(){

        this.HTML(this.label)
        this.Atributo("type", "button")

        if(this.tipo != undefined){

            this.Atributo("class", "btn btn-" + this.tipo + " " + this.col)
        }
        
        if(this.callback != undefined && typeof this.callback == "function"){

            this.Click(this.callback)
        }
        
    }
}

export { Button }