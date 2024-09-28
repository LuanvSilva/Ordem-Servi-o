import { HTML } from "../html.js"

class Table extends HTML {
    
    constructor(modelo) {
        super('table')
        this.modelo = modelo
        this.currentPage = 1
        this.recordsPerPage = 10
        this.hiddenColumns = new Set()
        this.coluna_nova = []
    }

    async Load(params) {
        await this.BuscaRegistros(this.modelo, params)
        await this.MontaTabela()
    }
    
    async BuscaRegistros(modelo, params) {

    //    try {
    //         let response = await fetch(`http://localhost:3000/${modelo}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(params)
    //         })

    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar registros')
    //         }

    //         this.registros = await response.json()

    //    } catch (error) {

    //         console.log(error)
    //         throw new Error('Erro ao buscar registros')
    //    }
        //this.registros = await response.json()
 
        this.registros = [
            { id: 1, nome: 'Alice', cpf: '123.456.789-00', telefone: '(11) 98765-4321', email: 'alice@example.com', cep: '81935-303',
            },
            { id: 2, nome: 'Bob', cpf: '234.567.890-11', telefone: '(21) 97654-3210', email: 'bob@example.com', cep: '02000-000' },
            { id: 3, nome: 'Charlie', cpf: '345.678.901-22', telefone: '(31) 96543-2109', email: 'charlie@example.com', cep: '03000-000' },
            { id: 4, nome: 'David', cpf: '456.789.012-33', telefone: '(41) 95432-1098', email: 'david@example.com', cep: '04000-000' },
            { id: 5, nome: 'Eve', cpf: '567.890.123-44', telefone: '(51) 94321-0987', email: 'eve@example.com', cep: '05000-000' },
            { id: 6, nome: 'Frank', cpf: '678.901.234-55', telefone: '(61) 93210-9876', email: 'frank@example.com', cep: '06000-000' },
            { id: 7, nome: 'Grace', cpf: '789.012.345-66', telefone: '(71) 92109-8765', email: 'grace@example.com', cep: '07000-000' },
            { id: 8, nome: 'Hannah', cpf: '890.123.456-77', telefone: '(81) 91098-7654', email: 'hannah@example.com', cep: '08000-000' },
            { id: 9, nome: 'Ian', cpf: '901.234.567-88', telefone: '(91) 90987-6543', email: 'ian@example.com', cep: '09000-000' },
            { id: 10, nome: 'Jack', cpf: '012.345.678-99', telefone: '(11) 89876-5432', email: 'jack@example.com', cep: '10000-000' },
            { id: 11, nome: 'Karen', cpf: '123.456.789-01', telefone: '(21) 88765-4321', email: 'karen@example.com', cep: '11000-000' },
            { id: 12, nome: 'Leo', cpf: '234.567.890-12', telefone: '(31) 87654-3210', email: 'leo@example.com', cep: '12000-000' },
            { id: 13, nome: 'Mia', cpf: '345.678.901-23', telefone: '(41) 76543-2109', email: 'mia@example.com', cep: '13000-000' },
            { id: 14, nome: 'Nina', cpf: '456.789.012-34', telefone: '(51) 65432-1098', email: 'nina@example.com', cep: '14000-000' },
            { id: 15, nome: 'Oscar', cpf: '567.890.123-45', telefone: '(61) 54321-0987', email: 'oscar@example.com', cep: '15000-000' },
            { id: 16, nome: 'Paul', cpf: '678.901.234-56', telefone: '(71) 43210-9876', email: 'paul@example.com', cep: '16000-000' },
            { id: 17, nome: 'Quinn', cpf: '789.012.345-67', telefone: '(81) 32109-8765', email: 'quinn@example.com', cep: '17000-000' },
            { id: 18, nome: 'Rachel', cpf: '890.123.456-78', telefone: '(91) 21098-7654', email: 'rachel@example.com', cep: '18000-000' },
            { id: 19, nome: 'Sam', cpf: '901.234.567-89', telefone: '(11) 10987-6543', email: 'sam@example.com', cep: '19000-000' },
            { id: 20, nome: 'Tina', cpf: '012.345.678-90', telefone: '(21) 09876-5432', email: 'tina@example.com', cep: '20000-000' },
            { id: 21, nome: 'Uma', cpf: '123.456.789-01', telefone: '(31) 98765-4321', email: 'uma@example.com', cep: '21000-000' },
            { id: 22, nome: 'Victor', cpf: '234.567.890-12', telefone: '(41) 87654-3210', email: 'victor@example.com', cep: '22000-000' },
            { id: 23, nome: 'Wendy', cpf: '345.678.901-23', telefone: '(51) 76543-2109', email: 'wendy@example.com', cep: '23000-000' },
            { id: 24, nome: 'Xander', cpf: '456.789.012-34', telefone: '(61) 65432-1098', email: 'xander@example.com', cep: '24000-000' },
            { id: 25, nome: 'Yara', cpf: '567.890.123-45', telefone: '(71) 54321-0987', email: 'yara@example.com', cep: '25000-000' },
            { id: 26, nome: 'Zane', cpf: '678.901.234-56', telefone: '(81) 43210-9876', email: 'zane@example.com', cep: '26000-000' },
            { id: 27, nome: 'Amy', cpf: '789.012.345-67', telefone: '(91) 32109-8765', email: 'amy@example.com', cep: '27000-000' },
            { id: 28, nome: 'Brian', cpf: '890.123.456-78', telefone: '(11) 21098-7654', email: 'brian@example.com', cep: '28000-000' },
            { id: 29, nome: 'Clara', cpf: '901.234.567-89', telefone: '(21) 10987-6543', email: 'clara@example.com', cep: '29000-000' },
            { id: 30, nome: 'Derek', cpf: '012.345.678-90', telefone: '(31) 09876-5432', email: 'derek@example.com', cep: '30000-000' },
            { id: 31, nome: 'Eva', cpf: '123.456.789-01', telefone: '(41) 98765-4321', email: 'eva@example.com', cep: '31000-000' },
            { id: 32, nome: 'Felix', cpf: '234.567.890-12', telefone: '(51) 87654-3210', email: 'felix@example.com', cep: '32000-000' },
            { id: 33, nome: 'Gina', cpf: '345.678.901-23', telefone: '(61) 76543-2109', email: 'gina@example.com', cep: '33000-000' },
            { id: 34, nome: 'Harry', cpf: '456.789.012-34', telefone: '(71) 65432-1098', email: 'harry@example.com', cep: '34000-000' },
            { id: 35, nome: 'Ivy', cpf: '567.890.123-45', telefone: '(81) 54321-0987', email: 'ivy@example.com', cep: '35000-000' },
            { id: 36, nome: 'Jake', cpf: '678.901.234-56', telefone: '(91) 43210-9876', email: 'jake@example.com', cep: '36000-000' },
            { id: 37, nome: 'Kim', cpf: '789.012.345-67', telefone: '(11) 32109-8765', email: 'kim@example.com', cep: '37000-000' },
            { id: 38, nome: 'Liam', cpf: '890.123.456-78', telefone: '(21) 21098-7654', email: 'liam@example.com', cep: '38000-000' },
            { id: 39, nome: 'Maya', cpf: '901.234.567-89', telefone: '(31) 10987-6543', email: 'maya@example.com', cep: '39000-000' },
            { id: 40, nome: 'Nate', cpf: '012.345.678-90', telefone: '(41) 09876-5432', email: 'nate@example.com', cep: '40000-000' },
            { id: 41, nome: 'Olivia', cpf: '123.456.789-01', telefone: '(51) 98765-4321', email: 'olivia@example.com', cep: '41000-000' },
            { id: 42, nome: 'Pete', cpf: '234.567.890-12', telefone: '(61) 87654-3210', email: 'pete@example.com', cep: '42000-000' },
            { id: 43, nome: 'Quincy', cpf: '345.678.901-23', telefone: '(71) 76543-2109', email: 'quincy@example.com', cep: '43000-000' },
            { id: 44, nome: 'Rita', cpf: '456.789.012-34', telefone: '(81) 65432-1098', email: 'rita@example.com', cep: '44000-000' },
            { id: 45, nome: 'Steve', cpf: '567.890.123-45', telefone: '(91) 54321-0987', email: 'steve@example.com', cep: '45000-000' },
            { id: 46, nome: 'Tara', cpf: '678.901.234-56', telefone: '(11) 43210-9876', email: 'tara@example.com', cep: '46000-000' },
            { id: 47, nome: 'Ursula', cpf: '789.012.345-67', telefone: '(21) 32109-8765', email: 'ursula@example.com', cep: '47000-000' },
            { id: 48, nome: 'Vince', cpf: '890.123.456-78', telefone: '(31) 21098-7654', email: 'vince@example.com', cep: '48000-000' },
            { id: 49, nome: 'Willa', cpf: '901.234.567-89', telefone: '(41) 10987-6543', email: 'willa@example.com', cep: '49000-000' },
            { id: 50, nome: 'Xena', cpf: '012.345.678-90', telefone: '(51) 09876-5432', email: 'xena@example.com', cep: '50000-000' },
            { id: 51, nome: 'Yuri', cpf: '123.456.789-01', telefone: '(61) 98765-4321', email: 'yuri@example.com', cep: '51000-000' },
            { id: 52, nome: 'Zara', cpf: '234.567.890-12', telefone: '(71) 87654-3210', email: 'zara@example.com', cep: '52000-000' }
        ];
        
        
    }

    async MontaTabela() {

        this.Atributo("class", 'table table-dark table-striped table-bordered table-hover')
        this.thead = this.CreateElement('thead')
        this.tr = this.CreateElement('tr')

        for (let key in this.registros[0]) {

            let th = this.CreateElement('th')
            th.innerHTML = key
            this.tr.appendChild(th)
        }

        this.thead.appendChild(this.tr)
        this.html.appendChild(this.thead)

        this.tbody = this.CreateElement('tbody')
        this.html.appendChild(this.tbody)
        
        this.UpdateTable()
        this.CreatePagination()
    }

    UpdateTable() {

        this.tbody.innerHTML = ''
        let start = (this.currentPage - 1) * this.recordsPerPage
        let end = start + this.recordsPerPage
        let paginatedRecords = this.registros.slice(start, end)

        for (let i = 0; i < paginatedRecords.length; i++) {
            this.tr = this.CreateElement('tr')

            for (let key in paginatedRecords[i]) {

                let td = this.CreateElement('td', {}, paginatedRecords[i][key])
                this.tr.appendChild(td)
            }

            if (this.coluna_nova.length > 0) {

                this.coluna_nova.forEach(coluna => {

                    const newTd = this.CreateElement('td')

                    if (typeof coluna.values === 'string' || coluna.values instanceof String) {

                        newTd.innerHTML = coluna.values

                    } else if (Array.isArray(coluna.values)) {
                        
                        newTd.innerHTML = coluna.values[i] || ''

                    } else {

                        newTd.appendChild(coluna.values.cloneNode(true))
                    }
                    this.tr.appendChild(newTd)
                })
            }

            this.tbody.appendChild(this.tr)
        }
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

                const rowData = {}
                const cells = row.querySelectorAll('td')

                cells.forEach((cell, index) => {

                    const key = Object.keys(this.registros[0])[index]
                    rowData[key] = cell.innerHTML

                })
                
                callback(rowData)
            }
        })
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
    
    
}

export { Table }
