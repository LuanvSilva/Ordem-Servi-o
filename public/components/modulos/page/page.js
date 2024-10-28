class Page {

    constructor(title, headerText, modules = [], scripts = []) {
        this.title = title
        this.headerText = headerText
        this.modules = modules
        this.scripts = scripts
    }

    createLink(href, rel = "stylesheet") {
        const link = document.createElement('link')
        link.href = href
        link.rel = rel
        return link
    }

    createScript(src, type = "text/javascript") {
        const script = document.createElement('script')
        script.src = src
        script.type = type
        return script
    }

    buildPage() {

        document.head.innerHTML = `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${this.title}</title>
        `

        const links = [
            this.createLink("/resources/poper/tooltip.min.js"),
            this.createLink("/pages/home/styles.css"),
            this.createLink("/resources/bootstrap/css/bootstrap.min.css"),
            this.createLink("/resources/fontawesome-free-6.6.0-web/css/all.min.css"),
            this.createLink("https://unicons.iconscout.com/release/v2.1.9/css/unicons.css")
        ]
        
        links.forEach(link => document.head.appendChild(link));
        
        document.body.innerHTML = `
            <div class="main">
                <aside class="main-links">
                    <h2>Solicitacões</h2>
                    <ul>
                        <li><a href="/pages/home/home"><i class="fa fa-home" aria-hidden="true"></i><span class="menu-text">Home</span></a></li>
                        <li><a href="/pages/solicitacao/solicitacao"><i class="fas fa-paper-plane"></i><span class="menu-text">Solicitação</span></a></li>
                        <li><a href="/pages/clientes/cliente"><i class="fas fa-users"></i><span class="menu-text">Clientes</span></a></li>
                        <li><a href="/pages/servicos/servicos"><i class="fas fa-wrench"></i><span class="menu-text">Serviços</span></a></li>
                        <li><a href="/pages/agenda/agenda"><i class="fas fa-calendar-alt"></i><span class="menu-text">Agenda</span></a></li>
                        <li><a href="/pages/relatorio/relatorio"><i class="fas fa-chart-bar"></i><span class="menu-text">Relatórios</span></a></li>
                    </ul>
                </aside>
                <main class="main-content">
                    <div class="row justify-content-end" id="alert"></div>
                    <div class="container">
                        <h2 id="header">${this.headerText}</h2>
                        <div class="row" id="filtros"></div>
                        <div class="row justify-content-end ms-3 me-4" id="botao_search"></div>
                    </div>
                    <br>
                    <div class="container">
                        <div class="row justify-content-end ms-3 me-4" id="botao_add"></div>
                        <div class="row mx-auto" id="table"></div>
                    </div>
                </main>
            </div>
        `

        const scripts = [
            this.createScript("/resources/poper/popper.min.js"),
            this.createScript("/resources/bootstrap/js/bootstrap.min.js", "module")
        ]

        //this.modules.forEach(module => scripts.push(this.createScript(module, "module")))
        
        scripts.forEach(script => document.body.appendChild(script))
    }
}

export { Page }
