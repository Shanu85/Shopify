from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


# from django.conf.urls import url, include
# from django.contrib import admin

# from django_otp.admin import OTPAdminSite

# class OPTAdmin(OTPAdminSite):
#     pass

# from django.contrib.auth.models import User
from django_otp.plugins.otp_totp.models import TOTPDevice

# admin_site = OTPAdmin(name='OTPAdmin')
# admin_site.register(User)
# admin_site.unregister(TOTPDevice)
admin.site.unregister(TOTPDevice)


from django_otp.admin import OTPAdminSite
  
admin.site.__class__ = OTPAdminSite

urlpatterns = [
    # path('dadmin/', admin.site.urls),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    # path('api/auth/reset-password/', include('django_rest_passwordreset.urls')),
    path('api/user/', include('profiles.urls')),
    path('api/seller/', include('seller.urls')),
    path('api/cart/', include('carts.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/products/', include('products.urls')),
    path('service-worker.js', (TemplateView.as_view(template_name="static/service-worker.js", content_type='application/javascript'))),
]

# Media urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns.append(
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')))