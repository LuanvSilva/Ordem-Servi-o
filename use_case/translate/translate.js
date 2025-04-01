import axios from 'axios'
import Constantes from '../../util/Constantes.js'
import Gemini from '../../services/gemine.js'

class TranslateUseCase {
    constructor(token, empresa) {
        this.token = token
        this.empresa = empresa
        this.gemini = new Gemini()
        this.translationCache = new Map() // Cache para evitar retraduzir o mesmo texto
        this.isTranslating = false // Flag para controlar traduções concorrentes
        this.translationQueue = [] // Fila de traduções pendentes
    }

    SetResponse(data, success, message, error, url) {
        return { data, success, message, error, url }
    }

    /**
     * Traduz um texto para o idioma especificado
     * @param {string} text - Texto a ser traduzido
     * @param {string} targetLanguage - Idioma de destino (ex: 'pt', 'en', 'es')
     * @param {string} sourceLanguage - Idioma de origem (opcional, auto-detectado se não informado)
     * @returns {Promise<object>} - Objeto com os dados da tradução
     */
    async GetTranslate(text, targetLanguage = 'pt', sourceLanguage = 'auto') {
        try {
            // Validação de entrada
            if (!text || text.trim() === '') {
                return this.SetResponse({}, false, 'Texto vazio', 'O texto para tradução não pode ser vazio', null)
            }

            // Chave para o cache
            const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`
            
            // Verificar se já temos este texto traduzido no cache
            ///(-3bs7a2JEs?T,
            if (this.translationCache.has(cacheKey)) {
                return this.SetResponse(
                    { translatedText: this.translationCache.get(cacheKey), fromCache: true },
                    true,
                    'Tradução recuperada do cache',
                    null,
                    null
                )
            }

            // Construir o prompt para tradução
            const prompt = this._buildTranslationPrompt(text, targetLanguage, sourceLanguage)
            
            // Configuração para gerar respostas mais consistentes e precisas
            const options = {
                temperature: 0.1, // Baixa temperatura para respostas mais determinísticas
                maxOutputTokens: 2048, // Limite maior para textos mais longos
                topP: 0.95,
                topK: 40
            }

            // Realizar a tradução
            const translatedText = await this.gemini.Generate(prompt, options)
            
            // Limpar a resposta (remover aspas, etc.)
            const cleanedTranslation = this._cleanTranslationResponse(translatedText)
            
            // Armazenar no cache para uso futuro
            this.translationCache.set(cacheKey, cleanedTranslation)
            
            return this.SetResponse(
                { translatedText: cleanedTranslation, fromCache: false },
                true,
                'Texto traduzido com sucesso',
                null,
                null
            )
        } catch (error) {
            console.error('Erro na tradução:', error)
            return this.SetResponse(
                {},
                false,
                'Erro ao traduzir texto',
                error.message || 'Erro desconhecido',
                null
            )
        }
    }

    /**
     * Traduz múltiplos textos um a um, sequencialmente
     * @param {Array<{id: string, text: string}>} textItems - Array de objetos com id e texto
     * @param {string} targetLanguage - Idioma de destino
     * @param {string} sourceLanguage - Idioma de origem (opcional)
     * @returns {Promise<object>} - Objeto com as traduções
     */
    async BatchTranslate(textItems, targetLanguage = 'pt', sourceLanguage = 'auto') {
        try {
            if (!Array.isArray(textItems) || textItems.length === 0) {
                return this.SetResponse({}, false, 'Lista de textos vazia', 'A lista de textos para tradução não pode ser vazia', null)
            }

            // Processar sequencialmente um por um
            const results = await this._processSequentially(textItems, targetLanguage, sourceLanguage)
            
            return this.SetResponse(
                { translations: results },
                true,
                'Textos traduzidos com sucesso',
                null,
                null
            )
        } catch (error) {
            console.error('Erro na tradução em lote:', error)
            return this.SetResponse(
                {},
                false,
                'Erro ao traduzir textos em lote',
                error.message || 'Erro desconhecido',
                null
            )
        }
    }

    /**
     * Traduz uma página HTML completa
     * @param {string} htmlContent - Conteúdo HTML da página
     * @param {string} targetLanguage - Idioma de destino
     * @param {string} sourceLanguage - Idioma de origem (opcional)
     * @returns {Promise<object>} - Objeto com HTML traduzido
     */
    async TranslateHtmlPage(htmlContent, targetLanguage = 'pt', sourceLanguage = 'auto') {
        try {
            if (!htmlContent || htmlContent.trim() === '') {
                return this.SetResponse({}, false, 'HTML vazio', 'O conteúdo HTML para tradução não pode ser vazio', null)
            }

            const prompt = `
            Você é um assistente especializado em tradução. Eu preciso que você traduza o conteúdo textual desta página HTML de ${sourceLanguage === 'auto' ? 'qualquer idioma' : sourceLanguage} para ${targetLanguage}, mas preserve todas as tags HTML e atributos.
            
            Importante:
            1. NÃO altere nenhuma tag HTML ou atributos
            2. Traduza APENAS o conteúdo textual
            3. Mantenha a formatação original
            4. Preserve variáveis entre {{}} ou "$"{}"
            5. NÃO traduza IDs, classes, nomes de elementos ou outros identificadores
            6. Preserve scripts e estilos sem tradução
            
            HTML para traduzir:
            ${htmlContent}
            `

            const options = {
                temperature: 0.1,
                maxOutputTokens: 8192, // Aumentado para páginas maiores
                topP: 0.95
            }

            const translatedHtml = await this.gemini.Generate(prompt, options)
            
            // Extrai apenas o HTML traduzido, eliminando qualquer texto explicativo
            const cleanedHtml = this._extractHtmlFromResponse(translatedHtml)
            
            return this.SetResponse(
                { translatedHtml: cleanedHtml },
                true,
                'Página HTML traduzida com sucesso',
                null,
                null
            )
        } catch (error) {
            console.error('Erro na tradução de HTML:', error)
            return this.SetResponse(
                {},
                false,
                'Erro ao traduzir página HTML',
                error.message || 'Erro desconhecido',
                null
            )
        }
    }

    // Métodos auxiliares privados
    
    _buildTranslationPrompt(text, targetLanguage, sourceLanguage) {
        let languageNames = {
            'pt': 'Português',
            'en': 'Inglês',
            'es': 'Espanhol',
            'fr': 'Francês',
            'de': 'Alemão',
            'it': 'Italiano',
            'ja': 'Japonês',
            'zh': 'Chinês',
            'ru': 'Russo',
            'ar': 'Árabe',
            'auto': 'qualquer idioma detectado'
        }
        
        const targetName = languageNames[targetLanguage] || targetLanguage
        const sourceName = languageNames[sourceLanguage] || sourceLanguage
        
        return `
        Traduza o seguinte texto de ${sourceName} para ${targetName}. 
        Mantenha o mesmo tom e estilo do original. 
        Preserve qualquer formatação especial, números, nomes próprios e termos técnicos.
        Retorne apenas o texto traduzido, sem comentários adicionais.
        
        Texto original: "${text}"
        `
    }
    
    _cleanTranslationResponse(response) {
        // Remove aspas que possam estar envolvendo a tradução
        let cleaned = response.trim()
        
        if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || 
            (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            cleaned = cleaned.substring(1, cleaned.length - 1)
        }
        
        // Remove "Tradução:" ou similar no início
        cleaned = cleaned.replace(/^(Tradução:|Translated text:|Here's the translation:)\s*/i, '')
        
        return cleaned
    }
    
    _extractHtmlFromResponse(response) {
        // Tenta encontrar tags HTML no resultado
        const htmlMatch = response.match(/<html[\s\S]*<\/html>/i) || 
                         response.match(/<body[\s\S]*<\/body>/i) ||
                         response.match(/<div[\s\S]*<\/div>/i)
        
        return htmlMatch ? htmlMatch[0] : response
    }
    
    /**
     * Processa textos sequencialmente um a um para evitar sobrecarga
     * @param {Array} textItems - Array de objetos com textos para traduzir
     * @param {string} targetLanguage - Idioma alvo
     * @param {string} sourceLanguage - Idioma de origem
     * @returns {Promise<Array>} - Array com resultados das traduções
     */
    async _processSequentially(textItems, targetLanguage, sourceLanguage) {
        const results = []
        
        // Processa cada item sequencialmente
        for (const item of textItems) {
            try {
                // Verificar se já temos no cache antes de traduzir
                const cacheKey = `${item.text}_${sourceLanguage}_${targetLanguage}`
                let result
                
                if (this.translationCache.has(cacheKey)) {
                    // Usar do cache
                    result = {
                        id: item.id,
                        originalText: item.text,
                        translatedText: this.translationCache.get(cacheKey),
                        success: true,
                        fromCache: true
                    }
                } else {
                    // Esperar um curto intervalo entre chamadas para evitar sobrecarga
                   // await this._sleep(300)
                    
                    // Traduzir
                    const translationResult = await this.GetTranslate(item.text, targetLanguage, sourceLanguage)
                    
                    result = {
                        id: item.id,
                        originalText: item.text,
                        translatedText: translationResult.data.translatedText || '',
                        success: translationResult.success,
                        fromCache: translationResult.data.fromCache || false
                    }
                }
                
                results.push(result)
                
                // Registrar progresso para fins de depuração
                console.log(`Tradução ${results.length}/${textItems.length} concluída ${result.fromCache ? '(cache)' : ''}`)
                
            } catch (error) {
                // Em caso de erro, adicionar item com erro
                results.push({
                    id: item.id,
                    originalText: item.text,
                    translatedText: '',
                    success: false,
                    error: error.message || 'Erro na tradução'
                })
                
                console.error(`Erro ao traduzir item ${item.id}:`, error)
            }
        }
        
        return results
    }
    
    /**
     * Função auxiliar para pausar a execução
     * @param {number} ms - Tempo em milissegundos
     * @returns {Promise} 
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    /**
     * Limpa o cache de traduções
     */
    clearCache() {
        this.translationCache.clear()
    }
}

export default TranslateUseCase