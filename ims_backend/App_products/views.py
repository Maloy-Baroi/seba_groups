from datetime import datetime, timedelta

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.response import Response

from App_products.models import *
from App_products.serializers import *


# Create your views here.
class ProductAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().exclude(expiry_date__lte=datetime.today().date())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
