// example.js

import {callApi} from './apis';

export async function getProductList() {
    return await callApi('api-product/products/');
}

export async function getExpiredProductsList() {
    return await callApi('api-product/expired-products/');
}

export async function getCategoryList() {
    return await callApi('api-product/categories/');
}

export async function getOrderListForLoginUser() {
    return await callApi('api-seller/order-list/')
}

export async function getCustomerReport() {
    return await callApi('api-seller/customer-report')
}

export async function getSubCategoryList() {
    return await callApi('api-product/sub-categories/');
}

export async function getBrandList() {
    return await callApi('api-product/brand/');
}

export async function getShelfList() {
    return await callApi('api-product/all-shelf/');
}

export async function getStockAlert() {
    return await callApi('api-seller/stock-alerts/');
}

export async function getNearToExpiredDate() {
    return await callApi('api-seller/near-expiry-products/')
}

export async function getAlmostStockOutProducts() {
    return await callApi('api-seller/stock-less-than-minimum-quantity/')
}

export async function getCustomerSellerInvoiceCount() {
    return await callApi('api-admin/customer-seller-order-count/')
}

export async function getSellerList() {
    return await callApi('api-admin/seller-list/')
}

