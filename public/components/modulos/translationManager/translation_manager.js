import { Constantes } from '../../../resources/util/constantes.js'


class TranslationManager {
    constructor(idioma = 'pt') {
        this.traducoes = {} // Cache local de traduções
        this.elementosTraducao = new Map() // Mapeia elementos para seus textos originais
        this.supportedLanguages = ['pt', 'en', 'es', 'fr'] // Idiomas suportados
        this.SetIdioma(idioma)
    }

    SetIdioma(idioma) {
        // Verificar se o idioma é suportado
        if (this.supportedLanguages.includes(idioma)) {
            this.idioma = idioma
        } else {
            console.warn(`Idioma ${idioma} não suportado. Usando português.`)
            this.idioma = 'pt'
        }
    }

    GetIdioma() {
        return this.idioma
    }

    /**
     * Verifica se um idioma é suportado
     * @param {string} idioma - Código do idioma para verificar
     * @returns {boolean} - Se o idioma é suportado
     */
    IsIdiomaSupported(idioma) {
        return this.supportedLanguages.includes(idioma)
    }

    /**
     * Registra um texto para tradução
     * @param {string} chave - Identificador único ou texto original
     * @param {string} valorOriginal - Texto original em português
     * @param {HTMLElement} elemento - Elemento HTML associado (opcional)
     */
    RegisterText(chave, valorOriginal, elemento = null) {
        if (!this.traducoes[this.idioma]) {
            this.traducoes[this.idioma] = {}
        }

        // Se a chave não existir no idioma atual, adicionar
        if (!this.traducoes[this.idioma][chave]) {
            this.traducoes[this.idioma][chave] = valorOriginal
        }

        // Se um elemento foi fornecido, registrá-lo para atualização automática
        if (elemento) {
            this.elementosTraducao.set(elemento, {
                chave: chave,
                original: valorOriginal
            })
        }
    }

    /**
     * Define uma tradução para um texto específico
     * @param {string} chave - Identificador único ou texto original
     * @param {string} valor - Texto traduzido
     * @param {string} idioma - Idioma da tradução (opcional, usa o atual se não fornecido)
     */
    SetTraducaoPorChave(chave, valor, idioma = null) {
        const targetIdioma = idioma || this.idioma
        
        if (!this.traducoes[targetIdioma]) {
            this.traducoes[targetIdioma] = {}
        }
        
        this.traducoes[targetIdioma][chave] = valor
    }

    /**
     * Obtém a tradução de um texto
     * @param {string} chave - Identificador único ou texto original
     * @param {string} idioma - Idioma da tradução (opcional, usa o atual se não fornecido)
     * @returns {string} - Texto traduzido ou original se não encontrado
     */
    GetTraducaoPorChave(chave, idioma = null) {
        const targetIdioma = idioma || this.idioma
        
        // Se o idioma for português, retornar o texto original (assumindo que a chave é o texto original)
        if (targetIdioma === 'pt') {
            return chave
        }
        
        // Verificar se temos a tradução em cache
        if (this.traducoes[targetIdioma] && this.traducoes[targetIdioma][chave]) {
            return this.traducoes[targetIdioma][chave]
        }
        
        // Se não encontrou tradução, retornar o texto original
        return chave
    }

    /**
     * Escaneia o DOM por elementos com a classe .translate e registra para tradução
     * @param {HTMLElement} rootElement - Elemento raiz para iniciar a busca (opcional)
     */
    ScanElements(rootElement = document.body) {
        const elements = rootElement.querySelectorAll('.translate')
        
        elements.forEach(element => {
            const originalText = element.textContent.trim()
            if (originalText) {
                this.RegisterText(originalText, originalText, element)
            }
        })
        
        // Se o idioma não for português, traduzir os elementos encontrados
        if (this.idioma !== 'pt') {
            this.TraduzirElementosRegistrados()
        }
    }

    /**
     * Traduz todos os elementos registrados para o idioma atual
     */
    async TraduzirElementosRegistrados() {
        // Se o idioma atual for português, restaurar textos originais
        if (this.idioma === 'pt') {
            this.RestaurarTextosOriginais()
            return
        }
        
        // Coletar textos únicos que precisam de tradução
        const textosParaTraduzir = new Map()
        
        this.elementosTraducao.forEach((info, elemento) => {
            if (!this.traducoes[this.idioma] || !this.traducoes[this.idioma][info.chave]) {
                textosParaTraduzir.set(info.chave, info.original)
            }
        })
        
        // Se não há textos para traduzir, apenas aplicar as traduções existentes
        if (textosParaTraduzir.size === 0) {
            this.AplicarTraducoesExistentes()
            return
        }
        
        // Preparar dados para envio em lote
        const textItems = Array.from(textosParaTraduzir).map(([chave, texto], index) => {
            return {
                id: `text_${index}`,
                text: texto,
                key: chave
            }
        })
        
        try {
            // Enviar para a API
            const response = await this.TranslateTexts(textItems, this.idioma)
            
            if (response.success) {
                // Armazenar as traduções recebidas
                response.data.translations.forEach(item => {
                    if (item.success) {
                        const chave = textItems.find(t => t.id === item.id)?.key
                        if (chave) {
                            this.SetTraducaoPorChave(chave, item.translatedText)
                        }
                    }
                })
                
                // Aplicar as traduções
                this.AplicarTraducoesExistentes()
            } else {
                console.error('Erro na tradução:', response.error)
            }
        } catch (error) {
            console.error('Erro ao comunicar com a API de tradução:', error)
        }
    }

    /**
     * Aplica as traduções existentes aos elementos registrados
     */
    AplicarTraducoesExistentes() {
        this.elementosTraducao.forEach((info, elemento) => {
            const traducao = this.GetTraducaoPorChave(info.chave)
            
            // Atualizar o elemento com a tradução
            if (traducao !== info.chave) {
                // Verificar o tipo de elemento
                if (elemento.tagName === 'INPUT' && elemento.type !== 'button') {
                    if (elemento.placeholder) {
                        elemento.placeholder = traducao
                    } else {
                        elemento.value = traducao
                    }
                } else if (elemento.tagName === 'TEXTAREA') {
                    if (elemento.placeholder) {
                        elemento.placeholder = traducao
                    } else {
                        elemento.value = traducao
                    }
                } else if (elemento.tagName === 'BUTTON' || 
                          (elemento.tagName === 'INPUT' && elemento.type === 'button')) {
                    if (elemento.value) {
                        elemento.value = traducao
                    } else {
                        elemento.textContent = traducao
                    }
                } else {
                    elemento.textContent = traducao
                }
            }
        })
    }

    /**
     * Restaura os textos originais dos elementos registrados
     */
    RestaurarTextosOriginais() {
        this.elementosTraducao.forEach((info, elemento) => {
            // Verificar o tipo de elemento
            if (elemento.tagName === 'INPUT' && elemento.type !== 'button') {
                if (elemento.placeholder) {
                    elemento.placeholder = info.original
                } else {
                    elemento.value = info.original
                }
            } else if (elemento.tagName === 'TEXTAREA') {
                if (elemento.placeholder) {
                    elemento.placeholder = info.original
                } else {
                    elemento.value = info.original
                }
            } else if (elemento.tagName === 'BUTTON' || 
                      (elemento.tagName === 'INPUT' && elemento.type === 'button')) {
                if (elemento.value) {
                    elemento.value = info.original
                } else {
                    elemento.textContent = info.original
                }
            } else {
                elemento.textContent = info.original
            }
        })
    }

    /**
     * Traduz um elemento específico e seus filhos com a classe .translate
     * @param {HTMLElement} container - Elemento container
     */
    async TraduzirContainer(container) {
        // Registrar o elemento se ele tiver a classe .translate
        if (container.classList.contains('translate')) {
            const originalText = container.textContent.trim()
            if (originalText) {
                this.RegisterText(originalText, originalText, container)
            }
        }
        
        // Registrar elementos filhos
        const elements = container.querySelectorAll('.translate')
        elements.forEach(element => {
            const originalText = element.textContent.trim()
            if (originalText) {
                this.RegisterText(originalText, originalText, element)
            }
        })
        
        // Traduzir os elementos registrados
        await this.TraduzirElementosRegistrados()
    }

    /**
     * Limpa o cache de traduções
     */
    LimparCache() {
        this.traducoes = {}
        // Mas mantém o registro dos elementos
    }

    /**
     * Realiza a tradução comunicando com a API
     * @param {Array} textItems - Array de objetos com textos para traduzir
     * @param {string} targetLanguage - Idioma alvo
     * @returns {Promise<object>} - Resultado da tradução
     */
    async TranslateTexts(textItems, targetLanguage) {
        try {
            const response = await fetch(Constantes.URL_BASE_TRANSLATE.GET_TRANSLATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    textItems: textItems,
                    targetLanguage: targetLanguage,
                    sourceLanguage: 'pt'
                })
            })
            
            if (!response.ok) {
                throw new Error('Erro na resposta da API')
            }
            
            return await response.json()
        } catch (error) {
            console.error('Erro ao chamar a API de tradução:', error)
            return {
                success: false,
                error: error.message,
                data: { translations: [] }
            }
        }

        console.log('Simulando chamada à API de tradução...')
    }

    /**
     * Traduz um único texto
     * @param {string} text - Texto para traduzir
     * @param {string} targetLanguage - Idioma alvo (opcional, usa o atual se não fornecido)
     * @returns {Promise<string>} - Texto traduzido
     */
    async TraduceText(text, targetLanguage = null) {
        const idioma = targetLanguage || this.idioma
        
        // Se o idioma for português, retornar o texto original
        if (idioma === 'pt') {
            return text
        }
        
        // Verificar se já temos em cache
        if (this.traducoes[idioma] && this.traducoes[idioma][text]) {
            return this.traducoes[idioma][text]
        }
        
        try {
            const response = await fetch(Constantes.URL_BASE_TRANSLATE.GET_TRANSLATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    targetLanguage: idioma,
                    sourceLanguage: 'pt'
                })
            })
            
            if (!response.ok) {
                throw new Error('Erro na resposta da API')
            }
            
            const result = await response.json()
            
            if (result.success) {
                // Armazenar no cache
                this.SetTraducaoPorChave(text, result.data.translatedText, idioma)
                return result.data.translatedText
            } else {
                return text // Retorna o texto original em caso de erro
            }
        } catch (error) {
            console.error('Erro ao traduzir texto:', error)
            return text // Retorna o texto original em caso de erro
        }

        console.log('Simulando chamada à API de tradução...')
    }

    /**
     * Configura idioma baseado em preferências do usuário ou navegador
     */
    ConfigurarIdiomaPadrao() {
        // Tentar obter do localStorage
        const savedLanguage = localStorage.getItem('userLanguage')
        if (savedLanguage && this.IsIdiomaSupported(savedLanguage)) {
            this.SetIdioma(savedLanguage)
            return
        }
        
        // Usar idioma do navegador
        const browserLanguage = navigator.language.split('-')[0]
        if (this.IsIdiomaSupported(browserLanguage)) {
            this.SetIdioma(browserLanguage)
        }
    }

    /**
     * Salva o idioma atual nas preferências do usuário
     */
    SalvarIdioma() {
        localStorage.setItem('userLanguage', this.idioma)
    }
}
   
export { TranslationManager }