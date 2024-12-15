import { setLocalStorage } from './utils.mjs';
import { alertMessage } from './utils.mjs';

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
        // Update cart count
        this.updateCartCount();
    }

    addToCart() {
        const button = document.getElementById('addToCart');
        const rect = button.getBoundingClientRect();
        this.createAddToCartAnimation(rect.left + (rect.width / 2), rect.top + (rect.height / 2));
        
        const product = {
          id: this.product.Id,
          name: this.product.Name,
          color: this.product.Colors[0].ColorName,
          price: this.product.FinalPrice,
          image: this.product.Images.PrimaryMedium,
          quantity: 1
        };
        let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
        if (!Array.isArray(cart)) cart = [cart];
        
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
          cart[existingProductIndex].quantity += 1;
        } else {
          cart.push(product);
        }
        
        setLocalStorage('so-cart', cart);
        this.updateCartCount();
        alertMessage(`${product.name} added to cart!`, '#90EE90');
      }
      
      createAddToCartAnimation(startX, startY) {
        const dot = document.createElement('div');
        dot.className = 'add-to-cart-dot';
        dot.style.top = `${startY}px`;
        dot.style.left = `${startX}px`;
        document.body.appendChild(dot);
      
        const cart = document.querySelector('.cart svg');
        const cartRect = cart.getBoundingClientRect();
        
        requestAnimationFrame(() => {
          dot.style.top = `${cartRect.top + (cartRect.height / 2)}px`;
          dot.style.left = `${cartRect.left + (cartRect.width / 2)}px`;
          dot.style.opacity = '0';
        });
      
        setTimeout(() => dot.remove(), 1000);
      }
      
      updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
        const count = Array.isArray(cart) ? cart.length : 1;
        
        let countBadge = document.querySelector('.cart-count');
        if (!countBadge) {
          countBadge = document.createElement('div');
          countBadge.className = 'cart-count';
          document.querySelector('.cart').appendChild(countBadge);
        }
        
        countBadge.textContent = count;
        countBadge.style.display = count > 0 ? 'flex' : 'none';
      }

    renderProductDetails() {
        const productSection = document.querySelector('.product-detail');
        productSection.innerHTML = `<h3>${this.product.Brand.Name}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
                class="divider"
                src="${this.product.Images.PrimaryLarge}"
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