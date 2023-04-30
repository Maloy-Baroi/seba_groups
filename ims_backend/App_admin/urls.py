from django.urls import path
from .views import *

app_name = 'App_admin'

urlpatterns = [
    path('customer-seller-order-count/', customer_seller_order_count, name='customer-seller-order-count'),
    path('seller-list/', SellerListAPIView.as_view(), name='seller-list'),
    path('order-list-for-manager/', OrderListAPIViewForManager.as_view(), name='order-list-for-manager'),
    path('create-shelves/', ShelfListCreateAPIView.as_view(), name='shelf-list-create'),
    path('create-categories/', CreateCategoryView.as_view(), name="create-categories"),
    path('create-brand/', CreateBrandAPIView.as_view(), name="create-brand"),
    path('create-subcategories/', SubCategoryListCreateAPIView.as_view(), name='subcategory-list-create'),

]
