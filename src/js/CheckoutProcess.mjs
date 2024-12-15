export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
      this.calculateOrdertotal();
    }
  
    calculateItemSummary() {
        const cartItems = this.list;
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        document.querySelector("#cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        this.itemTotal = subtotal;
        console.log("Calculated subtotal:", this.itemTotal); 
    }
    
    calculateOrdertotal() {
        // Calculate shipping
        this.shipping = 10 + (this.list.length - 1) * 2;  // $10 first item + $2 each additional
        document.querySelector("#cart-shipping").textContent = `$${this.shipping.toFixed(2)}`;
        
        // Calculate tax (6%)
        this.tax = this.itemTotal * 0.06;
        document.querySelector("#cart-tax").textContent = `$${this.tax.toFixed(2)}`;
        
        // Calculate and display total
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        document.querySelector("#cart-total").textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  
    calculateShipping() {
      // $10 for the first item plus $2 for each additional item
      const baseShipping = 10;
      const itemShipping = 2;
      const shippingTotal = baseShipping + (this.list.length - 1) * itemShipping;
      return shippingTotal.toFixed(2);
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary
      const shipping = document.querySelector(this.outputSelector + " #shipping");
      const tax = document.querySelector(this.outputSelector + " #tax");
      const orderTotal = document.querySelector(this.outputSelector + " #order-total");
  
      shipping.innerText = "$" + this.shipping;
      tax.innerText = "$" + this.tax;
      orderTotal.innerText = "$" + this.orderTotal;
    }
  
    packageItems(items) {
      // convert the list of products from localStorage to the simpler form required for the checkout process
      return items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
    }
  
    async checkout(form) {
        const formData = new FormData(form);
        const items = this.packageItems(this.list);
        const orderDetails = {
            orderDate: new Date().toISOString(),
            items: items,
            orderTotal: this.orderTotal,
            shipping: parseFloat(this.shipping),
            tax: parseFloat(this.tax),
            fname: formData.get("fname"),
            lname: formData.get("lname"),
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            cardNumber: formData.get("cardNumber"),
            expiration: formData.get("expiration"),
            code: formData.get("code")
        };
        
        try {
            const res = await services.checkout(orderDetails);
            localStorage.removeItem("so-cart");
            location.href = "/checkout/success.html";
        } catch (err) {
            // Display error to user using the alertMessage utility
            alertMessage(err.message);
        }
    }
}

  function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }