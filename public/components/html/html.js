class HTML{
    constructor(element){
        this.main = document
        this.html = this.CreateElement(element)     
    }

    Find(objeto) {

        if (typeof objeto === "string" && objeto != undefined && this.main != undefined) {

            return this.main.body.querySelector(objeto)

        }else if (objeto != undefined && objeto instanceof HTMLElement) {

            return objeto

        }else{

            throw new Error('Objeto não encontrado')
        }

    }

    Name(valor, objeto) {

        if (this.main != undefined || this.html != undefined && valor != undefined) {

            this.html.setAttribute('name', valor)

        }else if(objeto != undefined && valor != undefined) {

            this.Find(objeto).setAttribute('name', valor)

        }

    }

    Id(valor, objeto) {

        if (this.main != undefined || this.html != undefined && valor != undefined) {

            this.html.setAttribute('id', valor)

        }else if (objeto != undefined && valor != undefined) {

            this.Find(objeto).setAttribute('id', valor)

        }

    }

    Val(valor, objeto) {

        if (this.html != undefined && valor != undefined) {

            this.html.value = valor

        }else if (this.html != undefined  && valor === undefined && objeto == undefined) {

           return this.html.value

        }
        else if (objeto != undefined && valor != undefined) {
        
            this.Find(objeto).value = valor

        }else if (objeto != undefined && valor === undefined) {

            return this.Find(objeto).value

        }

    }

    Placeholder(valor, objeto) {
            
        if (this.main != undefined || this.html != undefined && valor != undefined) {
    
            this.html.setAttribute('placeholder', valor)
    
        }else if (objeto != undefined && valor != undefined) {
    
            this.Find(objeto).setAttribute('placeholder', valor)
    
        }

    }

    Atributo(atributo, valor, objeto) {
            
        if ((this.main != undefined || this.html != undefined) && valor != undefined && objeto === undefined) {
    
            this.html.setAttribute(atributo, valor)
    
        }else if (objeto != undefined && valor != undefined) {
    
            this.Find(objeto).setAttribute(atributo, valor)
    
        }
    
    }

    RemoveAtributo(atributo, objeto) {

        if (this.main != undefined || this.html != undefined && atributo != undefined) {

            this.html.removeAttribute(atributo)

        }else if (objeto != undefined && atributo != undefined) {

            this.Find(objeto).removeAttribute(atributo)

        }

    }

    Text(valor, objeto) {

        if ((this.main != undefined || this.html != undefined) && valor != undefined && objeto === undefined) {

            this.html.innerText = valor

        }else if (objeto != undefined && valor != undefined) {

            this.Find(objeto).innerText = valor
        }
    }

    HTML(valor, objeto) {

        if ((this.main != undefined || this.html != undefined) && valor != undefined && objeto === undefined) {

            this.html.innerHTML = valor

        }else if (objeto !== undefined && valor != undefined) {

            this.Find(objeto).innerHTML = valor

        }
    }

    Obrigatorio(valor, objeto) {
            
            if (this.main != undefined || this.html != undefined && valor != undefined) {
    
                this.html.required = valor
    
            }else if (objeto != undefined && valor != undefined) {
    
                this.Find(objeto).required = valor
    
            }
    }

    Readonly(valor, objeto) {

        if (this.main != undefined || this.html != undefined && valor != undefined) {

            this.html.readOnly = valor

        }else if (objeto != undefined && valor != undefined) {

            this.Find(objeto).readOnly = valor
        }
    }

    Disabled(valor, objeto) {

        if (this.main != undefined || this.html != undefined && valor != undefined) {

            this.html.disabled = valor

        }else if (objeto != undefined && valor != undefined) {

            this.Find(objeto).disabled = valor

        }

    }

    CSS(atributo, valor, objeto) {

        if (!objeto && (this.main != undefined || this.html != undefined) && valor != undefined) {

            this.html.style[atributo] = valor

        }else if (objeto != undefined && valor != undefined) {

            this.Find(objeto).style[atributo] = valor

        }

    }
    
    CreateElement(tag, attributes = {}, innerHTML = '') {
        
        let element = this.main.createElement(tag)

        for (let [attr, value] of Object.entries(attributes)) {
            element.setAttribute(attr, value)
        }
        
        if (innerHTML) {
            element.innerHTML = innerHTML
        }
        
        return element
    }
    

    Click(callback, objeto) {

        if(this.main != undefined || this.html != undefined && callback != undefined) {
                
            if(callback != undefined) {
                    
                this.html.addEventListener('click', callback)

            }else{

                this.html.dispatchEvent(new Event('click'))

            }
        
        }else if(objeto != undefined && callback != undefined) {
                    
            this.Find(objeto).addEventListener('click', callback)
            
        }

    }

    Change(callback, objeto) {
            
        if(this.main != undefined || this.html != undefined && callback != undefined) {
                
            if(callback != undefined) {
                    
                this.html.addEventListener('change', callback)

            }else{

                this.html.dispatchEvent(new Event('change'))
            }
        
        }else if(objeto != undefined && callback != undefined) {
                    
            this.Find(objeto).addEventListener('change', callback)
            
        }
    
    }

    On(evento, callback, objeto) {
        
        if(this.html != undefined && callback != undefined && evento != undefined && objeto === undefined) {
                
            this.html.addEventListener(evento, callback)
        
        }else if(objeto != undefined && callback != undefined && evento != undefined) {
                    
            this.Find(objeto).addEventListener(evento, callback)
        }
    }

    Blur(callback, objeto) {

        if(this.main != undefined || this.html != undefined && callback != undefined) {

            if(callback != undefined) {
                    
                this.html.addEventListener('blur', callback)

            }else{

                this.html.dispatchEvent(new Event('blur'))
            }
        
        }else if(objeto != undefined && callback != undefined) {
                    
            this.Find(objeto).addEventListener('blur', callback)
            
        }
    }

    Hide(objeto) {

        if(this.main != undefined || this.html != undefined) {
                
            this.html.style.display = 'none'
        
        }else if(objeto != undefined) {
                        
            this.Find(objeto).style.display = 'none'   
        }

    }

    Show(objeto) {
            
       if(this.main != undefined || this.html != undefined) {
                
            this.html.style.display = 'block'
        
        }else if(objeto != undefined) {
                            
            this.Find(objeto).style.display = 'block'

        }
    
    }

    AddClass(classe, objeto) {
                    
        if((this.main != undefined || this.html != undefined) && classe != undefined && objeto === undefined) {
                
            this.html.classList.add(classe)
        
        }else if(objeto !== undefined && classe != undefined) {
                        
            this.Find(objeto).classList.add(classe)

        }
            
    }

    RemoveClass(classe, objeto) {
                            
        if(this.main != undefined || this.html != undefined) {
                
            this.html.classList.remove(classe)
        
        }else if(objeto != undefined && classe != undefined) {
                        
            this.Find(objeto).classList.remove(classe)
        }
                    
    }
    
    

    AppendChild(objeto) {

        if(this.main != undefined || this.html != undefined) {
                
            this.html.appendChild(objeto)
        
        }else if(objeto != undefined) {
                        
            this.Find(objeto).appendChild(objeto)
        }

    }

    TextNode(valor, objeto) {

        if(objeto != undefined && valor != undefined) {
                        
            this.Find(objeto).appendChild(this.main.createTextNode(valor))
            
        }else{

            return this.main.createTextNode(valor)
        }
    }

    Prepend(objeto) {

        if (objeto != undefined || this.main != undefined || this.html != undefined) {

            this.main.body.prepend(objeto)

        }

    }

    Append(objeto) {

        if (objeto != undefined || this.main != undefined || this.html != undefined) {

            this.main.body.append(objeto)

        }

    }

    Parent(objeto) {

        if (this.main != undefined || this.html != undefined) {

            return this.html.parentNode

        }else if(objeto != undefined) {

            return this.Find(objeto).parentNode

        }

    }

    GetContext(objeto) {

        if (this.main != undefined || this.html != undefined && objeto != undefined) {
                
                return this.html.getContext(objeto)
    
        }   
    }

    async FetchGet(url, callback) {
    
        try {
            
            await fetch(url)
            .then(response => response.json())
            .then((data) =>  callback(data))
            .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
            throw error
        }

    }
}

export { HTML }