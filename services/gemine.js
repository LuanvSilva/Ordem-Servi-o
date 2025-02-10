import axios from 'axios';
import Constantes from '../util/Constantes.js';

class Gemini {

    constructor() {
        this.api_key = process.env.GEMINI_API_KEY
        this.base_url = Constantes.URL_INTEGRACAO_GEMINI.URL_BASE
        this.AxiosInstance()
    }

    AxiosInstance(){

        this.axiosInstance = axios.create({
            baseURL: this.base_url,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

  /**
   * Gera texto com base em um prompt.
   * @param {string} prompt - O texto de entrada para o modelo.
   * @param {object} [options={}] - Opções de configuração da geração.
   * @param {number} [options.temperature=0.9] - Controla a aleatoriedade da resposta (0.0 = determinístico, 1.0 = mais criativo).
   * @param {number} [options.maxOutputTokens=1024] - Número máximo de tokens a serem gerados.
   * @param {number} [options.topP=1] -  Controla a diversidade dos tokens considerados (probabilidade cumulativa).
   * @param {number} [options.topK=40] - Controla o número de tokens de maior probabilidade considerados.
   * @param {string[]} [options.stopSequences=[]] -  Sequências de parada para interromper a geração.
   * @returns {Promise<string>} O texto gerado.
   * @throws {Error} Se a requisição falhar ou a resposta não contiver o texto gerado.
   */
    async Generate(prompt, options = {}) {

        const { temperature = 0.9, maxOutputTokens = 1024, topP = 1, topK = 40, stopSequences = [] } = options

        try {

            const response = await this.axiosInstance.post(`?key=${this.api_key}`, {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature, maxOutputTokens, topP, topK, stopSequences },
            })

            const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!generatedText) {
                throw new Error("Gemini API returned an unexpected response format.  No text generated.")
            }

            return generatedText

        } catch (error) {
        
            this.HandleError(error, "generate")
        }
    }

    /**
     *  Função para interagir com o modelo em formato de chat (múltiplas mensagens).
     * @param {Array<object>} messages - Um array de objetos de mensagem. Cada objeto deve ter `role` ("user" ou "model") e `parts` (array de partes, como no `generate`).
     * @param {object} [options] -  Mesmas opções de configuração de `generate`.
     * @returns {Promise<object>} A resposta completa da API (incluindo candidatos, informações de segurança, etc.).
     */
    async Chat(messages, options = {}) {

        const { temperature = 0.9, maxOutputTokens = 1024, topP = 1, topK = 40, stopSequences = [] } = options;

        try {

            const response = await this.axiosInstance.post(`?key=${this.api_key}`, {
                contents: messages,  
                generationConfig: { temperature, maxOutputTokens, topP, topK, stopSequences },
            })

            return response.data

        } catch (error) { 

           this.HandleError(error, "chat")
        }
        
    }

    HandleError(error, method) {

        if (error.response) {

            const apiError = error.response.data?.error || { message: "Unknown API error" }
            throw new Error(`Gemini API Error in ${method}: ${apiError.message} (Status: ${error.response.status})`)

        } else if (error.request) {

            throw new Error(`Network error: Could not connect to Gemini API during ${method}.`)

        } else {

            throw new Error(`Error in ${method}: ${error.message}`)
        }
    }
}

export default Gemini