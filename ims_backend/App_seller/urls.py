from django.urls import path
from .views import *

app_name = 'App_seller'

urlpatterns = [
    path('cart/', cart_view, name='cart-view'),
    path('cart-list/', CartListAPIView.as_view(), name='cart-list'),
    path('cart-delete/', cart_delete, name='cart-delete'),
    path('single-order-view/<int:id>/', SingleOrderAPIView.as_view(), name='single-order-view'),
    path('order-list/', OrderListAPIView.as_view(), name='order-list'),
    path('order/', order_view, name='order-view'),
    path('stock-alerts/', StockAlertListAPIView.as_view(), name='stock-alerts'),
    path('customer-profiles/', CustomerProfileListAPIView.as_view(), name='customer-profiles')
]
