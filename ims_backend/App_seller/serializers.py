from rest_framework import serializers
from App_seller.models import *
from App_login.serializers import UserSerializers


class SalesmanProfileSerializer(serializers.ModelSerializer):
    user = UserSerializers()
    photo = serializers.ImageField()
    NID_front_photo = serializers.ImageField()
    NID_back_photo = serializers.ImageField()

    class Meta:
        model = SalesmanProfile
        fields = ('id', 'user', 'employee_id', 'nid', 'photo', 'NID_front_photo',
                  'NID_back_photo', 'permanent_address', 'present_address', 'salary',
                  'personal_contact', 'emergency_contact', 'is_active')


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItemModel
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = OrderModel
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = OrderModel.objects.create(**validated_data)

        for item_data in items_data:
            CartItemModel.objects.create(order=order, **item_data)

        return order
