import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  return `<li class="cart-card divider">
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
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  async renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(this.parentSelector).innerHTML = 
        '<li class="cart-empty">Your cart is empty</li>';
      this.updateTotal(0);
      return;
    }

    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    renderListWithTemplate(cartItemTemplate, this.parentSelector, itemsArray);
    
    const total = this.calculateTotal(itemsArray);
    this.updateTotal(total);
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + (item.price * quantity);
    }, 0);
  }

  updateTotal(total) {
    const totalElement = document.querySelector('#cart-total');
    if (totalElement) {
      totalElement.innerHTML = `Subtotal: $${total.toFixed(2)}`;
      totalElement.style.display = 'block';
    }
  }
}