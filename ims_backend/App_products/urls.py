from django.urls import path
from App_products.views import *

app_name = "App_products"

urlpatterns = [
    path('products/', ProductAPIView.as_view(), name="product-list"),
    path('almost-expiry-products/', AlMostExpiryProductsAPIView.as_view(), name="almost-expiry-product-list"),
    path('expired-products/', ExpiredProductsAPIView.as_view(), name="expired-product-list"),
    path('categories/', CategoryListAPIView.as_view(), name="categories"),
    path('sub-categories/', SubCategoryListAPIView.as_view(), name="sub-categories"),
    path('brand/', BrandListAPIView.as_view(), name="brand"),
]
