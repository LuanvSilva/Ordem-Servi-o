# Sistema de Gerenciamento de Serviços

## Breve descrição
Um sistema web completo para gerenciamento de Serviços, desenvolvido em Node.js com Express no backend e JavaScript modular no frontend. Esta solução permite o controle de agendamentos, itens de serviço, clientes e solicitações através de uma interface intuitiva e segura.

## Sobre o Projeto
O Sistema de Gerenciamento de Serviços foi desenvolvido para atender às necessidades de empresas de prestação de serviços que precisam de uma solução eficiente para registrar, acompanhar e gerenciar suas Serviços.

A motivação para a criação deste sistema surgiu da necessidade de substituir processos manuais ou sistemas fragmentados por uma solução integrada, que oferecesse um fluxo contínuo desde o cadastro do cliente até a conclusão e faturamento do serviço.

Com foco na usabilidade e segurança, o sistema implementa autenticação JWT e componentes reutilizáveis para garantir uma experiência consistente tanto para operadores quanto para administradores.

## Principais Características

### Autenticação e Segurança
- Sistema de login com JWT (JSON Web Tokens)
- Gerenciamento de sessões
- Rotas protegidas para acesso apenas a usuários autenticados

### Gestão de Clientes
- Cadastro completo de informações de clientes
- Validação de dados como CPF/CNPJ, e-mail e telefone
- Histórico de atendimentos por cliente

### Agendamento
- Visualização de calendário semanal interativo
- Organização visual de compromissos por dias e horários
- Gerenciamento de eventos e compromissos

### Gerenciamento de Itens
- Cadastro de produtos e serviços com códigos, descrições e valores
- Categorização e tipificação de itens
- Controle de status de ativação

### Solicitações
- Fluxo completo de solicitações de serviço
- Acompanhamento de status de solicitações
- Vinculação de itens e clientes às solicitações

### Componentes de Interface Reutilizáveis
- Sistema de carregamento dinâmico de componentes
- Diversos tipos de entrada de dados (texto, e-mail, moeda, CPF/CNPJ, etc.)
- Interface responsiva e moderna

## Documentação

### Estrutura do Projeto
```
Ordem Serviço/
├── controller/          # Controladores da aplicação
│   └── item/            # Controlador de itens
├── middleware/          # Middlewares do Express
│   └── jwtcheck.js      # Verificação de tokens JWT
├── public/              # Arquivos públicos (frontend)
│   ├── components/      # Componentes da interface
│   │   ├── html/        # Componentes HTML reutilizáveis
│   │   │   ├── agendamento/  # Componente de agendamento
│   │   │   └── input/   # Componentes de entrada
│   │   └── modulos/     # Módulos reutilizáveis
├── routes/              # Definição das rotas da API
├── use_case/            # Casos de uso da aplicação
│   └── item/            # Caso de uso para itens
├── util/                # Utilitários
├── app.js               # Configuração do aplicativo Express
└── server.js            # Ponto de entrada da aplicação
```

### Principais Módulos

#### Backend
- **Express.js**: Framework web para Node.js
- **JWT**: Autenticação baseada em tokens
- **Session**: Gerenciamento de sessões de usuário

#### Frontend
- **ComponentLoader**: Sistema de carregamento dinâmico de componentes de UI
- **CalendarioSemanal**: Componente para visualização e gerenciamento de agendamentos
- **Validator**: Classe utilitária para validação de diversos formatos de dados

### API Endpoints

| Rota                   | Descrição                               |
|------------------------|----------------------------------------|
| `/`                    | Rotas de autenticação                  |
| `/pages/login`         | Páginas relacionadas ao login          |
| `/pages`               | Páginas protegidas da aplicação        |
| `/api/v1/client`       | API para gerenciamento de clientes     |
| `/api/v1/modelos`      | API para modelos de tabelas            |
| `/api/v1/solicitacao`  | API para solicitações de serviço       |
| `/api/v1/item`         | API para gerenciamento de itens        |
| `/api/v1/translate`    | API para tradução de textos            |

## Guia de Início Rápido

### Pré-requisitos
- Node.js (v14.x ou superior)
- NPM ou Yarn
- Banco de dados (conforme configurado no projeto)

### Instalação

1. Clone o repositório:
   ```
   git clone [URL_DO_REPOSITORIO]
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Defina as seguintes variáveis:
     ```
     PORT=3000
     SECRET=sua_chave_secreta_jwt
     DB_CONNECTION_STRING=sua_string_de_conexao_bd
     ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

5. Acesse a aplicação em `http://localhost:3000`

### Exemplos de Uso

#### Autenticação:
```javascript
// Requisição de login
const response = await fetch('/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'usuario', password: 'senha' })
});
const { token } = await response.json();
```

#### Criando um novo item:
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/v1/item', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    codigo: '001',
    descricao: 'Manutenção Preventiva',
    unidade: { id: 1 },
    valor: 150.00,
    tipo: { id: 2 },
    categoria: { id: 3 },
    ativo: true,
    observacao: 'Serviço de manutenção padrão'
  })
});
```

## Arquitetura da Solução

O sistema segue uma arquitetura em camadas com padrão MVC estendido:

### Camadas da Aplicação

1. **Camada de Apresentação (Frontend)**:
   - Componentes HTML modulares em JavaScript puro
   - Sistema de carregamento dinâmico de componentes
   - Interface interativa com validação no cliente

2. **Camada de API (Middleware)**:
   - Express.js como servidor HTTP
   - JWT para autenticação e autorização
   - Middleware para validação de requisições

3. **Camada de Controle**:
   - Controladores para cada entidade do sistema
   - Validação de entrada de dados
   - Orquestração do fluxo de dados

4. **Camada de Negócios**:
   - Casos de uso que implementam as regras de negócio
   - Separação clara de responsabilidades
   - Lógica independente da interface

5. **Camada de Utilidades**:
   - Validadores
   - Funções auxiliares
   - Constantes do sistema

### Fluxo de Dados

```
[Cliente] → [API (Express)] → [Controller] → [Use Case] → [Model] ↔ [Banco de Dados]
   ↑                                ↑
   └────────────────────────────────┘
         Resposta (JSON/HTML)
```

### Segurança

O sistema implementa múltiplas camadas de segurança:

- Autenticação via JWT com tempo de expiração
- Verificação de tokens em todas as rotas protegidas
- Sessões para gerenciamento de estado do usuário
- Validação de dados em múltiplas camadas

### Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Autenticação**: JWT, Express-session
- **Frontend**: JavaScript modular (ES6+), HTML5, CSS3
- **Ferramentas de Desenvolvimento**: NPM/Yarn, Babel (se aplicável)
- **Banco de Dados**: Postgres

---

Desenvolvido para gerenciamento eficiente de Serviços.

© 2025 | Todos os direitos reservados
