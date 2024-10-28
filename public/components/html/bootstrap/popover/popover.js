class Popover {
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
            content: this.conteudo,
            title: this.title,
            placement: this.posicao,
            trigger: this.trigger,
            html: true,
            animation: true,
        }
    }

    LoadPopover(elemento) {
        return new bootstrap.Popover(elemento, this.GetOptions())
    }

    Show(elemento) {
        const popover = bootstrap.Popover.getInstance(elemento)
        popover?.show()
    }

    Hide(elemento) {
        const popover = bootstrap.Popover.getInstance(elemento)
        popover?.hide()
    }

    Toggle(elemento) {
        const popover = bootstrap.Popover.getInstance(elemento)
        popover?.toggle()
    }
}

export { Popover };
