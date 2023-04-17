from rest_framework import serializers
from .models import Category, SubCategory, Brand, Shelf, ProductModel


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# SubCategory Serializer
class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


# Brand Serializer
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


# Shelf Serializer
class ShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = '__all__'


# ProductModel Serializer
class ProductModelSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category')
    sub_category = serializers.CharField(source='get_sub_category')
    brand = serializers.CharField(source='get_brand')
    shelf = serializers.CharField(source='get_shelf')

    class Meta:
        model = ProductModel
        fields = '__all__'

    def create(self, validated_data):
        category_name = validated_data.pop('get_category')
        sub_category_name = validated_data.pop('get_sub_category')
        brand_name = validated_data.pop('get_brand')
        shelf_number = validated_data.pop('get_shelf')

        my_shelf = shelf_number.split(", ")
        shelf_no = my_shelf[0]
        row_no = my_shelf[1]
        column_no = my_shelf[2]

        category = Category.objects.get(name=category_name)
        sub_category = SubCategory.objects.get(name=sub_category_name)
        brand = Brand.objects.get(name=brand_name)
        shelf = Shelf.objects.get(number=shelf_no, row=row_no, column=column_no)

        product_model = ProductModel.objects.create(
            category=category,
            sub_category=sub_category,
            brand=brand,
            shelf=shelf,
            **validated_data
        )

        return product_model

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        sub_category_data = validated_data.pop('sub_category', None)
        brand_data = validated_data.pop('brand', None)
        shelf_data = validated_data.pop('shelf', None)

        if category_data:
            category = Category.objects.create(**category_data)
            instance.category = category

        if sub_category_data:
            sub_category = SubCategory.objects.create(**sub_category_data)
            instance.sub_category = sub_category

        if brand_data:
            brand = Brand.objects.create(**brand_data)
            instance.brand = brand

        if shelf_data:
            shelf = Shelf.objects.create(**shelf_data)
            instance.shelf = shelf

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance