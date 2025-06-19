# Sistema de Gerenciamento de Ordens de Serviço

## Breve Descrição
Este sistema foi desenvolvido para gerenciar ordens de serviço, oferecendo funcionalidades como agendamento, cadastro de itens e validação de dados. É uma aplicação web que utiliza JavaScript modular para criar uma experiência de usuário interativa e eficiente.

## Sobre o Projeto
O Sistema de Gerenciamento de Ordens de Serviço é uma solução completa para empresas que precisam organizar suas atividades de prestação de serviços. Ele permite controlar agendamentos em um calendário semanal, gerenciar itens de serviço e realizar validações de dados importantes como CPF, CNPJ, CEP e outros.

## Principais Características

### Agendamento
- Visualização de calendário semanal
- Gerenciamento de eventos e compromissos
- Organização visual por dias e horários

### Gerenciamento de Itens
- Cadastro completo de produtos e serviços
- Campos para código, descrição, unidade, valor, tipo e categoria
- Status de ativação e observações

### Componentes Reutilizáveis
- Sistema de carregamento dinâmico de componentes
- Vários tipos de entrada de dados: texto, email, moeda, CPF/CNPJ, CEP, telefone, etc.
- Componentes modulares e extensíveis

### Validação de Dados
- Validação de formatos de email, senha, CPF, CNPJ, telefone e CEP
- Verificação de preenchimento de campos obrigatórios
- Suporte para diferentes formatos de dados

## Documentação

### Estrutura do Projeto
```
Ordem Serviço/
├── controller/          # Controladores da aplicação
│   └── item/            # Controlador de itens
├── public/              # Arquivos públicos
│   └── components/      # Componentes da interface
│       ├── html/        # Componentes HTML
│       │   ├── agendamento/  # Componente de agendamento
│       │   └── input/   # Componentes de entrada
│       └── modulos/     # Módulos reutilizáveis
├── use_case/           # Casos de uso da aplicação
│   └── item/           # Caso de uso para itens
└── util/              # Utilitários
```

### Principais Classes

#### ComponentLoader
Carregador dinâmico de componentes que gerencia a instanciação e configuração dos diversos componentes de interface.

#### CalendarioSemanal
Componente para visualização e gerenciamento de agendamentos em formato de calendário semanal.

#### itemController
Controlador para operações CRUD de itens, com validação de dados e comunicação com o caso de uso.

#### Validator
Classe utilitária com métodos para validação de diversos formatos de dados.

## Guia de Início Rápido

### Pré-requisitos
- Servidor web com suporte a JavaScript
- Navegador moderno com suporte a ES6+

### Instalação
1. Clone o repositório:
   ```
   git clone [URL_DO_REPOSITORIO]
   ```
2. Configure o servidor web para apontar para o diretório raiz do projeto
3. Acesse a aplicação através do navegador

### Exemplos de Uso

#### Criar um novo item:
```javascript
const itemCtrl = new itemController(token, empresa);
const novoItem = {
  codigo: '001',
  descricao: 'Manutenção',
  unidade: { id: 1 },
  valor: 100.00,
  tipo: { id: 2 },
  categoria: { id: 3 },
  ativo: true,
  observacao: 'Observações sobre o item'
};
const resultado = await itemCtrl.PostItem({ body: novoItem }, response);
```

#### Carregar um componente:
```javascript
const loader = new ComponentLoader();
loader.SetAtributes({ 
  id: 'meuInput', 
  name: 'nome', 
  required: true 
});
const inputNome = await loader.GetComponent('Text');
```

## Arquitetura da Solução

O sistema segue uma arquitetura em camadas com separação clara de responsabilidades:

1. **Camada de Apresentação**: 
   - Componentes HTML modulares
   - Interface de usuário interativa
   - Sistema de carregamento dinâmico de componentes

2. **Camada de Controle**:
   - Controladores para cada entidade do sistema
   - Gerenciamento de requisições e respostas
   - Validação inicial dos dados

3. **Camada de Negócios**:
   - Casos de uso que implementam as regras de negócio
   - Lógica de processamento independente da interface

4. **Camada de Utilidades**:
   - Validadores
   - Constantes
   - Funções auxiliares reutilizáveis

O sistema utiliza módulos JavaScript (ES6) para garantir uma estrutura organizada e facilitar a manutenção. A comunicação entre as camadas é feita através de interfaces bem definidas, possibilitando a substituição de implementações sem afetar o restante do sistema.

---

Desenvolvido com ❤️ para gerenciamento eficiente de ordens de serviço.
