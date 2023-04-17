from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Shelf(models.Model):
    number = models.CharField(max_length=10)
    row = models.CharField(max_length=10)
    column = models.CharField(max_length=10)

    def __str__(self):
        return f"Shelf: {self.number}, Row: {self.row}, Column: {self.column}"


# Product Model
class ProductModel(models.Model):
    product_id = models.PositiveBigIntegerField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    bought_price = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    type = models.CharField(max_length=255, default="Tablet")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_name')  # Generic Name
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='sub_category_name')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='brand_name')
    shelf = models.ForeignKey(Shelf, on_delete=models.CASCADE, related_name='shelf_number', blank=True, null=True)
    unit = models.CharField(max_length=255)
    minimum_alert_quantity = models.PositiveIntegerField()
    expiry_date = models.DateField()
    status = models.BooleanField(default=True)
    imported = models.BooleanField(default=False)
    importer = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    def get_category(self):
        return self.category.name

    def get_brand(self):
        return self.brand.name

    def get_sub_category(self):
        return self.sub_category.name

    def get_shelf(self):
        if self.shelf:
            return f"{self.shelf.number}, {self.shelf.row}, {self.shelf.column}"
        else:
            return f"0, 0, 0"



