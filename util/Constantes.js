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

    static get URL_API_CLIENTES() {
        return {
            CADASTRAR: `${this.URL_API}/api/v1/clientes/cadastrarCliente`,
            ATUALIZAR: `${this.URL_API}/api/v1/clientes/atualizar`,
            DELETAR: `${this.URL_API}/api/v1/clientes/deletar`,
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

    static get VALIDA() {
        
        return {
            EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            CPF: /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, 
            CNPJ: /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/, 
            TELEFONE: /^\(?\d{2}\)? ?(?:\d{5}-\d{4}|\d{4}-\d{4})$/, 
            CEP: /^\d{5}-\d{3}$/ 
        }
    }
    
    
    static get MENSAGEM() {
        
        return {
            LOGIN_SUCESSO: "Login realizado com sucesso",
            ERRO_LOGIN: "Erro ao realizar login",
            EMAIL_INVALIDO: "Email inválido",
            SENHA_INVALIDA: "Senha inválida. Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial."
        }
    }
}

export default Constantes;
