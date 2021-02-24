'use strict';

export class Description {
    constructor(parent, data) {
        this.__parent = parent;
        this.__data = data;
    }

    get __getDescription() {
        const descriptions = this.__data.description;
        let des = '';
        descriptions.forEach((value) => {
            console.log(value.text);
            des += `<div class="product--description">
                <div class="product--description--topic">
                    <p class="product--description--description__title">${value.title}</p>
                </div>
                <div class="product--description--description">
                    <p class="product--description--description__text"> ${value.text.replaceAll('\n', '<br/>')}</p>
                </div>
            </div>
            <hr class="hr-description"/>`;
        });
        return des;
    }

    __getTemplate() {
        return `    
    <div class="product-inner">
        ${this.__getDescription}
    </div>
        `;
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
    }
}
