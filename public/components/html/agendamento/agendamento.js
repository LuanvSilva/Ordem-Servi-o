
import { HTML } from '../html.js';
class CalendarioSemanal extends HTML {
    constructor() {
        super("div")
        this.horaInicio = 9 
        this.horaFim = 18 
    }

    async Load(){

        this.dias = await this.ObterDiasDaSemana()
        await this.MontaAgendamento()
    }

    BuscaRegistro() {
        // Dados fictícios para teste
        return [
            { dia: 'Seg', horaInicio: 14, horaFim: 17, titulo: 'Regulação de Valores Mobiliários', tipo: 'securities' },
            { dia: 'Ter', horaInicio: 10, horaFim: 12, titulo: 'Finanças Corporativas', tipo: 'corp-fi' },
            { dia: 'Ter', horaInicio: 13, horaFim: 16, titulo: 'Direito do Entretenimento', tipo: 'ent-law' },
            { dia: 'Qua', horaInicio: 11, horaFim: 12, titulo: 'Seminário de Escrita', tipo: 'writing' },
            { dia: 'Qua', horaInicio: 14, horaFim: 17, titulo: 'Regulação de Valores Mobiliários', tipo: 'securities' },
            { dia: 'Qui', horaInicio: 10, horaFim: 12, titulo: 'Finanças Corporativas', tipo: 'corp-fi' },
            { dia: 'Qui', horaInicio: 13, horaFim: 16, titulo: 'Direito do Entretenimento', tipo: 'ent-law' }
        ];
    }
  
    CalcularLinhaGrade(hora) {

        return (hora - this.horaInicio) + 1
    }
  
    MontaAgendamento() {

        const agendamentos = this.BuscaRegistro()
        
        this.AddClass("calendar")
  
        // Linha do tempo
        const linhaDoTempo = this.CreateElement("div", { class: "timeline" })
        const espaco = this.CreateElement("div", { class: "spacer" })
        linhaDoTempo.appendChild(espaco)
  
        for (let hora = this.horaInicio; hora <= this.horaFim; hora++) {

            const marcadorDeHora = this.CreateElement("div", { class: "time-marker" })
            marcadorDeHora.textContent = `${hora > 12 ? hora - 12 : hora} ${hora >= 12 ? 'PM' : 'AM'}`
            linhaDoTempo.appendChild(marcadorDeHora)
        }

        this.AppendChild(linhaDoTempo)
  
        // Dias e Eventos
        const diasContainer = this.CreateElement("div", { class: "days" })

        this.dias.forEach(diaObj => {

            const diaContainer = this.CreateElement("div", { class: `day ${diaObj.dia.toLowerCase()}` })
                  
            const dataContainer = this.CreateElement("div", { class: "date" })
            const dataNum = this.CreateElement("p", { class: "date-num" })
            dataNum.textContent = diaObj.dataNum
      
            const dataDia = this.CreateElement("p", { class: "date-day" })
            dataDia.textContent = diaObj.dia
      
            dataContainer.appendChild(dataNum)
            dataContainer.appendChild(dataDia)
            diaContainer.appendChild(dataContainer)
                  
            const eventosContainer = this.CreateElement("div", { class: "events" })
          
            agendamentos.forEach(evento => {

                if (evento.dia === diaObj.dia) {

                    const eventoElement = this.CreateElement("div", { class: `event ${evento.tipo}` })
                    eventoElement.style.gridRowStart = this.CalcularLinhaGrade(evento.horaInicio)
                    eventoElement.style.gridRowEnd = this.CalcularLinhaGrade(evento.horaFim)
                            
                    const titulo = this.CreateElement("p", { class: "title" })
                    titulo.textContent = evento.titulo
                    eventoElement.appendChild(titulo)
                
                    const tempo = this.CreateElement("p", { class: "time" });
                    tempo.textContent = `${evento.horaInicio > 12 ? evento.horaInicio - 12 : evento.horaInicio} ${evento.horaInicio >= 12 ? 'PM' : 'AM'} - ${evento.horaFim > 12 ? evento.horaFim - 12 : evento.horaFim} ${evento.horaFim >= 12 ? 'PM' : 'AM'}`;
                    eventoElement.appendChild(tempo);
                
                    eventosContainer.appendChild(eventoElement)
                }

            })
          
            diaContainer.appendChild(eventosContainer)
            diasContainer.appendChild(diaContainer)
          })
        
        this.AppendChild(diasContainer)
    }

    ObterDiasDaSemana() {

        const hoje = new Date()
        const primeiroDiaDaSemana = hoje.getDate() - hoje.getDay() + 1 
        const dias = []
    
        for (let i = 0; i < 5; i++) {

            const data = new Date(hoje.setDate(primeiroDiaDaSemana + i))

            dias.push({
                dia: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][data.getDay()],
                dataNum: data.getDate()
            })
        }
    
        return dias.filter(d => d.dia !== 'Dom' && d.dia !== 'Sab')
      }
  }

  export { CalendarioSemanal }
  