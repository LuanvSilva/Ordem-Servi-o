import "../../../resources/multiselect/multiselect.js"
import { HTML } from "../html.js"

class MultiSelect extends HTML {
  constructor(label, placeholder, classe, callback, options = []) {
    super()
    this.label = label
    this.placeholder = placeholder
    this.classe = classe
    this.callback = callback
    this.options = options
  }

  async Load() {
    return await this.ConfiguraCampos();
  }

  async ConfiguraCampos() {

    const container = document.createElement('div');
    container.classList.add('multiselect-container', this.classe);

    // Criação do label
    const labelElement = document.createElement('label');
    labelElement.innerText = this.label;
    container.appendChild(labelElement);

    const selectElement = document.createElement('select');
    selectElement.setAttribute('multiple', 'multiple');
    selectElement.setAttribute('placeholder', this.placeholder);
    selectElement.classList.add('multiselect-element');


    this.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      selectElement.appendChild(optionElement);
    });

    container.appendChild(selectElement)
    document.body.appendChild(container)

    this.Find(selectElement).multiselect({
      placeholder: this.placeholder,
      onChange: this.callback,
    });
  }
}

export { MultiSelect };
