# Generated by Django 4.2.3 on 2024-11-02 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0031_merge_20241031_1214'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='sup',
            field=models.BooleanField(default=False),
        ),
    ]
