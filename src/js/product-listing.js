import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// get the category from the URL
const category = getParam('category');

// create an instance of ProductData class
const dataSource = new ProductData();

// get the element where we'll display the products
const listElement = document.querySelector('.product-list');

// create an instance of ProductList class with the category
const myList = new ProductList(category, dataSource, listElement);

// initialize the list
myList.init();