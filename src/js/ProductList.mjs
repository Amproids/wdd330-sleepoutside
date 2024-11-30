import { renderListWithTemplate } from './utils.mjs';
function productCardTemplate(product) {
    return `<li class=product-card>
        <a href=product-pages/index.html/?product=${product.Id}>
            <img src=products/${product.Image} alt=${product.Name}>
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
        this.products = await this.dataSource.getData();
        this.renderList(this.products);
    }
    removeIDsFromList(IDs) {
        let filteredList = [];
        //if this.products conatins an Id form IDs, do not add to filteredList 
        for (let product of this.products) {
        // Only add to filteredList if product's ID is not in IDs array
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