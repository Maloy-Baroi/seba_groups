import json
from datetime import datetime, timedelta
import re

from django.shortcuts import render
from django.contrib.auth.models import Group
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from App_login.serializers import UserSerializers
from App_products.models import *
from App_products.serializers import *
from App_seller.models import *
from App_seller.serializers import OrderSerializer


# Create your views here.


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def customer_seller_order_count(request):
    orders = OrderModel.objects.all().count()
    customer = CustomerProfile.objects.all().count()
    users = CustomUser.objects.all()
    seller_group = Group.objects.get(name='seller')

    # Filter the queryset to get the seller group's users
    seller_group_users = users.filter(groups=seller_group)

    print(seller_group_users)

    return Response({
        "totalOrders": orders,
        "totalCustomers": customer,
        "totalSellers": len(seller_group_users),
    }, status=status.HTTP_302_FOUND)


class SellerListAPIView(generics.ListAPIView):
    serializer_class = UserSerializers
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = CustomUser.objects.all()
        seller_group = Group.objects.get(name='seller')

        # Filter the queryset to get the seller group's users
        seller_group_users = queryset.filter(groups=seller_group)

        return Response(seller_group_users.values(), status=status.HTTP_200_OK)


class OrderListAPIViewForManager(generics.ListAPIView):
    queryset = OrderModel.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class ShelfListCreateAPIView(generics.ListCreateAPIView):
    queryset = Shelf.objects.all()
    serializer_class = ShelfSerializer


class CreateBrandAPIView(generics.CreateAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()


class SubCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer


class CreateCategoryView(generics.CreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
