import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class=product-card>
        <a href=/product-pages/?product=${product.Id}>
        <img src=${product.Images.PrimaryMedium} alt=${product.Name}>
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        // Pass the category to getData
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);
    }

    removeIDsFromList(IDs) {
        let filteredList = [];
        for (let product of this.products) {
            if (!IDs.includes(product.Id)) {
                filteredList.push(product);
            }
        }
        return filteredList;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}