from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path('', views.ProductListView.as_view(), name='product-list'),
    path('<slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('seller/product/', views.ProductSellerView.as_view(), name='product-seller')
]
