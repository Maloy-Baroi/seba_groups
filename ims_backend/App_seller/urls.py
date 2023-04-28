from django.urls import path
from .views import *

app_name = 'App_seller'

urlpatterns = [
    path('cart/', cart_view, name='cart-view'),
    path('order/', order_view, name='order-view'),
]
