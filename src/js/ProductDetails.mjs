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
            price: this.product.FinalPrice,
            image: this.product.Image,
            quantity: 1
        };
    
        // Get existing cart and ensure it's an array
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('so-cart')) || [];
            // Make sure cart is an array
            if (!Array.isArray(cart)) {
                cart = [cart];
            }
        } catch (e) {
            cart = [];
        }
    
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
        if (existingProductIndex >= 0) {
            // If product exists, increment quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If product doesn't exist, add it to cart
            cart.push(product);
        }
    
        // Save updated cart back to localStorage
        setLocalStorage('so-cart', cart);
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