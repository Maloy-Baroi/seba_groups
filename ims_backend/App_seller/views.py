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
from .models import OrderModel, CustomerProfile
from .serializers import *


# Create your views here.
from django.shortcuts import render, redirect
from .models import CartItemModel, OrderModel
from rest_framework.generics import ListAPIView


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

        seller = request.user
        cart_items = CartItemModel.objects.filter(seller=seller, sold=False)

        if len(cart_items)>0:
            for item in cart_items:
                if item.product.quantity <= item.product.minimum_alert_quantity:
                    StockAlertModel.objects.create(
                        product=item.product,
                    )

            # Check if the customer already exists
            customer, created = CustomerProfile.objects.get_or_create(phone_number=phone_number, defaults={'name': name})

            # Calculate the total price
            total_price = sum(item.product.minimum_selling_price * item.quantity for item in cart_items)

            # Create the order
            order = OrderModel.objects.create(
                seller=seller,
                customer=customer,
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

