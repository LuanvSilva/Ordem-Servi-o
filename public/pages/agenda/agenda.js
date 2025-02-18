import { HTML } from '../../components/html/html.js'
import { Traducao } from '../../components/html/traducao/traducao.js'
import { CalendarioSemanal } from '../../components/html/agendamento/agendamento.js'


class AgendaPage extends HTML {
  constructor() {
    super()
    this.title = 'Agenda'
    this.traducao = new Traducao()
  }

  async Open() {

    this.AddHeader()
    await this.AddMain()
    this.AddFooter()
  }

  AddHeader() {
    
    this.Find("#header").innerHTML += this.title
  }

  async AddMain() {

    const calendario = new CalendarioSemanal()
    await calendario.Load()
    this.Find("#agendamento").appendChild(calendario.html)
  }

  AddFooter() {
    //this.Find("#footer").innerHTML += 'Rodapé'
  }
}

export { AgendaPage }