from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_national_code(code):
    message = "Invalid national code."
    if len(code) != 6:
        raise ValidationError(
            _(message), params={'code': code})
    if code[0] == "0":
        raise ValidationError(
            _(message), params={'code': code})


phone_number_or_email_reg = '^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^(9|8|7)\d{9}$'
