import { HTML } from "../html.js"

class Dashboard extends HTML {

    constructor(height, width, type, data, options) {
        super("canvas")
        this.ctx = this.GetContext('2d')
        this.SetChart(null)
        this.SetData(data)
        this.SetTipo(type)
        this.SetWidth(width)
        this.SetHeight(height)
        this.SetOptions(options)
        this.Load()
    }

    SetTipo(type) {

        this.type = type
    }

    SetData(data) {
        
        this.data = data || {}
    }

    SetChart(chart) {
        
        this.chart = chart
    }

    SetWidth(width) {
        
        this.width = width || '400px'
    }

    SetHeight(height) {
        
        this.height =  height || '200px'
    }

    SetOptions(options) {
        
        this.options = options || {}
    }

    Load(){

        this.AddClass("chartjs")
        this.CSS("height", this.height)
        this.CSS("width", this.width)
    }

    CreateChart(type, data, options) {

        if (this.chart) {
            this.chart.destroy()
        }

        // Cria um novo gráfico
        this.chart = new Chart(this.ctx, {
            type: type, // Tipo do gráfico (por exemplo, 'bar', 'line', 'pie', etc.)
            data: data, // Dados do gráfico
            options: options // Opções do gráfico
        })
    }

    // Função para atualizar os dados do gráfico
    UpdateData(data) {

        if (this.chart) {

            this.chart.data = data
            this.chart.update()

        } else {
            
            throw new Error('Gráfico não encontrado. Crie um gráfico primeiro.')
        }
    }

    UpdateOptions(options) {

        if (this.chart) {

            this.chart.options = options
            this.chart.update()

        } else {

            throw new Error('Gráfico não encontrado. Crie um gráfico primeiro.')
        }
    }
}

export { Dashboard };