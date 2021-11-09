from django.db import models
from django.contrib.auth import get_user_model

from carts.models import Cart
from web.utils import id_generator

User = get_user_model()


class receiverInfo(models.Model):
    full_name = models.CharField(max_length=125)
    phone_number = models.CharField(max_length=11)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="orders")
    cart = models.ForeignKey(Cart, on_delete=models.DO_NOTHING)
    receiver = models.ForeignKey(receiverInfo, on_delete=models.DO_NOTHING)
    payment_mode = models.CharField(max_length=50)
    shipping_status = models.CharField(max_length=50)
    code = models.CharField(max_length=100, null=True,  unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f"{self.user} - {self.code}"

    def save(self, *args, **kwargs):
        if self.payment_mode == "Cash On Delievery":
            self.code = id_generator()
        super(Order, self).save(*args, **kwargs)
