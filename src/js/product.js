// product.js
import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
    let cart = getLocalStorage('so-cart');
    if (!cart) {
        cart = [];
    } else if (!Array.isArray(cart)) {
        cart = [cart];
    }

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.Id === product.Id);
    
    if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // If item is new, add it with quantity of 1
        product.quantity = 1;
        cart.push(product);
    }
    
    setLocalStorage('so-cart', cart);
}

// Only add this event listener if we're on the product page
const addToCartButton = document.getElementById('addToCart');
if (addToCartButton) {
    addToCartButton.addEventListener('click', async function(e) {
        const product = await dataSource.findProductById(e.target.dataset.id);
        addProductToCart(product);
    });
}