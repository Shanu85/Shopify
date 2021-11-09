from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import RegexValidator
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.utils import timezone
from .validators import validate_national_code


class UserMananger(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Users must have an phone number")

        if extra_fields.get('email'):
            extra_fields['email'] = self.normalize_email(extra_fields['email'])
        user = self.model(
            phone_number=phone_number,
            **extra_fields
        )        
        user.set_password(password)
        user.save(using=self._db)
        # print(user)
        return user

    def create_superuser(self, phone_number, password):
        user = self.create_user(
            password=password,
            phone_number=phone_number
        )
        user.is_admin = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address", max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=10, unique=True, validators=[
        RegexValidator('^(9|8|7)\d{9}$', message="Invalid phone number.")])
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    national_code = models.CharField(
        validators=[validate_national_code], blank=True, null=True, max_length=6)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    last_login=models.DateTimeField(null=True,blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    user_type = models.CharField(max_length=50,null=True, blank=True)
    pay_balance = models.IntegerField(default=False)
    isAuthenticated = models.BooleanField(default=False)

    objects = UserMananger()

    USERNAME_FIELD = 'phone_number'

    class Meta:
        ordering = ('-date_joined', )

    def __str__(self):
        return self.phone_number

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def username(self):
        return self.phone_number

    @property
    def paybalance(self):
        return self.pay_balance



# reset password signal
# TODO: send real email in production
# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#     print(reset_password_token.key)