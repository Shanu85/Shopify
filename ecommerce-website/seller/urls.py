from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('addresses', views.AddressViewSet, base_name='addresses')

urlpatterns = [
    path('', views.UserView.as_view(), name='user'),
    
]

urlpatterns += router.urls
