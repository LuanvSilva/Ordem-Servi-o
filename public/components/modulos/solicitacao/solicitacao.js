import { HTML } from "../../html/html";

class Solicitacao extends HTML{

    constructor(id, campos){
        super()
        this._id = id
        this._campos = campos
    }

    async Load(){

      await this._BuscaRegistro(this._id)
      await this._MontaModal()

    }

    async _BuscaRegistro(id){

        if(id == 0 || id == undefined){
            return
        }

        let self = this
        let url = 'http://localhost:3000/solicitacao/' + id
        let response = await fetch(url)
        this._solicitacao_campos = await response.json()

    }

    async _MontaModal(){

        let self = this
        this.modal = new Modal('Solicitação', 'primary', 'col-md-6', async () => {
            await self._Salvar()
        })
        this.modal.Load()

        this._campos.forEach(campo => {
            let valor = ''
            if(this._solicitacao_campos != undefined){
                valor = this._solicitacao_campos[campo]
            }
            const input = new Text(campo, 'Digite ' + campo, 'col-md-12', valor)
            input.Load()
            input.Id(campo)
            input.Name(campo)
            this.modal.BodyAppendChild(input.div.html)
        })

        this.modal.Show()

    }

}

export { Solicitacao }