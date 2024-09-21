import { HTML } from "../html.js"

class Noty extends HTML {
    constructor() {
        super('div')
    }


    GetIcon(type) {

        switch(type) {
            case 'success':
                return '<i class="fas fa-check-circle alert-icon"></i>'; // Ícone de sucesso
            case 'danger':
                return '<i class="fas fa-times-circle alert-icon"></i>'; // Ícone de erro
            case 'warning':
                return '<i class="fas fa-exclamation-circle alert-icon"></i>'; // Ícone de aviso
            default:
                return '<i class="fas fa-info-circle alert-icon"></i>'; // Ícone padrão
        }
    }

    async Noty(type, text, duration = 1000, position = 'top-left') {
      
        const icon = this.GetIcon(type)

        this.Atributo('class', `alert alert-${type} alert-${position} alert-dismissible fade show`)
        this.html.innerHTML = `${icon} ${text}`

        const progressBar = document.createElement('div')
        progressBar.className = `alert-bar-${type}`
        this.html.style.position = 'relative' 
        this.html.appendChild(progressBar)

        const mainElement = document.querySelector('#alert')

        if (mainElement) {

            mainElement.insertBefore(this.html, mainElement.firstChild)

            const alert = new bootstrap.Alert(this.html)
            progressBar.style.width = '0%'

            setTimeout(() => {

                progressBar.style.transition = 'width 0.5s ease-out'
                progressBar.style.width = '100%'
                setTimeout(() => { alert.close()}, 900)

            }, duration)

        } else {
            console.error('#main element not found')
        }
    }
}

export { Noty };
