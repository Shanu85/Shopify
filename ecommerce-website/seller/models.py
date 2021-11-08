from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

from products.models import Product

User = get_user_model()

class Address1(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    receiver_full_name = models.CharField(max_length=120)
    receiver_phone_number = models.CharField(max_length=11, validators=[
        RegexValidator('^(9|8|7)\d{9}$', message="Invalid phone number.")])
    state = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    postal_address = models.TextField()
    postal_code = models.CharField(max_length=6, validators=[RegexValidator(
        '^((?!(0))[0-9]{6,6})$', message="Invalid postal code")])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Addresses'
        ordering = ('-created_at', )

    def __str__(self):
        return self.user.username