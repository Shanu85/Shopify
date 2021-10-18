from rest_framework import serializers

from .models import Address1

class AddressSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Address1
        fields = '__all__'
        read_only_fields = ('user',)




