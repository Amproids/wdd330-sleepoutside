// cart.js
import { getLocalStorage } from './utils.mjs';

function updateTotal() {
    const totalElement = document.querySelector('#cart-total')
    const cartItems = getLocalStorage('so-cart');
    let total = 0;
    cartItems.forEach((item) => {
        console.log(item);
        total += item.price * item.quantity;
    });

    totalElement.innerHTML = `Subtotal: $${total}`;
    totalElement.style.display = 'block';
}
function renderCartContents() {
    const cartItems = getLocalStorage('so-cart');
    if (!cartItems) {
        document.querySelector('.product-list').innerHTML = '<li class="cart-empty">Your cart is empty</li>';
        return;
    }
    
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    
    const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
    const quantity = item.quantity || 1; // Default to 1 if quantity isn't set
    console.log(item);
    const newItem = `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
                src="${item.image}"
                alt="${item.name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.name}</h2>
        </a>
        <p class="cart-card__color">${item.color}</p>
        <p class="cart-card__quantity">qty: ${quantity}</p>
        <p class="cart-card__price">$${item.price}</p>
    </li>`;
    return newItem;
}

renderCartContents();
updateTotal();