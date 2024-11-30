import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

//create an instance of your ProductListing class in main.js and make sure that you can see the list of products. 
//Using a template, insert the following HTML into the DOM:
const tentData = new ProductData('tents');
const tentListElement = document.querySelector('.product-list')
const tentList = new ProductList('tents', tentData, tentListElement);

async function initializeList() {
    await tentList.init();
    const filteredList = tentList.removeIDsFromList(['989CG', '880RT']);
    tentList.renderList(filteredList);  // Pass the filtered list to renderList
}

initializeList();