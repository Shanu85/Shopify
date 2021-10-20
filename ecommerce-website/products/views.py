from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import ProductListSerializer, ProductDetailSerializer, ProductSellerSerializer
from .models import Product
from .pagination import ProductPagination
from .filters import ProductFilter
from django.contrib.auth import get_user_model, logout, login, update_session_auth_hash

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
    #queryset = Product.objects.all()
    serializer_class = ProductSellerSerializer

    def get_queryset(self):
        user = self.request.user
        return Product.objects.all().filter(user=user)


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'

    
