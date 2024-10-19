import { HTML } from "../../components/html/html";

class SolicitacaoPage extends HTML {

    constructor(){
        super()
        this.title = 'Solicitação'
    }

    async Open(){

        this.AddHeader()
        this.AddMain()
    }

    AddHeader(){

        this.Find("#header").innerHTML += this.title
    }

    AddMain(){

        this.Find("#main").innerHTML += "Solicitação"
    }
}

export { SolicitacaoPage }