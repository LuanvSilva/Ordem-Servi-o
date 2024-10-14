class Constantes {
    static get URL_BASE() { return "http://localhost:3000" }

    // Rotas Zoom
    static get URL_ZOOM_CLIENTE() {
        return `../../components/html/input/zoom/samples/${this.modelo}.json`
    }

    // Rotas de autenticação
    static get URL_API_AUTH() {
        return "/api/v1/auth/logar"
    }

    // Rotas de clientes
    static get URL_API_POST_CLIENTES() {
        return {
            CADASTRAR: `${this.URL_BASE}/api/v1/client/createClient`,
            BUSCAR_BY_ID: `${this.URL_BASE}/api/v1/client/getClientById`,
            UPDATE: `${this.URL_BASE}/api/v1/client/updateClient`,
        }
    }

    static get URL_PAGES_CLIENTES() {
        return `${this.URL_BASE}/pages/login/login.html`
    }

    static get STATUS_SOLICITACAO() {
        return {
            PENDENTE: 1,
            APROVADO: 2,
            REPROVADO: 3,
        }
    }

    static get VALIDA() {
        return {
            EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        }
    }
}

export { Constantes };
