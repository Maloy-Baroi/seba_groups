from django.urls import path
from .views import *

app_name = 'App_seller'

urlpatterns = [
    path('cartitems/', CartItemListCreateView.as_view(), name='cartitem-list-create'),
    path('cartitems/<int:pk>/', CartItemRetrieveUpdateDestroyView.as_view(), name='cartitem-retrieve-update-destroy'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyView.as_view(), name='order-retrieve-update-destroy'),
]
