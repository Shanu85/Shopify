from django.core.exceptions import ValidationError
from rest_framework import generics
from rest_framework import response
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, logout, login, update_session_auth_hash
from rest_framework import views, permissions
from rest_framework.response import Response
from rest_framework import status
from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice

from . import serializers

User = get_user_model()


class RegisterView(generics.GenericAPIView):
    serializer_class = serializers.RegisterSerializer
    def post(self, request, *args, **kwargs):

        if (request.data['user_type'] == 'Admin'):
            return Response('Not anymore', status=HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user = serializers.UserSerializer(
            user, context=self.get_serializer_context()).data
        return Response(user)


class LoginView(generics.GenericAPIView):
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user = serializers.UserSerializer(
            user, context=self.get_serializer_context()).data
        return Response(user)


class DeleteView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        user  = request.user
        temp = user
        if(user.isAuthenticated==False):
            user.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response("Smarty Pants! You are not allowed to be deleted", status=HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = serializers.ChangePasswordSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            update_session_auth_hash(request, self.object)
            return Response("Password changed successfully.")
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


def get_user_totp_device(self, user, confirmed=None):
    devices = devices_for_user(user, confirmed=confirmed)
    for device in devices:
        if isinstance(device, TOTPDevice):
            return device


class TOTPCreateView(views.APIView):
    permission_classes = (IsAuthenticated,)
    """
    Use this endpoint to set up a new TOTP device
    """
    def get(self, request, format=None):
        user = request.user
        # print(user)
        device = get_user_totp_device(self, user)
        if not device:
            device = user.totpdevice_set.create(confirmed=False, name = user.email)
        url = device.config_url
        # print(url)
        if(user.isAuthenticated==False):
            return Response(url, status=status.HTTP_201_CREATED)    
        return Response("Smarty Pants! We are not dumb.",status=status.HTTP_201_CREATED)


class TOTPVerifyView(APIView):
    """
    Api to verify/enable a TOTP device
    """
    permission_classes = (IsAuthenticated, )
    def post(self, request, token, format=None):
        user = request.user
        device = get_user_totp_device(self, user)
        if not device:
            return Response(dict(
           errors=['This user has not setup two factor authentication']),
                status=HTTP_400_BAD_REQUEST
            )
        if not device == None and device.verify_token(token):
            if not device.confirmed:
                device.confirmed = True
                device.save()
                # print(user)
                # print(device)
                user.isAuthenticated = True
                user.save()
            # print(user)
            return Response(True, status=status.HTTP_200_OK)
            # return Response(dict(token=user.token), status=HTTP_200_OK)
        if user.isAuthenticated == True:
            logout(request)
        return Response(dict(errors=dict(token=['Invalid TOTP Token'])), status=HTTP_400_BAD_REQUEST)