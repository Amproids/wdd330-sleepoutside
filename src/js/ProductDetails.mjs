import { setLocalStorage } from './utils.mjs';
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
  
    async init() {
      // Get product data
      this.product = await this.dataSource.findProductById(this.productId);
      // Render product
      this.renderProductDetails();
      // Add event listener
      document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }
  
    addToCart() {
        const product = {
            id: this.product.Id,
            name: this.product.Name,
            color: this.product.Colors[0].ColorName,
            price: this.product.FinalPrice
        };
        setLocalStorage('so-cart', product);
    }
  
    renderProductDetails() {
        const productSection = document.querySelector('.product-detail');
        productSection.innerHTML = `<h3>${this.product.Brand.Name}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
                class="divider"
                src="${this.product.Image}"
                alt="${this.product.NameWithoutBrand}"
            />
            <p class="product-card__price">$${this.product.FinalPrice}</p>
            <p class="product__color">${this.product.Colors[0].ColorName}</p>
            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>`;
    }
}