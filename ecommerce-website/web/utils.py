import string
import random
from django.core.management.utils import get_random_secret_key


def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
