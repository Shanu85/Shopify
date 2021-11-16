from rest_framework import serializers
from django.db.models import F

from .models import Order, receiverInfo
from carts.models import Cart
from carts.serializers import CartSerializer
from products.serializers import ProductUpdateSerializer
from products.models import Product
from carts.models import CartItem
from accounts.models import User


class receiverInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = receiverInfo
        fields = '__all__'


class OrderListSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    items_count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'created_at', 'total_price', 'code',
                  'items_count', 'shipping_status', 'payment_mode')

    def get_total_price(self, obj):
        total_price = 0
        for item in obj.cart.items.all():
            total_price += item.total_price
        return total_price

    def get_items_count(self, obj):
        return obj.cart.items.all().count()


class OrderDetailSerializer(serializers.ModelSerializer):
    cart = CartSerializer()
    receiver = receiverInfoSerializer()

    class Meta:
        model = Order
        fields = '__all__'

class OrderFilterSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    total_price = serializers.CharField(max_length=200)
    quantity = serializers.CharField(max_length=200)
    payment_mode = serializers.CharField(max_length=200)
    date = serializers.CharField(max_length=200)
    location = serializers.CharField(max_length=200)

# class OrderFilterSerializer(serializers.Serializer):
#     class Meta:
#         read_only_fields = '__all__'

#     def create(self, data):
#         return False

# exclude = ('code',)

class CreateOrderSerializer(serializers.ModelSerializer):
    receiver = receiverInfoSerializer()

    class Meta:
        model = Order
        exclude = ()
        read_only_fields = (
            'shipping_status', 'cart', 'user',
            'shipping_method',
        )

    def create(self, data):
        user = self.context.get('request').user
        cart = user.carts.get(ordered=False)
        # Validate cart
        if cart.items.all().exists() == False:
            raise serializers.ValidationError("Cart must not be empty")
        # Update products sale count
        for item in cart.items.all():
            if(item.product.sale_count-item.quantity<0):
                return None
            Product.objects.filter(id=item.product.id).update(
                sale_count=F('sale_count') - item.quantity
            )
        # Create reaciver info model
        receiver_info = receiverInfo.objects.create(**data.get('receiver'))
        code=data.get('code',None)
        # Create order model
        cart.ordered = True

        for item in cart.items.all():
            seller_pro = item.product.user
            seller_pro.pay_balance += item.total_price
            seller_pro.save()
        
        cart.save()
        order = Order.objects.create(
            user=user, cart=cart, receiver=receiver_info,code=code,
            payment_mode = data.get('payment_mode'), shipping_status="Preparation"
        )
        # Create another cart model with ordered=False
        Cart.objects.create(user=user)

        return order
