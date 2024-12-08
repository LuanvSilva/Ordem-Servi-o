import { HTML } from '../html.js'

class LoadingHTML extends HTML {
    constructor(targetElement, rowTypes) {
        super('div')
        this.skeletons = []
        this.SetTargetElement(targetElement)
        this.SetRows(rowTypes)
    }

    SetTargetElement(targetElement) {

        if (typeof targetElement === 'string') {

            this.targetElement = this.Find(targetElement)

        } else {

            this.targetElement = this.CreateElement('div', { class: 'container' })
        }
    }

    SetRows(rowTypes) {

        this.rowTypes = rowTypes
    }

    Load() {

        this.SetTargetElement()
        this.LoadSkeletons()
    }

    LoadSkeletons() {

        for (let i = 0; i < this.rowTypes.length; i++) {

            this.div = this.CreateElement('div', { class: 'row mt-4' })
            let row = this.rowTypes[i]
            let type, count

            if (Array.isArray(row)) {

                [type, count] = row

            } else {

                type = row
                count = 1
            }

            for (let j = 0; j < count; j++) {

                this.CreateSkeleton(type, count)
            }

            this.targetElement.appendChild(this.div)
        }
    }

    CreateSkeleton(type, count) {

        let column = this.CreateElement('div', { class: `col-md-${count > 1 ? Math.floor(12 / count) : 12}` })
        let title =  this.CreateElement('div', { class: 'skeleton' , style: 'height: 15px; width: 25%' })
        let campo =  this.CreateElement('div', { class: 'skeleton mt-2' })

        // Ajustar estilos com base no tipo de row
        switch (type) {
            case 'input':
                campo.style.height = '40px'
                column.appendChild(title)
                column.appendChild(campo)
                this.div.appendChild(column)
                break;
            case 'textarea':
                campo.style.height = '100px'
                column.appendChild(title)
                column.appendChild(campo)
                this.div.appendChild(column)
                break;
            case 'card':
                campo.style.height = '150px'
                campo.style.width = '80%'
                column.appendChild(campo)
                this.div.appendChild(column)
                break;
            case 'table':
                campo.style.height = '200px'
                column.appendChild(campo)
                this.div.appendChild(column)
                break;
            case 'multiplecards':
                let cardContainer = this.CreateElement('div', { class: 'd-flex flex-wrap gap-4' })
                for (let j = 0; j < 3; j++) {
                    let additionalCard = this.CreateElement('div', { class: 'mt-1 skeleton' } )
                    additionalCard.style.height = '150px'
                    additionalCard.style.width = '30%'
                    cardContainer.appendChild(additionalCard)
                }
                this.div.appendChild(cardContainer)
                return;
            case 'title':
                campo.style.height = '20px'
                campo.style.width = '15%'
                column.appendChild(campo)
                this.div.appendChild(column)
                break;
            default:
                campo.style.height = '30px'
                column.appendChild(campo)
                this.div.appendChild(column)
        }
    }

    Destroy() {
        this.targetElement.remove()
        this.targetElement = null
    }
}

export { LoadingHTML }
