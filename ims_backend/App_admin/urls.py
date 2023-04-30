from django.urls import path
from .views import *

app_name = 'App_admin'

urlpatterns = [
    path('customer-seller-order-count/', customer_seller_order_count, name='customer-seller-order-count'),
    path('seller-list/', SellerListAPIView.as_view(), name='seller-list'),
    path('order-list-for-manager/', OrderListAPIViewForManager.as_view(), name='order-list-for-manager'),
]
