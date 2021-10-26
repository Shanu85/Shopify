from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .serializers import ProductListSerializer, ProductDetailSerializer, ProductSellerSerializer, ProductUpdateSerializer
from .models import Product
from .pagination import ProductPagination
from .filters import ProductFilter
from . import serializers
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, logout, login, update_session_auth_hash
from django.core.cache import cache

User = get_user_model()

class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    pagination_class = ProductPagination
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('title', 'description')
    filterset_class = ProductFilter

    def get_queryset(self):
        queryset = Product.objects.all()
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
            return {}
        
        #print(user.user_type)
        return Product.objects.all().filter(user=user)


class ProductAddView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    #queryset = Product.objects.all()
    serializer_class = ProductUpdateSerializer
    cache.clear()

    def get_queryset(self):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return {}
        
        #print(user.user_type)
        return Product.objects.all().filter(user=user)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data.dict())
        serializer.is_valid(raise_exception=True)
        if(self.request.user.user_type=='Buyer'):
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        user = self.request.user
        data = request.data
        sizes = data.get('sizes', [])
        #print("Tunak tunak tun",sizes)
        object = self.get_object
        product = Product.objects.create(user=user, title=data['title'], photo_main=data['photo_main'], photo_1=data['photo_1'], photo_2=data['photo_2'],
            description=data['description'], price=data['price'],
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
        if(user.user_type=='Buyer'):
            return Response("You don't have the authorizations.")
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
            return {}
        return Product.objects.all().filter(user=user)

    def post(self, request, id):
        user = self.request.user
        if(user.user_type=='Buyer'):
            return Response("You don't have the authorizations.")
        obj = Product.objects.get(id=id)

        serializer = self.get_serializer(instance=obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'