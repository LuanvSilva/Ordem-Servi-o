class Constantes {

    static get URL_API() {
        return "http://localhost:8081";
    }

    static get URL_API_LOGIN() {
        return {
            LOGAR: `${this.URL_API}/api/v1/auth/logar`, 
        };
    }

    static get URL_PAGES() {
        return {
            HOME: `${this.URL_API}/`, 
            LOGIN: "/login",
            AGENDA: "/agenda",
            RELATORIO: "/relatorio",
            CLIENTES: "/clientes"
        };
    }

    static get KEY_SECRET() {
        return {
            KEY: "secret"
        };
    }
}

export default Constantes;
