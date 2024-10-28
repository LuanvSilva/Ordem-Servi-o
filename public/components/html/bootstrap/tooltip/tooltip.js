class Tooltip {
    constructor(conteudo, title, posicao = "top", trigger = "hover") {
        this.SetConteudo(conteudo)
        this.SetTitle(title)
        this.SetPosicao(posicao)
        this.SetTrigger(trigger)
    }

    SetConteudo(conteudo) {
        this.conteudo = conteudo
    }

    SetTitle(title) {
        this.title = title
    }

    SetPosicao(posicao) {
        this.posicao = posicao
    }

    SetTrigger(trigger) {
        this.trigger = trigger
    }

    GetOptions() {
        return {
            title: this.title,
            content: this.conteudo,
            placement: this.posicao,
            trigger: this.trigger,
            html: true,
            animation: true,
        }
    }

    LoadTooltip(elemento) {
        return new bootstrap.Tooltip(elemento, this.GetOptions())
    }

    Show(elemento) {
        const tooltip = bootstrap.Tooltip.getInstance(elemento)
        tooltip?.show()
    }

    Hide(elemento) {
        const tooltip = bootstrap.Tooltip.getInstance(elemento)
        tooltip?.hide()
    }

    Toggle(elemento) {
        const tooltip = bootstrap.Tooltip.getInstance(elemento)
        tooltip?.toggle()
    }
}

export { Tooltip }
