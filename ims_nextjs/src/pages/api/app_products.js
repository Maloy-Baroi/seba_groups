// example.js

import {callApi} from './apis';

export async function getProductList() {
    const response =  await callApi('api-product/products/');
    return response.then(result => result.json());
}

export async function getAlmostExpiryProductsList() {
    return await callApi('api-product/almost-expiry-products/');
}

export async function getExpiredProductsList() {
    return await callApi('api-product/expired-products/');
}

export async function getCategoryList() {
    return await callApi('api-product/categories/');
}

export async function getSubCategoryList() {
    return await callApi('api-product/sub-categories/');
}

export async function getBrandList() {
    return await callApi('api-product/brand/');
}

