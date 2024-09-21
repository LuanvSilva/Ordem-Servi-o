class Constantes {

    static get URL_BASE(){ return "http://localhost:3000" }

    // ROTAS ZOOM
    static get URL_ZOOM_CLIENTE() { return "../../components/html/input/zoom/samples/${this.modelo}.json" }

    //rotas de autenticação
    static get URL_API_AUTH() { return "/api/vi/auth/logar"}
    
    //rotas de clientes
    static get URL_API_CLIENTES()   { return this.URL_BASE + "/api/v1/clientes" }
    static get URL_PAGES_CLIENTES() { return this.URL_BASE + "/pages/login/login.html" }

    static get STATUS_SOLICITACAO() { 
        return {
            PENDENTE: 1,
            APROVADO: 2,
            REPROVADO: 3
        } 
    }

    static get VALIDA(){
        return {
            EMAIL: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",
            PASSWORD: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;"
        }
    }
}

export { Constantes }