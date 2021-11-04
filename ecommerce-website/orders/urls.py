from django.urls import path

from . import views

urlpatterns = [
    path('', views.OrderListView.as_view(), name="orders"),
    path('<int:pk>/', views.OrderDetailView.as_view(), name="orders-detail"),
    path('orderfilter/seller/', views.OrderFilterView.as_view(), name="orders-filter-seller"),
]
