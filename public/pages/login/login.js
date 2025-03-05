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
        this.campos = []
        this.util = new Util()
        this.campos_cadastro = new WeakMap()
        this.input_loader = new ComponentLoader()
    }

    async Open(){
        await this.AddMain()
        this.AddFooter()
    }


    async AddMain(){
        await this.MontaLogin()
        this.MontaEsqueciSenha()
        //this.CadastrarUsurio()
    }

    async MontaLogin(){

        let self = this
        this.icones = {}
        this.icones.email = this.CreateElement("i", {class:"input-icon uil uil-at" })
        this.icones.senha = this.CreateElement("i",{ class:"input-icon uil uil-lock" })

        const campos_login = await fetch('./login.json').then(response => response.json())
    
        for (const campo of campos_login.campos) {
            
            if(campo.callback && typeof campo.callback === 'string' && this[campo.callback]) {

                campo.callback = this[campo.callback].bind(this)
            }

            this.input_loader.SetAtributes(campo.attrs)

            this.campos[campo.key] = await this.input_loader.GetComponent(
                campo.type,
                campo.modelo || null,
                campo.label,
                campo.placeholder,
                campo.class,
                campo.callback,  
                campo.position,
                campo.attrs,
                campo.options
            )
            
            this.campos[campo.key].div.AppendChild(self.icones[campo.key])
            this.AppendChild(self.campos[campo.key].div.html, "#login")
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
        let password = this.campos["senha"].Val()
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