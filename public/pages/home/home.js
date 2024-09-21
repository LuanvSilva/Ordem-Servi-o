import { MetodosHomePage } from "./metodos_home.js"
import { Dashboard } from "../../components/html/dashboard/dashboard.js"
import { Table } from '../../components/html/table/table.js'
import { CardMenu } from "../../components/html/cards/cards.js"

class HomePage extends MetodosHomePage{

    constructor(){
        super()
        this.title = 'Home'
    }

    Open(){
        
        this.AddHeader(this.title)
        this.AddMain()
        this.AddFooter()
    }

    AddHeader(title){

        this.HTML(title, "#home")
    }

   async AddMain(){

        await this.MontaCard()

        let self = this 
        const dashboardOptions = { width: "100px", height: "100px" }
        const dashboard = new Dashboard(dashboardOptions.width, dashboardOptions.height)
        const { type, data, options } = super.MontaDashboard()
        
        dashboard.Id("myChart")
        dashboard.Name("myChart")
        dashboard.CreateChart(type, data, options)
        this.Find("#chart1").appendChild(dashboard.chart.canvas)
    
        const dashboardLine = new Dashboard(dashboardOptions.width, dashboardOptions.height)
        const { lineType, lineData, lineOptions } = super.MontaDashboard()
        
        dashboardLine.Id("myChartLine")
        dashboardLine.Name("myChartLine")
        dashboardLine.CreateChart(lineType, lineData, lineOptions)
        this.Find("#chart2").appendChild(dashboardLine.chart.canvas)

        const table = new Table()
        await table.Load()
        table.AddRowClickListener(async (params) => console.log(params))
        this.Find("#table").appendChild(table.html)

    }

    async MontaCard(){

        const card_solicitacao = new CardMenu("Solicitações","Solicitações da semana" ,"fa fa-rocket f-left", "blue", "col-md-3")
        await card_solicitacao.Load()

        this.Find("#campos_busca").appendChild(card_solicitacao.html)

        card_solicitacao.SetVal("100", "50")

        const card_requisicao = new CardMenu("Requisições","Requisições da semana" ,"fa fa-rocket f-left", "green", "col-md-3")
        await card_requisicao.Load()

        this.Find("#campos_busca").appendChild(card_requisicao.html)

        const card_cliente = new CardMenu("Clientes","Clientes da semana" ,"fa fa-rocket f-left", "purple", "col-md-3")
        await card_cliente.Load()

        this.Find("#campos_busca").appendChild(card_cliente.html)

        const card_fornecedor = new CardMenu("Fornecedores","Fornecedores da semana" ,"fa fa-rocket f-left", "red", "col-md-3")
        await card_fornecedor.Load()

        this.Find("#campos_busca").appendChild(card_fornecedor.html)


    
    }


    AddFooter(){
        //this.Find("#footer").innerHTML = "Footer"
    }

} 

export { HomePage };