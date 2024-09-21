import { HTML } from "../../components/html/html.js"

class MetodosHomePage extends HTML{
    constructor(){
        super()
        this.title = 'Home'
    }

   async LoadMetodos(){

        return await this.MontaDashboard()
    }

    MontaDashboard(){

        const dashbord = {}

        dashbord.data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales',
                    data: [10, 20, 30, 40, 50, 60],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };
    
        dashbord.options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        dashbord.type = 'bar'
//--------------------------------------------------------------------------------//
        const dashbordLine = {}

        dashbordLine.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Monthly Sales',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        
        dashbordLine.lineOptions = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        dashbordLine.lineType = 'line'

        return Object.assign(dashbord, dashbordLine) 
    
    }

    AddFooter(){
        //this.Find("#footer").innerHTML = "Footer"
    }
}

export { MetodosHomePage }