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
    try {
      const headerTemplate = await loadTemplate("../partials/header.html");
      const headerElement = document.querySelector("#main-header");
      const footerTemplate = await loadTemplate("../partials/footer.html");
      const footerElement = document.querySelector("#main-footer");
  
      if (headerElement && footerElement) {
        renderWithTemplate(headerTemplate, headerElement);
        renderWithTemplate(footerTemplate, footerElement);
      } else {
        console.error("Header or footer elements not found");
      }
    } catch (err) {
      console.error("Error loading header/footer:", err);
    }
  }