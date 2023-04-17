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


class OrderModelSerializer(serializers.ModelSerializer):
    customer = CustomerProfileSerializer()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderModel
        fields = ['id', 'products_n_quantity', 'seller', 'customer', 'total_price']

    def get_total_price(self, obj):
        return obj.get_total()
