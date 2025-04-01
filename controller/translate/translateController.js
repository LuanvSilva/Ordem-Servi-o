import TranslateUseCase from '../../use_case/translate/translate.js'

class TranslateController{
    constructor(token, empresa){
        this.token = token
        this.empresa = empresa
        this.translateUseCase = new TranslateUseCase(token, empresa)
    }

    async GetTranslate(req, res){

        try {

            const { textItems, targetLanguage, sourceLanguage } = req.body

            let result = await this.translateUseCase.BatchTranslate(textItems, targetLanguage, sourceLanguage)
            result.success ? res.status(200).json(result) : res.status(400).json(result)

        } catch (error) {

            res.status(500).json({ error: 'Error translating text' })
        }
    }

}

export default TranslateController