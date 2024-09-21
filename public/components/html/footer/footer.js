import { HTML } from "../../html/html.js"
class Footer extends HTML{
    constructor(){
        super("footer")
    }

    async Load(){

       await this.AddFooter()
    }

    AddFooter(){

        this.Atributo("class", "flex-shrink-0 py-3 bg-dark text-white-50")
        let div_footer = this.CreateElement("div", { class:"container text-center" })
        
        let small = this.CreateElement("small")
        small.innerHTML = "© 2024 - Todos os direitos reservados  |  Desenvolvido por <i class='uil uil-heart text-danger font-size-12'></i> <a href='' class='text-white font-weight-medium'>Luan</a>"
        div_footer.appendChild(small)


        this.html.appendChild(div_footer)
    }
}

export { Footer }