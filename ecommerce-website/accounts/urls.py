from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('totp/create/', views.TOTPCreateView.as_view(), name='totp-create'),
    path('totp/login/<int:token>/', views.TOTPVerifyView.as_view(), name='totp-login'),
    path('user/delete/', views.DeleteView.as_view(), name='delete')
]
