import { HTML } from '../html.js'

class SkeletonLoader extends HTML{
    constructor(targetElement, rowTypes) {
        super('div')
        this.skeletons = [];
        this.SetTargetElement(targetElement)
        this.SetRows(rowTypes)
    }

    SetTargetElement(targetElement) {

        if (typeof targetElement === 'string') {

            this.targetElement = this.Find(targetElement)

        } else{

            this.targetElement = this.CreateElement('div', {class: 'skeleton-container'})
        }
       
    }

    SetRows(rowTypes) {

        this.rowTypes = rowTypes
    }

    Load() {

        this.SetTargetElement()

        for (let i = 0; i < this.rowTypes.length; i++) {

            let skeleton = this.CreateElement('div', {class: 'col-md-12 mt-4 skeleton'})

            // Ajustar estilos com base no tipo de row
            switch (this.rowTypes[i]) {
                case 'input':
                    skeleton.style.height = '30px'
                    break;
                case 'textarea':
                    skeleton.style.height = '100px'
                    break;
                case 'card':
                    skeleton.style.height = '150px'
                    skeleton.style.width = '80%'
                    break;
                case 'table':
                    skeleton.style.height = '200px'
                    break;
                case 'multiplecards':
                    let cardContainer = this.CreateElement('div', { class: 'd-flex flex-wrap gap-4' }); 
                    for (let j = 0; j < 3; j++) { 
                        let additionalCard = this.CreateElement('div', { class: 'mt-4 skeleton' }); 
                        additionalCard.style.height = '150px'; 
                        additionalCard.style.width = '30%';  
                        cardContainer.appendChild(additionalCard); 
                    }
                    this.targetElement.appendChild(cardContainer);
                    break;
                case 'title':
                    skeleton.style.height = '30px'
                    skeleton.style.width = '10%'
                    break;
                default:
                    skeleton.style.height = '30px'
            }

            this.targetElement.appendChild(skeleton);

        }
    }

    Destroy() {

        this.targetElement.remove()
        this.targetElement = null
    }
}

export { SkeletonLoader } 
