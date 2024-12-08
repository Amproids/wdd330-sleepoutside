import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    const cart = new ShoppingCart("so-cart", ".product-list");
    cart.renderCartContents();
}

init();