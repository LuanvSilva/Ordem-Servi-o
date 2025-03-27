import { Constantes } from "../../../resources/util/constantes.js"
import { HTML } from "../html.js"

class Table extends HTML {
    
    constructor(modelo) {
        super('table')
        this.SetModelo(modelo)
        this.currentPage = 1
        this.recordsPerPage = 10
        this.hiddenColumns = new Set()
        this.coluna_nova = []
    }

    SetModelo(modelo) {

        this.modelo = modelo
    }

    async GetModeloJson() {

        this.modelo_configuracao = await fetch(`/components/html/table/modelos/${this.modelo}.json`).then(response => response.json())
    }

    SetParametros(parametros) {
        
        this.parametros = parametros || {}
    }

    async Load(parametros) {
        this.SetParametros(parametros)
        await this.BuscaRegistros(this.modelo)
        await this.MontaTabela()
    }
    
    async BuscaRegistros(modelo) {

        if (!modelo) {
            throw new Error('Modelo não informado')
        }

       try {
            const response = await fetch(Constantes.URL_GET_TABLE_MODELOS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ modelo, parametros: this.parametros }) 
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar registros');
            }

            this.registros = await response.json()
            this.registros = this.registros.data
            await this.GetModeloJson()

        } catch (error) {

            console.log(error)
            throw new Error('Erro ao buscar registros')
        }
        
    }

    async MontaTabela() {

        this.Atributo("class", 'table table-dark table-striped table-bordered table-hover')
        this.thead = this.CreateElement('thead')
        this.tr = this.CreateElement('tr')

        if (this.registros.length > 0) {

            if (this.modelo_configuracao && this.modelo_configuracao.columns) {

                this.MontaTabelaComConfig()

            } else {

                this.MontaTabelaSemConfig()
            }
        }

        this.thead.appendChild(this.tr)
        this.GetHtml().appendChild(this.thead)

        this.tbody = this.CreateElement('tbody')
        this.GetHtml().appendChild(this.tbody)
        
        this.UpdateTable()
        this.CreatePagination()
    }

    MontaTabelaComConfig() {

        const visibleColumns = this.modelo_configuracao.columns.filter(col => col.visible !== false)

        const columnsToDisplay = this.modelo_configuracao.columnOrder ? this.modelo_configuracao.columnOrder.map(field => this.modelo_configuracao.columns
                .find(col => col.field === field))
                .filter(col => col && col.visible !== false) : visibleColumns

        for (const column of columnsToDisplay) {

            let th = this.CreateElement('th')
            th.innerHTML = column.header || column.field
            this.tr.appendChild(th)
        }
    }

    MontaTabelaSemConfig() {

        if (this.registros.length > 0) {

            const primeiroRegistro = this.registros[0]

            for (let key in primeiroRegistro) {
                let th = this.CreateElement('th')
                th.innerHTML = key
                this.tr.appendChild(th)
            }
        }
    }

    
    UpdateTable() {
        
        this.tbody.innerHTML = ''
        let start = (this.currentPage - 1) * this.recordsPerPage
        let end = start + this.recordsPerPage
        let paginatedRecords = this.registros.slice(start, end)

        for (let i = 0; i < paginatedRecords.length; i++) {
            this.tr = this.CreateElement('tr')

            if (this.modelo_configuracao && this.modelo_configuracao.columns) {

                this.RenderRowWithConfig(paginatedRecords[i])

            } else {

                this.RenderRowWithoutConfig(paginatedRecords[i])
            }

            if (this.coluna_nova.length > 0) {
                this.RenderExtraColumns(i)
            }

            this.tbody.appendChild(this.tr)
        }
    }

    RenderRowWithConfig(rowData) {
     
        const columnsToDisplay = this.modelo_configuracao.columnOrder ? this.modelo_configuracao.columnOrder.map(field => this.modelo_configuracao.columns
                .find(col => col.field === field))
                .filter(col => col && col.visible !== false) : this.modelo_configuracao.columns.filter(col => col.visible !== false)

        for (const column of columnsToDisplay) {
            const value = rowData[column.field]
            const formattedValue = column.format ? column.format(value) : this.TrataBoolean(value)
            const td = this.CreateElement('td', {}, formattedValue)
            this.tr.appendChild(td)
        }
    }

    RenderRowWithoutConfig(rowData) {

        for (let key in rowData) {

            if(typeof rowData[key] === 'object') {

                for (let k in rowData[key]) {

                    let valor = this.TrataBoolean(rowData[key][k])
                    let td = this.CreateElement('td', {}, valor)
                    this.tr.appendChild(td)
                }

            } else {

                let valor = this.TrataBoolean(rowData[key])
                let td = this.CreateElement('td', {}, valor)
                this.tr.appendChild(td)
            }
        }
    }

    RenderExtraColumns(rowIndex) {

        this.coluna_nova.forEach(coluna => {

            const newTd = this.CreateElement('td')

            if (typeof coluna.values === 'string' || coluna.values instanceof String) {

                newTd.innerHTML = coluna.values

            } else if (Array.isArray(coluna.values)) {

                newTd.innerHTML = coluna.values[rowIndex] || ''

            } else {

                newTd.appendChild(coluna.values.cloneNode(true))
            }

            this.tr.appendChild(newTd)
        })
    }

    async ReloadTable() {
            
        await this.UpdateTable()
    }

    CreatePagination() {
   
        if (this.pagination) {
            this.pagination.remove()
        }
    
        const totalPages     = Math.ceil(this.registros.length / this.recordsPerPage)
        this.pagination      = this.CreateElement('nav', { arialabel: 'Page navigation example'})
        const paginationList = this.CreateElement('ul',{ class: 'pagination' })
        const prevItem       = this.CreateElement('li', { class: 'page-item' })
        const prevLink       = this.CreateElement('a', { class: 'page-link', href: '#', arialabel: 'Previous' })
        const prevSpan       = this.CreateElement('span', { ariahidden: 'true'})
        
        this.HTML('&laquo;', prevSpan)
    
        prevLink.appendChild(prevSpan)
        prevLink.addEventListener('click', (event) => {
            event.preventDefault()
            if (this.currentPage > 1) {
                this.currentPage--
                this.UpdateTable()
                this.UpdatePagination()
            }
        })
    
        prevItem.appendChild(prevLink)
        paginationList.appendChild(prevItem)
    
        for (let i = 1; i <= totalPages; i++) {

            const listItem = this.CreateElement('li', { class: 'page-item' })

            if (i === this.currentPage) {
                this.AddClass('active', listItem)
            }
    
            const pageLink = this.CreateElement('a', { class: 'page-link', href: '#' })
            pageLink.textContent = i
    
            pageLink.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = i
                this.UpdateTable()
                this.UpdatePagination()
            })
    
            listItem.appendChild(pageLink)
            paginationList.appendChild(listItem)
        }
    
        const nextItem = this.CreateElement('li', { class: 'page-item' })

        if (this.currentPage === totalPages) {
            nextItem.classList.add('disabled')
        }
    
        const nextLink = this.CreateElement('a', { class: 'page-link', href: '#', arialabel: 'Next' })
        const nextSpan = this.CreateElement('span', { ariahidden: 'true'})
        this.HTML('&raquo;', nextSpan)
    
        nextLink.appendChild(nextSpan)
        nextLink.addEventListener('click', (event) => {
            event.preventDefault()
            if (this.currentPage < totalPages) {
                this.currentPage++
                this.UpdateTable()
                this.UpdatePagination()
            }
        })
    
        nextItem.appendChild(nextLink)
        paginationList.appendChild(nextItem)
    
        this.pagination.appendChild(paginationList)
        this.AppendChild(this.pagination)
    }
    
    
    UpdatePagination() {
        
        const pageItems = this.pagination.querySelectorAll('.page-item')
    
        pageItems.forEach((item, index) => {

            item.classList.remove('active')
    
            if (index === this.currentPage) {
                item.classList.add('active')
            }
        })
    }
    

    AddRowClickListener(callback) {

        this.On('click', (event) => {

            const row = event.target.closest('tr')

            if (row) {

                const rowIndex = row.rowIndex - 1

                if (rowIndex >= 0 && rowIndex < this.registros.length) {

                    callback(this.registros[rowIndex])
                }
            }
        });
    }
    

    HideColumns(columns) {

        for (const column of columns) {
            
            this.hiddenColumns.add(column)
        }
    
        this.UpdateTable()
    
        const ths = this.thead.querySelectorAll('th')
        const rows = this.tbody.querySelectorAll('tr')
    
        let index = 0
        for (const th of ths) {

            if (this.hiddenColumns.has(th.textContent.trim())) {

                th.style.display = 'none'

            } else {

                th.style.display = ''
            }
            index++;
        }
    
       
        rows.forEach(row => {

            const tds = row.querySelectorAll('td')

            tds.forEach((td, index) => {

                const header = ths[index]

                if (header && this.hiddenColumns.has(header.textContent.trim())) {

                    td.style.display = 'none'

                } else {

                    td.style.display = ''
                }
            })
        })
    }


    AddColumn(column_name, column_values) {

        this.coluna_nova.push({ name: column_name, values: column_values })
        this.MontaColuna()
        this.UpdateTable()
    }

    MontaColuna() {

        const theadRow = this.thead.querySelector('tr')
        const newTh = this.CreateElement('th')
        newTh.innerHTML = this.coluna_nova[this.coluna_nova.length - 1].name
        theadRow.appendChild(newTh)

    }

    TrataBoolean(value) {
        
        return value === true ? 'Sim' : value === false ? 'Não' : value
    }
    
    
}

export { Table }
