# Generated by Django 4.2 on 2023-04-09 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("App_products", "0005_productmodel_importer"),
    ]

    operations = [
        migrations.AlterField(
            model_name="productmodel",
            name="importer",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
