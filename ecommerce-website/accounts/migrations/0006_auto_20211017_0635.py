# Generated by Django 2.2.10 on 2021-10-17 06:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20211017_0611'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='user',
            unique_together={('phone_number', 'user_type')},
        ),
    ]
