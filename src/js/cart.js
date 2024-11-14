// cart.js
import { getLocalStorage } from './utils.mjs';

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
    const newItem = `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
                src="${item.Image}"
                alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${quantity}</p>
        <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
    </li>`;
    return newItem;
}

renderCartContents();