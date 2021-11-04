from django.urls import path
from rest_framework import routers
from . import views


urlpatterns = [
    path('', views.ProductListView.as_view(), name='product-list'),
    path('<slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('seller/productss/', views.ProductSellerView.as_view(), name='product-seller'),
    path('seller/backproduct/', views.ProductFrontendView.as_view(), name='product-seller'),
    path('seller/add/', views.ProductAddView.as_view(), name='product-add'),
    path('del/<str:id>/', views.DeleteProductSellerView.as_view(), name='product-delete'),
    path('upd/<str:id>/', views.UpdateProductSellerView.as_view(), name='product-update')
]