function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
    }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
    constructor() {
        // Constructor is now empty since we don't need to set category and path anymore
    }

    async getData(category) {
        const response = await fetch(baseURL + `products/search/${category}`);
        const data = await convertToJson(response);
        return data.Result;
    }

    async findProductById(id) {
        const response = await fetch(`${baseURL}product/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }
}