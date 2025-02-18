# Generated by Django 4.2.3 on 2024-09-13 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_invitation_expeditor_alter_invitation_message_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitation',
            name='expeditor',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='send_invitation', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='invitation',
            name='message',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='invitation',
            name='receiver',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='receive_invitation', to=settings.AUTH_USER_MODEL),
        ),
    ]
