import json

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from App_login.models import CustomUser
from App_products.models import ProductModel
from .models import OrderModel, CustomerProfile
from .serializers import *


# Create your views here.
class CartItemListCreateView(generics.ListCreateAPIView):
    pass


class CartItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    pass


class OrderListCreateView(generics.ListCreateAPIView):
    pass


class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    pass
