from rest_framework import serializers
from App_admin.models import *
from App_login.serializers import UserSerializers


class SalesmanProfileSerializer(serializers.ModelSerializer):
    user = UserSerializers()
    NID_front_photo = serializers.ImageField()
    NID_back_photo = serializers.ImageField()
    photo = serializers.ImageField()

    class Meta:
        model = ShopManagerProfile
        fields = ('id', 'user', 'employee_id', 'nid', 'NID_front_photo', 'NID_back_photo',
                  'photo', 'permanent_address', 'present_address', 'emergency_contact',
                  'status', 'joining_date')
