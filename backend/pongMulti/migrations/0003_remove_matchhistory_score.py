# Generated by Django 4.2.3 on 2024-10-10 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pongMulti', '0002_matchhistory_delete_room'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchhistory',
            name='score',
        ),
    ]
