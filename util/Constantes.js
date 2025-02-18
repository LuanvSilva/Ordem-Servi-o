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
            CADASTRAR: `${this.URL_API}/api/v1/client/createClient`,
            ATUALIZAR: `${this.URL_API}/api/v1/client/updateClient`,
            DELETAR: `${this.URL_API}/api/v1/client/deletar`,
            LISTAR: `${this.URL_API}/api/v1/client/listar`,
        }
    }

    static get URL_BASE_CLIENTES() {
        return {
            CADASTRAR: "/api/v1/client/createClient",
            ATUALIZAR: "/api/v1/client/updateClient",
            DELETAR: "/api/v1/client/deletar",
            LISTAR: "/api/v1/client/listar",
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

    static get URL_GET_MODELOS_TABLE() {
        return {
            GET_CLIENTES: `${this.URL_API}/api/v1/client/getAllClient`,
            GET_CLIENTE_BY_ID: `${this.URL_API}/api/v1/modelos/clientes`,
        }
    }
    
    static get URL_BASE_TABLE() {
        return {
            GET_TABLE: "/api/v1/modelos/getModelos",
        }
    }

    static get URL_GET_MODELOS_MULTISELECT() {
        return {
            GET_CLIENTES: "/api/v1/modelos/getModelosMultiSelect"
        }
    }

    static get URL_INTEGRACAO_GEMINI() {
        return {
            URL_BASE: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        }
    }

    static get URL_BASE_SOLICITACOES() {
        return {
            CADASTRAR:  "/api/v1/solicitacao/create",
            ATUALIZAR:  "/api/v1/solicitacao/update",
            DELETAR:    "/api/v1/solicitacao/delete",
            LISTAR:     "/api/v1/solicitacao/all",
            ALTERAR_STATUS: "/api/v1/solicitacao/changeStatus",
            LISTAR_ID:  "/api/v1/solicitacao/",
        }
    }

    static get URL_API_SOLICITACAO() {
        return {
            CADASTRAR:  `${this.URL_API}/api/v1/solicitacao/create`,
            ATUALIZAR:  `${this.URL_API}/api/v1/solicitacao/update`,
            DELETAR:    `${this.URL_API}/api/v1/solicitacao/delete`,
            LISTAR:     `${this.URL_API}/api/v1/solicitacao/all`,
            ALTERAR_STATUS: `${this.URL_API}/api/v1/solicitacao/changeStatus`,
            LISTAR_ID:  `${this.URL_API}/api/v1/solicitacao/`,
        }
    }

    static get MENSAGEM() {
        
        return {
            LOGIN_SUCESSO: "Login realizado com sucesso",
            ERRO_LOGIN: "Erro ao realizar login",
            EMAIL_INVALIDO: "Email inválido",
            SENHA_INVALIDA: "Senha inválida. Deve conter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial.",
            CADASTRO_SUCESSO: "Cadastro realizado com sucesso",
            ERRO_CADASTRO: "Erro ao realizar cadastro",
            MODELO_NAO_ENCONTRADO: "Modelo não encontrado",
            MODELO_NAO_INFORMADO: "Modelo não informado",
            ERRO_GET_TABLE: "Erro ao buscar registros",
            GET_TABLE_SUCESSO: "Registros encontrados",
            ERRO_GET_CLIENTES: "Erro ao buscar clientes",
            GET_CLIENTES_SUCESSO: "Clientes encontrados",
            CADASTRO_SUCESSO: "Cadastro realizado com sucesso",
            ERRO_CADASTRO: "Erro ao realizar cadastro",
            ATUALIZACAO_SUCESSO: "Atualização realizada com sucesso",
            ERRO_ATUALIZACAO: "Erro ao realizar atualização",
            DELETAR_SUCESSO: "Deleção realizada com sucesso",
            ERRO_DELETAR: "Erro ao realizar deleção",
            LISTAR_SUCESSO: "Listagem realizada com sucesso",
            ERRO_LISTAR: "Erro ao realizar listagem",
            ERRO_LISTAR_ID: "Erro ao realizar listagem por id",
            LISTAR_ID_SUCESSO: "Listagem por id realizada com sucesso",
            ERRO_ALTERAR_STATUS: "Erro ao alterar status",
            ALTERAR_STATUS_SUCESSO: "Status alterado com sucesso",
        }
    }
}

export default Constantes;
