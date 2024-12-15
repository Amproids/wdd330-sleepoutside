export function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }
  
  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
  }
  
  export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }
  
  export function renderListWithTemplate(templateFn, parentElement, list) {
    if (parentElement) {
      parentElement.innerHTML = list.map(templateFn).join('');
    }
  }
  
  export function renderWithTemplate(template, element, data, callback) {
    if (element) {
      element.insertAdjacentHTML("afterbegin", template);
      if (callback) {
        callback(data);
      }
    }
  }
  
  async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}
  
export async function loadHeaderFooter() {
    const header = await loadTemplate("../partials/header.html");
    const footer = await loadTemplate("../partials/footer.html");
    document.querySelector("#main-header").innerHTML = header;
    document.querySelector("#main-footer").innerHTML = footer;
    
    // Initialize cart count
    const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    const count = Array.isArray(cart) ? cart.length : 1;
    
    let countBadge = document.createElement('div');
    countBadge.className = 'cart-count';
    countBadge.textContent = count;
    countBadge.style.display = count > 0 ? 'flex' : 'none';
    document.querySelector('.cart').appendChild(countBadge);
}
export function alertMessage(message, color = 'red', timer = 5000) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `<p>${message}</p><span> X</span>`;
    
    alert.addEventListener('click', function(e) {
        if(e.target.tagName === 'SPAN') {
            main.removeChild(this);
        }
    });
    const main = document.querySelector('main');
    main.prepend(alert);
    alert.style.backgroundColor = color;
    
    if(timer) {
        setTimeout(function() {
            main.removeChild(alert);
        }, timer);
    }
}