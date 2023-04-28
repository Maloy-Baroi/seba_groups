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
from django.shortcuts import render, redirect
from .models import CartItemModel, OrderModel

def cart_view(request):
    if request.method == 'POST':
        # Assuming you have a form to add items to the cart
        product_id = request.POST['product_id']
        quantity = int(request.POST['quantity'])
        product = ProductModel.objects.get(pk=product_id)
        seller = request.user

        # Check if the item already exists in the cart
        cart_item = CartItemModel.objects.filter(product=product, seller=seller).first()

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

    # Get all cart items for the current seller
    cart_items = CartItemModel.objects.filter(seller=request.user)

    return render(request, 'cart.html', {'cart_items': cart_items})

def order_view(request):
    if request.method == 'POST':
        # Assuming you have a form to create an order
        customer = request.user.customerprofile
        seller = request.user
        cart_items = CartItemModel.objects.filter(seller=seller)

        # Calculate the total price
        total_price = sum(item.product.price * item.quantity for item in cart_items)

        # Create the order
        order = OrderModel.objects.create(
            seller=seller,
            customer=customer,
            total_price=total_price
        )

        # Add the cart items to the order
        order.items.set(cart_items)
        order.save()

        # Clear the cart after creating the order
        cart_items.delete()

        return redirect('order_success')  # Redirect to a success page after creating the order

    return render(request, 'order.html')

