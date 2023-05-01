# Generated by Django 4.2 on 2023-04-30 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("App_products", "0010_alter_productmodel_barcode_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductConsumptionTypeModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("type_name", models.CharField(max_length=255)),
            ],
        ),
    ]
