import json
from datetime import datetime, timedelta
import re

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from App_products.models import *
from App_products.serializers import *
from App_seller.models import *


# Create your views here.
class ProductAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().exclude(expiry_date__lte=datetime.today()).order_by('expiry_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImportProductsAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(imported=True).exclude(expiry_date__lte=datetime.today().date())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def productUpdateAPIView(request, pk):
    try:
        product_object = ProductModel.objects.get(pk=pk)
    except product_object.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        shelf_number = request.data['shelf']
        shelf_pattern = r"Shelf:\s+(\d+)"
        row_pattern = r"Row:\s+(\d+)"
        column_pattern = r"Column:\s+(\d+)"

        shelf_no = re.search(shelf_pattern, shelf_number).group(1)
        row_no = re.search(row_pattern, shelf_number).group(1)
        column_no = re.search(column_pattern, shelf_number).group(1)

        my_shelf = Shelf.objects.get(number=shelf_no, row=row_no, column=column_no)
        product_object.shelf = my_shelf
    except:
        pass

    product_object.bought_price = request.data['bought_price']
    product_object.minimum_selling_price = request.data['minimum_selling_price']
    product_object.quantity = request.data['quantity']
    product_object.minimum_alert_quantity = request.data['minimum_alert_quantity']
    product_object.expiry_date = request.data['expiry_date']

    product_object.save()

    if int(product_object.quantity) > int(product_object.minimum_alert_quantity):
        stoct_alart = StockAlertModel.objects.filter(product=product_object)
        if stoct_alart.exists():
            stoct_alart[0].delete()

    return Response({
        'success': f"`{product_object.name}` is successfully updated",
    }, status=status.HTTP_200_OK)


class AlMostExpiryProductsAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get(self, request, *args, **kwargs):
        today = datetime.today().date()
        ten_days_later = today + timedelta(days=15)
        queryset = self.get_queryset().filter(expiry_date__range=[today, ten_days_later])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ExpiredProductsAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get(self, request, *args, **kwargs):
        today = datetime.today().date()
        queryset = self.get_queryset().filter(expiry_date__lt=today)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class CreateCategoryView(generics.CreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class SubCategoryListAPIView(generics.ListAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class BrandListAPIView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticated]


class CreateBrandAPIView(generics.CreateAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()


class ShelfListAPIView(generics.ListAPIView):
    queryset = Shelf.objects.all()
    serializer_class = ShelfSerializer
    permission_classes = [permissions.IsAuthenticated]
