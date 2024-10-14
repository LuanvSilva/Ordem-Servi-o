import { HTML } from "../../components/html/html.js"
import { Footer } from "../../components/html/footer/footer.js"
import { Noty } from "../../components/html/noty/noty.js"
import { Constantes } from "../../resources/util/constantes.js"
import { Bootstrap } from "../../components/html/bootstrap/bootstrap.js"
import { Util } from "../../resources/util/util.js"
import { ComponentLoader } from "../../components/modulos/ComponentLoader/ComponentLoader.js"

class LoginPage extends HTML{
    constructor(){
        super()
        this.noty = new Noty()  
        this.campos = new WeakMap()
        this.util = new Util()
        this.campos_cadastro = new WeakMap()
        this.input_loader = new ComponentLoader()
    }

    Open(){
        this.AddMain()
        this.AddFooter()
    }


    AddMain(){
        this.MontaLogin()
        this.MontaEsqueciSenha()
        this.CadastrarUsurio()
    }

    async MontaLogin(){

        let self = this
        let icon_email = this.CreateElement("i", {class:"input-icon uil uil-at" })
        let icon_senha = this.CreateElement("i",{ class:"input-icon uil uil-lock" })

        this.campos["email"]    = await this.input_loader.GetComponent('Email', false, "Seu E-mail", "form-group", null, { id: "email", class: "form-style",})
        this.campos["password"] = await this.input_loader.GetComponent('Text', false, "Sua Senha", "form-group mt-2", null, { id: "senha", class: "form-style"})
        
        this.campos["email"].div.AppendChild(icon_email)
        this.campos["password"].div.AppendChild(icon_senha)

        for(let campo in this.campos){

            this.Find("#login").appendChild(this.campos[campo].div.html)
        }

        this.btn = this.CreateElement("a", { class:"btn mt-4" }, "Entrar")
        this.btn.addEventListener("click", () => self.Logar())

        this.Find("#login").appendChild(this.btn)

        let p = this.CreateElement("p", { class:"mb-0 mt-4 text-center" })
        let a = this.CreateElement("a", { class:"link" }, "Esqueceu sua senha?")
        p.appendChild(a)

        this.Find("#login").appendChild(p)


    }

    async CadastrarUsurio(){

        let icon_email = this.CreateElement("i",{class:"input-icon uil uil-at" })
        let icon_senha = this.CreateElement("i",{ class:"input-icon uil uil-lock" })
        let icon_nome  = this.CreateElement("i",{ class:"input-icon uil uil-user" })

        this.campos_cadastro["novo_email"]    =  await this.input_loader.GetComponent('Email', false, "Seu E-mail", "form-group", null, { id: "novo_email", class: "form-style",})
        this.campos_cadastro["novo_password"] =  await this.input_loader.GetComponent('Text', false, "Sua Senha", "form-group mt-2", null, { id: "novo_senha", class: "form-style"})
        this.campos_cadastro["novo_nome"]     =  await this.input_loader.GetComponent('Text', false, "Seu Nome", "form-group mt-2", null, { id: "novo_nome", class: "form-style"})
        
        this.campos_cadastro["novo_email"].div.AppendChild(icon_email)
        this.campos_cadastro["novo_password"].div.AppendChild(icon_senha)
        this.campos_cadastro["novo_nome"].div.AppendChild(icon_nome)

        for(let campo in this.campos_cadastro){

            this.Find("#cadastrar").appendChild(this.campos_cadastro[campo].div.html)
        }

        this.btn = this.CreateElement("a", { class:"btn mt-4" }, "Cadastrar")
        this.btn.addEventListener("click", () => this.Cadastrar())

        this.Find("#cadastrar").appendChild(this.btn)


    }

    MontaEsqueciSenha(){

    }

    Logar(){
            
        let self = this
        let login = this.campos["email"].Val()
        let password = this.campos["password"].Val()
        let valid = new RegExp(Constantes.VALIDA.EMAIL)
        if(login.trim() == "" || password.trim() == ""){
            self.noty.Noty("warning","Preencha todos os campos")
            return
        }

        fetch(Constantes.URL_API_AUTH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({login, password})
        })
        .then(response => response.json())
        .then(data => {

            if(data.success == false){

                console.error("Erro ao efetuar login", data.message)
                self.noty.Noty('danger',"Erro ao efetuar login")
                return
            }

           window.location.href = data.url

        }).catch(error => {
            console.error("Erro ao efetuar login", error)
            self.noty.Noty('danger',"Erro ao efetuar login")
        })
    }

    AddFooter(){

        let footer = new Footer()
        footer.Load()
        this.Find("#footer").appendChild(footer.html)
    }
  
}

export { LoginPage };