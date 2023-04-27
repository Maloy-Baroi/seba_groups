from django.urls import path
from .views import *

app_name = 'App_seller'

urlpatterns = [
    path('orders/', oderListCreate, name='order-list-create'),
]
