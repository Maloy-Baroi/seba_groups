import json

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from App_login.models import CustomUser
from App_products.models import ProductModel
from App_products.serializers import ProductModelSerializer
from .models import OrderModel, CustomerProfile
from .serializers import *

# Create your views here.
from django.shortcuts import render, redirect
from django.utils import timezone
from datetime import timedelta
from .models import CartItemModel, OrderModel
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django.db.models import F
from django.db.models import Sum


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def cart_view(request):
    if request.method == 'POST':
        # Assuming you have a form to add items to the cart
        product_id = request.data['product_id']
        quantity = int(request.data['quantity'])
        product = ProductModel.objects.get(pk=product_id)
        seller = request.user

        if product.quantity >= quantity:
            # Check if the item already exists in the cart
            cart_item = CartItemModel.objects.filter(product=product, seller=seller, sold=False).first()

            if cart_item:
                # Update the quantity of the existing cart item
                cart_item.quantity += quantity
                cart_item.save()
            else:
                # Create a new cart item
                cart_item = CartItemModel.objects.create(
                    seller=seller,
                    product=product,
                    quantity=quantity
                )

            # Update the product quantity
            product.quantity -= quantity
            product.save()
            return Response({'message': f"`{product.name}` has been added to the box"}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': "Inefficient Quantity"}, status=status.HTTP_204_NO_CONTENT)


class CartListAPIView(ListAPIView):
    queryset = CartItemModel.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CartItemModel.objects.filter(seller=user, sold=False)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def cart_delete(request):
    cartID = request.data['cartId']
    cartItem = CartItemModel.objects.get(id=cartID)
    if not cartItem.sold:
        product = ProductModel.objects.get(id=cartItem.product.id)
        product.quantity += cartItem.quantity
        product.save()
        cartItem.delete()
        return Response({"success": "Successfully removed!"})
    return Response({"Failed": "Product is already sold!"})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def order_view(request):
    if request.method == 'POST':
        # Assuming you have a form to create an order
        name = request.data['baler_customer']
        phone_number = request.data['phone']
        payment_method = request.data['payment_method']

        seller = request.user
        cart_items = CartItemModel.objects.filter(seller=seller, sold=False)

        if len(cart_items) > 0:
            for item in cart_items:
                if item.product.quantity <= item.product.minimum_alert_quantity:
                    StockAlertModel.objects.create(
                        product=item.product,
                    )

            # Check if the customer already exists
            customer, created = CustomerProfile.objects.get_or_create(phone_number=phone_number,
                                                                      defaults={'name': name})

            # Calculate the total price
            total_price = sum(item.product.minimum_selling_price * item.quantity for item in cart_items)

            # Create the order
            order = OrderModel.objects.create(
                seller=seller,
                customer=customer,
                payment_method=payment_method,
                total_price=total_price
            )
            order.items.add(*cart_items)
            order.save()
            for i in cart_items:
                i.sold = True
                i.save()

            order_data = {
                'id': order.id,
                'seller': order.seller.id,
                'customer': order.customer.id,
                'total_price': order.total_price,
                'payment_method': payment_method,
                'items': [{'product': item.product.id, 'quantity': item.quantity} for item in order.items.all()]
            }
            return Response(order_data, status=status.HTTP_201_CREATED)

        return Response({"failed": "No Item Found in the box"}, status=status.HTTP_400_BAD_REQUEST)


class StockAlertListAPIView(ListAPIView):
    serializer_class = StockAlertSerializer
    queryset = StockAlertModel.objects.all()


class CustomerProfileListAPIView(generics.ListAPIView):
    serializer_class = CustomerProfileSerializer
    queryset = CustomerProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class OrderListAPIView(ListAPIView):
    queryset = OrderModel.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = OrderModel.objects.filter(seller=request.user).order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SingleOrderAPIView(generics.RetrieveAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_fields = 'id'

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_value = self.kwargs.get(self.lookup_fields)
        obj = queryset.get(id=lookup_value)
        serializer = self.get_serializer(obj, many=False)
        return Response(serializer.data, status=status.HTTP_306_RESERVED)


class NearExpiryProductListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Calculate the threshold date for near expiry
        threshold_date = timezone.now() + timedelta(days=30)  # Adjust the number of days as needed

        # Retrieve the products with expiry date near to end
        products = ProductModel.objects.filter(expiry_date__lte=threshold_date)

        # Serialize the products
        serializer = ProductModelSerializer(products, many=True)

        return Response(serializer.data)


class LowStockProductAPIView(generics.ListAPIView):
    serializer_class = ProductModelSerializer

    def get_queryset(self):
        return ProductModel.objects.filter(quantity__lte=F('minimum_alert_quantity'))


class PurchasedProductAPIListView(generics.ListAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        update_date = self.request.query_params.get('update_date')
        if update_date:
            queryset = queryset.filter(update_at__date=update_date)
        else:
            created_at = self.request.query_params.get('created_at')
            if created_at:
                queryset = queryset.filter(created_at__date=created_at)

        return queryset


class CustomerReportListAPIView(ListAPIView):
    queryset = CustomerProfile.objects.annotate(total_price=Sum('ordermodel__total_price')).order_by('-total_price')
    serializer_class = CustomerProfileSerializer
    permission_classes = [IsAuthenticated]


class SalesmanProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = SalesmanProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.salesmanprofile

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class CreateSalesmanProfileAPIView(APIView):
    def post(self, request, format=None):
        serializer = SalesmanProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            profile = serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
