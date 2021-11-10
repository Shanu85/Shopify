from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate, login
from django.core.validators import RegexValidator

from .validators import phone_number_reg

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    cart_items_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('password', 'is_admin', 'is_active')
        read_only_fields = ('isAuthenticated','pay_balance','last_login', 'user_type', 'phone_number')

    def get_cart_items_count(self, obj):
        return obj.carts.get(ordered=False).items.count()


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone_number', 'email', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Login user (set session)
        login(self.context.get('request'), user,
              backend='django.contrib.auth.backends.ModelBackend')
        return user


class LoginSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(validators=[
        RegexValidator(
            phone_number_reg,
            message="Invalid phone number."
        )
    ])

    class Meta:
        model = User
        fields = ('id', 'phone_number', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """Return user by phone number"""

        user = authenticate(
            phone_number=data['phone_number'],
            password=data['password']
        )

        if user:
            userData = UserSerializer(user).data
            if userData['user_type'] == data['user_type']: 
                # Login user (set session)
                login(self.context.get('request'), user)
                # print(data['user_type'])
                return user
            raise serializers.ValidationError("Incorrect Credentials")
        raise serializers.ValidationError("Incorrect Credentials")


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
