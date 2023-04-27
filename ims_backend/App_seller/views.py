from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from App_login.models import CustomUser
from .models import OrderModel, CustomerProfile
from .serializers import OrderModelSerializer


# Create your views here.
class OrderModelListCreateView(generics.ListCreateAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def oderListCreate(request):
    json_value = request.data['products_n_quantity']
    print(json_value)
    seller = request.user
    phone = request.data['phone_number']
    customer_has = CustomerProfile.objects.filter(phone_number=phone)
    if customer_has.exists():
        customer = customer_has[0]
    else:
        customer = CustomerProfile(name=request.data['customerName'], phone_number=phone)
        customer.save()
    total_price = request.data['totalPrice']
    order = OrderModel(products_n_quantity=json_value, seller=seller, customer=customer, totalPrice=total_price)
    order.save()
    return Response({"success": "Successfully sold!"}, status=status.HTTP_201_CREATED)
