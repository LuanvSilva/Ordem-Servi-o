class Constantes {

    static get URL_API() {
        return "http://localhost:8081";
    }

    static get URL_BASE() {
        return "http://localhost:3000";
    }

    static get URL_API_LOGIN() {
        return {
            LOGAR: `${this.URL_API}/api/v1/auth/logar`, 
        }
    }

    static get URL_PAGES() {
        return {
            HOME: `${this.URL_BASE}/pages/home/home`, 
            LOGIN: `${this.URL_BASE}/pages/login/login`,
            AGENDA: `${this.URL_BASE}/pages/agenda/agenda,`,
            CLIENTES: `${this.URL_BASE}/pages/clientes/clientes`,
            RELATORIO: `${this.URL_BASE}/pages/relatorio/relatorio`,
        }
    }

    static get KEY_SECRET() {
        return {
            KEY: "secret"
        }
    }

    static get VALIDA(){
        return {
            EMAIL: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",
            PASSWORD: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;"
        }
    }
}

export default Constantes;
