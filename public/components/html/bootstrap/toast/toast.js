class Toast {
    constructor(conteudo, titulo = '', tempo = 5000) {
        this.conteudo = conteudo
        this.titulo = titulo
        this.tempo = tempo
    }

    SetConteudo(conteudo) {
        this.conteudo = conteudo
    }

    SetTitulo(titulo) {
        this.titulo = titulo
    }

    SetTempo(tempo) {
        this.tempo = tempo
    }

    GetOptions() {
        return {
            animation: true,
            autohide: true,
            delay: this.tempo,
        }
    }

    configuraToast(elemento) {
        return new bootstrap.Toast(elemento, this.GetOptions())
    }

    show(elemento) {
        const toast = bootstrap.Toast.getInstance(elemento)
        toast?.show()
    }

    hide(elemento) {
        const toast = bootstrap.Toast.getInstance(elemento)
        toast?.hide()
    }
}

export { Toast };
