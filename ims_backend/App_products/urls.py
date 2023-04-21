from django.urls import path
from App_products.views import *

app_name = "App_products"

urlpatterns = [
    path('products/', ProductAPIView.as_view(), name="product-list"),
    path('almost-expiry-products/', AlMostExpiryProductsAPIView.as_view(), name="almost-expiry-product-list"),
    path('expired-products/', ExpiredProductsAPIView.as_view(), name="expired-product-list"),
    path('categories/', CategoryListAPIView.as_view(), name="categories"),
    path('create-categories/', CreateCategoryView.as_view(), name="create-categories"),
    path('sub-categories/', SubCategoryListAPIView.as_view(), name="sub-categories"),
    path('brand/', BrandListAPIView.as_view(), name="brand"),
    path('create-brand/', CreateBrandAPIView.as_view(), name="create-brand"),
    path('all-shelf/', ShelfListAPIView.as_view(), name="all-shelf"),
]
