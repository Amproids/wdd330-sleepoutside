import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';


//create an instance of your ProductListing class in main.js and make sure that you can see the list of products. 
//Using a template, insert the following HTML into the DOM:
const tentData = new ExternalServices('tents');
const tentListElement = document.querySelector('.product-list')
const tentList = new ProductList('tents', tentData, tentListElement);

async function initializeList() {
    await tentList.init();
    const filteredList = tentList.removeIDsFromList(['989CG', '880RT']);
    tentList.renderList(filteredList);  // Pass the filtered list to renderList
}

initializeList();

loadHeaderFooter();