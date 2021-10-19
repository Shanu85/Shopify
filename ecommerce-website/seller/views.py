from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from accounts.serializers import UserSerializer
from .serializers import AddressSerializer1
from .models import Address1

User = get_user_model()


class UserView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer1
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Address1.objects.all().filter(user=self.request.user)

    def perform_create(self, serailizer):
        serailizer.save(user=self.request.user)