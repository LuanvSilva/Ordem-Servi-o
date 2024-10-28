class Alert {
    constructor(conteudo, tipo = 'info') {
        this.conteudo = conteudo
        this.tipo = tipo // pode ser 'success', 'danger', 'warning', 'info', etc.
    }

    SetConteudo(conteudo) {
        this.conteudo = conteudo
    }

    SetTipo(tipo) {
        this.tipo = tipo
    }

    createAlertElement() {
        const alertDiv = document.createElement('div')
        alertDiv.className = `alert alert-${this.tipo}`
        alertDiv.role = 'alert'
        alertDiv.innerHTML = this.conteudo

        // Adiciona um botão de fechar
        const closeButton = document.createElement('button')
        closeButton.className = 'close'
        closeButton.setAttribute('data-dismiss', 'alert')
        closeButton.innerHTML = '&times;'
        alertDiv.appendChild(closeButton)

        return alertDiv;
    }

    show(container) {
        const alertElement = this.createAlertElement();
        container.appendChild(alertElement);
    }
}

export { Alert };
