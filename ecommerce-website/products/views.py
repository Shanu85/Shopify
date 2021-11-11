from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .serializers import ProductListSerializer, ProductDetailSerializer, ProductSellerSerializer, ProductAddSerializer, ProductUpdateSerializer,  ProductFrontendSerializer
from .models import Product
from .pagination import ProductPagination
from .filters import ProductFilter
from . import serializers
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, logout, login, update_session_auth_hash
from django.core.cache import cache

User = get_user_model()

class ProductListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    pagination_class = ProductPagination
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('title', 'description')
    filterset_class = ProductFilter

    def get_queryset(self):
        queryset = Product.objects.filter(status=True)
        available = self.request.query_params.get('available', None)
        if available is not None and available == 'true':
            queryset = Product.objects.available_products()
        ordering = self.request.query_params.get('ordering', None)
        if ordering is not None and ordering == "max_price":
            queryset = queryset.order_by('-price')
        if ordering is not None and ordering == "min_price":
            queryset = queryset.order_by('price')
        if ordering is not None and ordering == "best_seller":
            queryset = queryset.order_by('-sale_count')

        return queryset


class ProductSellerView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    # queryset = Product.objects.all()
    serializer_class = ProductSellerSerializer
    cache.clear()

    def get_queryset(self):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return Response("Invalid user type")
        return Product.objects.all().filter(user=user)


class ProductAddView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    #queryset = Product.objects.all()
    serializer_class = ProductAddSerializer
    cache.clear()

    def get_queryset(self):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return Response("Invalid user type")
        return Product.objects.all().filter(user=user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data.dict())
        serializer.is_valid(raise_exception=True)
        if int(request.data['sale_count']) < 0 or float(request.data['price']) < 50 or float(request.data['discount_price']) < 50 or float(request.data['discount_price']) > float(request.data['price']):
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        if(self.request.user.user_type=='Buyer'):
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        user = self.request.user
        data = request.data
        sizes = data.get('size', '')
        if(sizes=='S'):
            sizes = [1]
        elif(sizes=='M'):
            sizes = [3]
        elif(sizes=='L'):
            sizes = [2]
        elif(sizes=='XL'):
            sizes = [4]
        elif(sizes=='XXL'):
            sizes = [5]
        elif(sizes=='XXXL'):
            sizes = [6]
        elif(sizes=='4XL'):
            sizes = [7]
        elif(sizes=='FREE SIZE'):
            sizes = [8]
        else:
            sizes = [9]

        object = self.get_object
        product = Product.objects.create(user=user, title=data['title'], photo_main=data['photo_main'], photo_1=data['photo_1'], photo_2=data['photo_2'],
            description=data['description'], price=data['price'], proposal=data['proposal'],
            sale_count=data['sale_count'], discount_price=data['discount_price'])
        for size in sizes:
            product.sizes.add(size)
        return self.list(request, *args, **kwargs)


class DeleteProductSellerView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ProductSellerSerializer
    cache.clear()
    #Product.objects.all().filter(id=data['id']).delete()
    def get(self,request,id):
        user = self.request.user
        
        seller_products = []
        products = Product.objects.all().filter(user=user)
        a = False
        for product in products:
            if(int(id)==int(product.id)):
                a = True
            seller_products.append(product)

        if(user.user_type=='Buyer'):
            return Response("You don't have the authorizations.")
        if(not a):
            return Response("Product does not exist")
        pro_object = Product.objects.get(id=id)
        pro_object.delete()
        return Response('Deleted')


class UpdateProductSellerView(ListAPIView):
    cache.clear()
    serializer_class = ProductUpdateSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return Response("Invalid user type")
        return Product.objects.all().filter(user=user)

    def post(self, request, id):
        user = self.request.user
        # print(request.data)
        # print(user)
        if int(request.data['sale_count']) < 0 or float(request.data['price']) < 50 or float(request.data['discount_price']) < 50 or float(request.data['discount_price']) > float(request.data['price']):
            return Response("Bro, just leave it.")
        seller_products = []
        products = Product.objects.all().filter(user=user)
        for product in products:
            seller_products.append(product)
        # print(seller_products)
        if(user.user_type=='Buyer' or seller_products.count(Product.objects.get(id=id))==0):
            return Response("You don't have the authorizations.")
        obj = Product.objects.get(id=id)

        serializer = self.get_serializer(instance=obj, data=request.data)
        if serializer.is_valid():
            # print("YES SAVED")
            serializer.save()
        # print(serializer.errors)
        return Response(serializer.data)


class ProductDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class ProductFrontendView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    #queryset = Product.objects.all()
    serializer_class = ProductFrontendSerializer
    cache.clear()

    def get_queryset(self):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return Response("Invalid user type")

        return Product.objects.all().filter(user=user)