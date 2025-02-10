```markdown
# Gemini API Client (JavaScript)

Esta biblioteca JavaScript fornece uma classe `Gemini` para interagir facilmente com a API do Google Gemini (modelos de linguagem generativa).  Ela oferece uma interface simples para gerar texto e manter conversas em formato de chat, com tratamento de erros robusto e opções de configuração flexíveis.

## Pré-requisitos

*   Node.js (v14 ou superior recomendado)
*   Uma chave de API do Google Gemini. Você pode obtê-la no [Google AI Studio](https://ai.google.dev/).

## Instalação

```bash
npm install axios
```

Você também pode clonar este repositório (se você tiver o código-fonte) e, em seguida, instalar as dependências:

```bash
git clone <URL do repositório>
cd <nome do diretório>
npm install
```

## Configuração da Chave da API

Você tem duas opções para configurar sua chave de API:

1.  **Variável de Ambiente (Recomendado):**

    *   Defina uma variável de ambiente chamada `GEMINI_API_KEY` com o valor da sua chave.
        *   **Linux/macOS (bash/zsh):**
            ```bash
            export GEMINI_API_KEY=sua_chave_aqui
            ```
            Adicione essa linha ao seu arquivo `.bashrc`, `.zshrc` ou similar para que a variável seja definida automaticamente em cada sessão.
        *   **Windows (PowerShell):**
            ```powershell
            $env:GEMINI_API_KEY = "sua_chave_aqui"
            ```
            Para tornar a variável persistente, adicione-a às variáveis de ambiente do sistema.
        *   **Windows (cmd):**
            ```cmd
            set GEMINI_API_KEY=sua_chave_aqui
            ```
            Para tornar a variável persistente, adicione-a às variáveis de ambiente do sistema.
    *   Usando `.env` (requer o pacote `dotenv`):
        *   Crie um arquivo chamado `.env` na raiz do seu projeto.
        *   Adicione a seguinte linha ao arquivo `.env`:
            ```
            GEMINI_API_KEY=sua_chave_aqui
            ```
        *   No início do seu arquivo JavaScript principal (antes de importar a classe `Gemini`):
            ```javascript
            require('dotenv').config();
            ```

2.  **Passando a Chave no Construtor (Menos Seguro):**

    *   Passe a chave diretamente como o primeiro argumento ao criar uma instância da classe `Gemini`:

    ```javascript
    const gemini = new Gemini('SUA_CHAVE_AQUI')
    ```
    *   **Atenção:**  Este método *não* é recomendado para código em produção, pois expõe sua chave no código-fonte.  Use-o apenas para testes rápidos.

## Uso Básico

```javascript
import Gemini from './Gemini'; // Importe a classe (ajuste o caminho se necessário)

async function main() {
  try {
    // Cria uma instância da classe Gemini (usando a variável de ambiente)
    const gemini = new Gemini();

    // Gera texto a partir de um prompt
    const generatedText = await gemini.generate('Escreva um poema sobre o outono.');
    console.log('Texto Gerado:', generatedText);

    // Inicia uma conversa (chat)
    const messages = [
      { role: 'user', parts: [{ text: 'Olá!' }] },
      { role: 'model', parts: [{ text: 'Oi! Tudo bem?' }] }, // Resposta simulada (opcional, para dar contexto)
      { role: 'user', parts: [{ text: 'Sim, e você?  Me fale sobre viagens espaciais.' }] },
    ];
    const chatResponse = await gemini.chat(messages);
    const lastResponse = chatResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Resposta do Chat:', lastResponse);


  } catch (error) {
    console.error('Erro:', error.message); // Exibe mensagens de erro detalhadas.
  }
}

main();

```

## Classe `Gemini`

### Construtor

```javascript
new Gemini(apiKey, baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent')
```

*   **`apiKey` (string, obrigatório):** Sua chave de API do Gemini.  Se não for fornecida, o construtor tentará ler a chave da variável de ambiente `GEMINI_API_KEY`.  Se a chave não for encontrada em nenhum lugar, um erro será lançado.
*   **`baseUrl` (string, opcional):** A URL base da API do Gemini.  O padrão é `'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'`, que usa o modelo `gemini-pro`.  Você pode alterá-lo se precisar usar um modelo ou endpoint diferente.

### Métodos

#### `generate(prompt, options = {})`

Gera texto com base em um prompt fornecido.

*   **`prompt` (string, obrigatório):** O texto de entrada (prompt) para o modelo.
*   **`options` (object, opcional):**  Um objeto com opções de configuração para a geração.
    *   **`temperature` (number, opcional):** Controla a aleatoriedade da geração.  Valores mais baixos (próximos de 0) produzem resultados mais determinísticos e focados.  Valores mais altos (próximos de 1) geram texto mais criativo e variado.  Padrão: `0.9`.
    *   **`maxOutputTokens` (number, opcional):** O número máximo de tokens a serem gerados.  Um token é aproximadamente equivalente a uma palavra.  Padrão: `1024`.
    *   **`topP` (number, opcional):** Controla a diversidade dos tokens considerados com base em sua probabilidade cumulativa.  Um valor de `1` (padrão) considera todos os tokens.  Valores menores limitam a geração a tokens mais prováveis.
    *   **`topK` (number, opcional):**  Controla o número de tokens de maior probabilidade considerados.  Padrão: `40`.
    *  **`stopSequences` (string[], opcional):** Um array de strings.  A geração será interrompida se qualquer uma dessas sequências for encontrada.  Isso é útil para controlar o formato da saída. Padrão: `[]` (nenhuma sequência de parada).

*   **Retorno (Promise\<string>):**  Uma Promise que resolve para o texto gerado pelo modelo.

*   **Exceções:** Lança um `Error` em caso de falha na requisição ou se a resposta da API não contiver o texto gerado.  As mensagens de erro são detalhadas e incluem informações sobre a causa do problema (erro da API, erro de rede, etc.).

#### `chat(messages, options = {})`

Mantém uma conversa em formato de chat com o modelo.

*   **`messages` (array, obrigatório):** Um array de objetos representando a conversa.  Cada objeto deve ter as seguintes propriedades:
    *   **`role` (string, obrigatório):**  O papel do emissor da mensagem.  Deve ser `'user'` (para mensagens do usuário) ou `'model'` (para mensagens do modelo).
    *   **`parts` (array, obrigatório):**  Um array de objetos representando o conteúdo da mensagem. Cada objeto *deve* ter uma propriedade `text` contendo o texto daquela parte da mensagem.  (O formato `parts` permite mensagens multimídia no futuro, mas atualmente apenas texto é suportado).

        ```javascript
        // Exemplo de array de mensagens:
        const messages = [
          { role: 'user', parts: [{ text: 'Olá!' }] },
          { role: 'model', parts: [{ text: 'Oi, como posso ajudar?' }] }, // Resposta do modelo
          { role: 'user', parts: [{ text: 'Conte-me sobre a história da computação.' }] },
        ];
        ```

*   **`options` (object, opcional):**  As mesmas opções de configuração do método `generate` (`temperature`, `maxOutputTokens`, `topP`, `topK`, `stopSequences`).

*   **Retorno (Promise\<object>):**  Uma Promise que resolve para a *resposta completa* da API do Gemini.  Essa resposta é um objeto JSON com a seguinte estrutura (os campos mais importantes estão destacados):

    ```json
    {
      "candidates": [ // Array de possíveis respostas (geralmente apenas uma)
        {
          "content": {  // Conteúdo da resposta
            "parts": [  // Partes da resposta (geralmente apenas uma, com texto)
              {
                "text": "Esta é a resposta gerada pelo modelo." // <-- TEXTO GERADO
              }
            ],
            "role": "model" // Papel do emissor (será 'model')
          },
          "finishReason": "STOP", // Motivo do término da geração (STOP, MAX_TOKENS, etc.)
          "index": 0,
          "safetyRatings": [ ... ] // Avaliações de segurança (conteúdo impróprio, etc.)
        }
      ],
      "promptFeedback": { ... } // Feedback sobre o prompt (se houve algum problema)
    }
    ```

    Para obter o texto gerado, você normalmente acessaria:  `response.candidates[0].content.parts[0].text`.  O código da classe `Gemini` já usa encadeamento opcional (`?.`) para fazer isso de forma segura.

*    **Exceções:**  Lança um `Error` com mensagens detalhadas em caso de falha (mesmos tipos de erro do `generate`).

## Tratamento de Erros

A classe `Gemini` lida com os seguintes tipos de erros:

*   **Erros da API:**  Se a API do Gemini retornar um código de status de erro (4xx ou 5xx), um erro será lançado com a mensagem de erro fornecida pela API (se houver) e o código de status.
*   **Erros de Rede:** Se a requisição à API falhar devido a um problema de rede (ex: sem conexão com a internet), um erro será lançado indicando o problema.
*   **Erros de Formato da Resposta:** Se a API retornar uma resposta em um formato inesperado (ex: sem o campo `text` contendo o texto gerado), um erro será lançado.
* **Erros de falta de API Key**: Se a API key não for configurada via variável de ambiente ou passada no construtor, um erro será lançado.
*   **Outros Erros:** Outros erros (ex: erros de programação) também são capturados e lançados com mensagens descritivas.

Sempre use um bloco `try...catch` ao chamar os métodos `generate` e `chat` para lidar com possíveis erros de forma adequada.

## Exemplo Completo (com tratamento de erros e opções)

```javascript
import Gemini from './Gemini'; // Ajuste o caminho, se necessário

async function GenerateExample() {
  try {
    const gemini = new Gemini(); // Usa a chave da variável de ambiente

    // Geração com opções
    const prompt = "Escreva uma breve história de ficção científica sobre um robô que descobre o amor.";
    const options = {
      temperature: 0.8,
      maxOutputTokens: 500,
      topP: 0.95,
      topK: 30,
      stopSequences: ["Fim da história."],
    };
    const story = await gemini.generate(prompt, options);
    console.log("História:", story);

  } catch (error) {
    console.error("Ocorreu um erro:", error.message);
    // Em um aplicativo real, você poderia registrar o erro em um arquivo de log,
    // exibir uma mensagem de erro amigável para o usuário, etc.
  }
}

GenerateExample();

javascript
import Gemini from './Gemini';

async function runChat() {
  try {
    const gemini = new Gemini();
    const messages = []; // Começamos com um array de mensagens vazio

    // 1. Pergunta do usuário
    messages.push({ role: 'user', parts: [{ text: 'Olá, como vai você?' }] });

    // 2. Chamada à API
    let response = await gemini.Chat(messages);
    let modelResponse = response.candidates[0].content.parts[0].text;
    console.log("Modelo:", modelResponse);

    // 3. Adicionamos a resposta do modelo ao histórico
    messages.push({ role: 'model', parts: [{ text: modelResponse }] });

    // 4. Nova pergunta do usuário
    messages.push({ role: 'user', parts: [{ text: 'Fale-me sobre a fotossíntese.' }] });

    // 5. Chamada à API (agora com TODO o histórico)
    response = await gemini.Chat(messages); // Enviamos TODAS as mensagens anteriores
    modelResponse = response.candidates[0].content.parts[0].text;
    console.log("Modelo:", modelResponse);

    // 6. Adicionamos a nova resposta do modelo... e assim por diante.
    messages.push({ role: 'model', parts: [{ text: modelResponse }] });
      // 7. Nova pergunta
    messages.push({ role: 'user', parts: [{ text: 'Resuma em uma frase' }] });
    response = await gemini.Chat(messages);
    modelResponse = response.candidates[0].content.parts[0].text;
    console.log("Modelo:", modelResponse);
    messages.push({ role: 'model', parts: [{ text: modelResponse }] });



  } catch (error) {
    console.error('Erro:', error.message);
  }
}

runChat()

```

**Pontos Cruciais:**

*   **Sem Memória Interna da API:**  A API *não* guarda o estado da conversa.  Você precisa enviar *todas* as mensagens relevantes a cada chamada.
*   **Responsabilidade do Desenvolvedor:** É seu trabalho gerenciar o array `messages`, adicionando tanto as mensagens do usuário quanto as respostas do modelo.
*   **Papel (`role`) Importante:**  O campo `role` é fundamental para que o modelo diferencie quem disse o quê e mantenha a coerência da conversa.
*   **`options` Controlam a Geração:**  As opções em `options` afetam *apenas* a próxima resposta do modelo, não o comportamento do chat em si.
* **Alternativa para Resposta Inicial**: Você pode incluir mensagens com role 'model' em `messages` *antes* da primeira chamada do usuário para definir o "tom" ou dar instruções iniciais ao chatbot (por exemplo:  `{ role: 'model', parts: [{ text: 'Eu sou um assistente especializado em história.' }] }`).  Isso dá um "contexto inicial" para o modelo.

O método `chat` fornece a base para construir interações conversacionais complexas.  A chave é entender que você está enviando o histórico completo da conversa a cada vez e que a API usa esse histórico para gerar a próxima resposta.


```

Este exemplo demonstra:

*   Geração de texto com várias opções.
*   Conversação em chat.
*   Tratamento de erros completo.
*   Uso da variável de ambiente para a chave da API.

Este README fornece uma documentação completa e pronta para uso da sua classe `Gemini`.  Ele explica como instalar, configurar e usar a biblioteca, com exemplos claros e detalhados.  Também descreve o tratamento de erros e as opções de configuração disponíveis.



