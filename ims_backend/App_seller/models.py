from django.core.validators import RegexValidator
from django.db import models
from App_login.models import CustomUser
from App_products.models import ProductModel
from django.utils.translation import gettext_lazy as _


# Create your models here.
class SalesmanProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=10)
    nid = models.CharField(max_length=17)
    photo = models.ImageField(upload_to='profile_photos/')
    NID_front_photo = models.ImageField(upload_to='nid_photo/')
    NID_back_photo = models.ImageField(upload_to='nid_photo/')
    permanent_address = models.CharField(max_length=255)
    present_address = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    personal_contact = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    joining_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + "'s Profile"


phone_regex = RegexValidator(
    regex=r"^\+?(88)01[3-9][0-9]{8}$", message=_('Must add 880'))


class CustomerProfile(models.Model):
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=17, unique=True)


class CartItemModel(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sold = models.BooleanField(default=False)

    def get_total(self):
        return self.product.minimum_selling_price * self.quantity


class OrderModel(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItemModel)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class StockAlertModel(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return f"{self.product.name}"


class ExpiryAlertModel(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.product.name}"

