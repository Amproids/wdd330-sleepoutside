import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

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
    <div class="cart-card__quantity-controls">
      <button class="quantity-btn decrease" data-id="${item.id}">-</button>
      <p class="cart-card__quantity">qty: ${quantity}</p>
      <button class="quantity-btn increase" data-id="${item.id}">+</button>
    </div>
    <p class="cart-card__price">$${item.price}</p>
    <button class="remove-item" data-id="${item.id}">Remove</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.bindEvents();
  }

  bindEvents() {
    const parentElement = document.querySelector(this.parentSelector);
    
    parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const itemId = target.dataset.id;

      if (!itemId) return;

      if (target.classList.contains('increase')) {
        this.updateQuantity(itemId, 1);
      } else if (target.classList.contains('decrease')) {
        this.updateQuantity(itemId, -1);
      } else if (target.classList.contains('remove-item')) {
        this.removeItem(itemId);
      }
    });
  }

  updateQuantity(itemId, change) {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems) return;

    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const item = itemsArray.find(item => item.id === itemId);
    
    if (item) {
      item.quantity = (item.quantity || 1) + change;
      
      if (item.quantity <= 0) {
        this.removeItem(itemId);
        return;
      }

      setLocalStorage(this.key, itemsArray);
      this.renderCartContents();
    }
  }

  removeItem(itemId) {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems) return;

    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const updatedItems = itemsArray.filter(item => item.id !== itemId);
    
    setLocalStorage(this.key, updatedItems);
    this.renderCartContents();
  }

  async renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const parentElement = document.querySelector(this.parentSelector);
    
    if (!cartItems || cartItems.length === 0) {
      parentElement.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
      this.updateTotal(0);
      return;
    }

    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    renderListWithTemplate(
      cartItemTemplate,
      parentElement,
      itemsArray
    );

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