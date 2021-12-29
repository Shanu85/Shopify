from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_200_OK

from .models import Cart
from .serializers import CartSerializer, CartItemSerializer, AddItemToCartSerializer, ViewDummySerializer


class CartView(ModelViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        user = self.request.user
        if(user.user_type!='Buyer'):
            return Response('Smarty Boi. Try something more', status=HTTP_200_OK)
        obj, _ = Cart.objects.get_or_create(user=request.user, ordered=False)
        # Remove unavailable items from cart
        unavailable_items = obj.items.filter(product__sale_count__lte=0, product__status=False)
        if unavailable_items.exists():
            unavailable_items.delete()

        serializer = CartSerializer(obj, context={'request': request})
        return Response(serializer.data, status=HTTP_200_OK)

    def get_queryset(self):
        user = self.request.user
        # print(user_type)
        # if(user.user_type!='Buyer'):
        #     return Response('lmao', status=HTTP_200_OK)
        return self.request.user.carts.get(ordered=False).items.all()

    def get_serializer_class(self):
        user = self.request.user
        if(user.user_type!='Buyer'):
            return ViewDummySerializer
        if self.action == "create":
            return AddItemToCartSerializer
        return CartItemSerializer
