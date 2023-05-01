from rest_framework import serializers
from App_admin.models import *
from App_login.serializers import UserSerializers


class ShopManagerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)
    NID_front_photo = serializers.ImageField()
    NID_back_photo = serializers.ImageField()
    photo = serializers.ImageField()

    class Meta:
        model = ShopManagerProfile
        fields = ('id', 'user', 'employee_id', 'nid', 'NID_front_photo', 'NID_back_photo',
                  'photo', 'permanent_address', 'present_address', 'emergency_contact',
                  'status', 'joining_date')

        extra_kwargs = {
            'employee_id': {'read_only': True},
        }
