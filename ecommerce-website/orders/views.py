from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from .models import Order
from .serializers import OrderListSerializer, CreateOrderSerializer, OrderDetailSerializer, OrderFilterSerializer
from products.models import Product
from accounts.models import User
from carts.models import Cart
from carts.models import CartItem


class OrderListView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user  = self.request.user
        if(user.user_type!='Buyer'):
            return []
        return self.request.user.orders.all()

    def get_serializer_class(self):
        user  = self.request.user
        if self.request.method == "POST":
            if(user.user_type!='Buyer'):
                return OrderFilterSerializer
            return CreateOrderSerializer
        return OrderListSerializer


class OrderDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderDetailSerializer

    def get_queryset(self):
        user  = self.request.user
        if(user.user_type!='Buyer'):
            return []
        return self.request.user.orders.all()


class OrderFilterView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderFilterSerializer


    def get_queryset(self):
        user = self.request.user
        if(user.user_type!='Seller'):
            return []
        users = User.objects.filter(user_type='Buyer').all()
        ordersall = []
        ides=[]
        user = self.request.user
        # print(user.id)
        products = Product.objects.filter(user=user)
        # print(products)
        for product in products:
            ides.append(product.id)
        # print(ides)
        for user in users:
            orders = user.orders.all()
            # print(orders)
            # print(user.id, orders.count())
            for order in orders:
                item = CartItem.objects.get(id=order.id)
                # print(item)
                # print(item.product.title)
                if(item.product.id in ides):
                    # print(item.product.title)
                    ordersall.append({'title':item.product.title, 'quantity':item.quantity, 'total_price': item.total_price, 'payment_mode':order.payment_mode, 'date':order.created_at, 'location':order.receiver.address})
        
        # print(ordersall)
        return ordersall


