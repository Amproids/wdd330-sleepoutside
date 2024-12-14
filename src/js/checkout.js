import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

console.log("Checkout")
const services = new ProductData();
const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: item.quantity
  }));
}

function init() {
    checkoutProcess.init();

    document.querySelector("#zip")
        .addEventListener("blur", (e) => {
            if (e.target.value.length === 5) {
                checkoutProcess.calculateOrdertotal();
                
            }
    });

    document.querySelector("#checkout-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            
            try {
                const json = formDataToJSON(e.target);
                json.items = packageItems(checkoutProcess.list);
                json.orderTotal = checkoutProcess.orderTotal;
                json.shipping = checkoutProcess.shipping;
                json.tax = checkoutProcess.tax;
                json.orderDate = new Date().toISOString();
                
                const res = await services.checkout(json);
                console.log(res);
                
                // Clear the cart and redirect to success page
                localStorage.removeItem("so-cart");
                location.assign("/checkout/success.html");
                
            } catch (err) {
                console.log(err);
                // Handle errors here
            }
    });
}

init();