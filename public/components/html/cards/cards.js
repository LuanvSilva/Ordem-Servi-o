import { HTML } from "../html.js";

class CardMenu extends HTML{

    constructor(descricao, card_secundario, icone, bgColorClass, coluna) {
        super("div")
        this.SetIcone(icone)
        this.SetColuna(coluna)
        this.SetDescricao(descricao)
        this.SetBgColorClass(bgColorClass)
        this.SetCardSecundario(card_secundario)
    }

    SetIcone(icone) {

        this.icone = icone
    }

    SetColuna(coluna) {

        this.coluna = coluna
    }

    SetDescricao(descricao) {

        this.descricao = descricao
    }

    SetBgColorClass(bgColorClass) {
        
        this.bgColorClass = bgColorClass
    }

    SetCardSecundario(card_secundario) {

        this.card_secundario = card_secundario
    }

    ColorCard() {
        
        switch (this.bgColorClass) {
            case "blue":
                return "bg-c-blue order-card";
            case "green":
                return "bg-c-green order-card";
            case "yellow":
                return "bg-c-yellow order-card";
            case "pink":
                return "bg-c-pink order-card";
            case "purple":
                return "bg-c-purple order-card";
            case "red":
                return "bg-c-red order-card";
            default:
                return "bg-c-blue order-card";
        }
    }

    Load() {
        this.MontaCard()
    }

    MontaCard() {

        let self = this
        this.Atributo("class", `${this.coluna} col-xl-3`)
        const card = this.CreateElement("div", { class: `card ${self.ColorCard()} ` })
        const cardBlock = this.CreateElement("div", { class: "card-block" })
        const titulo = this.CreateElement("h6", { class: "m-b-20" })
        titulo.textContent = this.descricao

        const cardContent = this.CreateElement("h2", { class: "text-right" })
        const icon = this.CreateElement("i", { class: `fa ${this.icone} f-left` })
        const span = this.CreateElement("span")
        span.setAttribute("id", "card_principal")
        span.textContent = "486"; 

        const footer = this.CreateElement("p", { class: "m-b-0" });
        footer.textContent = this.card_secundario
        const footerSpan = this.CreateElement("span", { class: "f-right" })
        footerSpan.setAttribute("id", "card_secundario")
        footerSpan.textContent = "351" 

        cardContent.appendChild(icon)
        cardContent.appendChild(span)
        footer.appendChild(footerSpan)
        cardBlock.appendChild(titulo)
        cardBlock.appendChild(cardContent)
        cardBlock.appendChild(footer)
        card.appendChild(cardBlock)
        this.AppendChild(card)
    }

    SetVal(value_principal, value_secundario) {

        this.Find("#card_principal").textContent = value_principal 
        this.Find("#card_secundario").textContent = value_secundario
    }
    
}

export { CardMenu };