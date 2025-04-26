import { products } from "./data.js";
import templateSource from "./templates/products.hbs";

const productsContainer = document.querySelector(".products-container");
productsContainer.innerHTML = templateSource({ products });
