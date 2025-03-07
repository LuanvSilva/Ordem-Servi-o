class Constantes {

    static get URL_BASE() { 
        return "http://localhost:3000" 
    }

    static get URL_API_AUTH() {
        return "/api/v1/auth/logar"
    }

    static get URL_GET_TABLE_MODELOS() {
        return  `${this.URL_BASE}/api/v1/modelos/getModelos`
    }

    static get URL_GET_MULTISELECT_MODELOS() {
        return  `${this.URL_BASE}/api/v1/modelos/getModelosMultiSelect`
    }

    static get URL_API_POST_CLIENTES() {
        return {
            CADASTRAR: `${this.URL_BASE}/api/v1/client/createClient`,
            BUSCAR_BY_ID: `${this.URL_BASE}/api/v1/client/getClientById`,
            UPDATE: `${this.URL_BASE}/api/v1/client/updateClient`,
        }
    }

    static get URL_BASE_ITENS() {
        return {
            CADASTRAR:  `${this.URL_BASE}/api/v1/item/create`,
            ATUALIZAR:  `${this.URL_BASE}/api/v1/item/update`,
            DELETAR:    `${this.URL_BASE}/api/v1/item/delete`,
            LISTAR:     `${this.URL_BASE}/api/v1/item/all`,
            LISTAR_ID:  `${this.URL_BASE}/api/v1/item/`,
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
