import { getLocalStorage, setLocalStorage, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(productItem) {
    let cart = getLocalStorage('so-cart');
    if (!cart) {
        cart = [];
    } else if (!Array.isArray(cart)) {
        cart = [cart];
    }
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.Id === productItem.Id);
    if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // If item is new, add it with quantity of 1
        productItem.quantity = 1;
        cart.push(productItem);
    }
    setLocalStorage('so-cart', cart);
}

// add to cart button event handler
const addToCartButton = document.getElementById('addToCart');
if (addToCartButton) {
    addToCartButton.addEventListener('click', async function(e) {
        const productItem = await dataSource.findProductById(e.target.dataset.id);
        addProductToCart(productItem);
    });
}