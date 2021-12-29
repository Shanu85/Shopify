from django.contrib import admin
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from profiles.models import FavoritesProducts, Address
from accounts.models import User
from products.models import Product
from carts.models import Cart
from orders.models import Order
from django.contrib import messages
from django.shortcuts import redirect

from .models import User


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = ('phone_number',)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = '__all__'

    def clean_password(self):
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('id', 'phone_number', 'email', 'full_name')
    list_display_links = ('id', 'phone_number')
    list_filter = ('user_type',)
    readonly_fields = ('id', 'phone_number', 'email', 'full_name')
    fieldsets = (
        (None, {'fields': ('phone_number', 'password')}),
        ('Personal info', {'fields': ('email', 'first_name', 'last_name', 'national_code')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2')}
         ),
    )
    search_fields = ('email', 'first_name', 'last_name', 'phone_number')
    ordering = ('phone_number',)
    filter_horizontal = ()

    def has_add_permission(self, request):
        return False

    # def has_delete_permission(self, request, obj=None):
    #     return False

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super(UserAdmin, self).changeform_view(request, object_id, extra_context=extra_context)

    def has_delete_permission(self, request, obj=id):       
        return True

    def delete_view(self, request, object_id, form_url='', extra_context=None):
        user = User.objects.get(id=object_id)
        if(user.user_type=='Admin'):
            messages.error(request, 'Admin cannot be deleted')
            return redirect('/admin/accounts/user/')

        address = Address.objects.filter(user=user).all()
        fav = FavoritesProducts.objects.filter(user=user).all()
        prod = Product.objects.filter(user=user).all()
        carts = Cart.objects.filter(user=user).all()
        orders = Order.objects.filter(user=user).all()
        for add in address:
            add.delete()
        for pro in fav:
            pro.delete()
        for order in orders:
            order.delete()
        for cart in carts:
            cart.delete()
        for pro in prod:
            pro.delete()
        user.delete()
        messages.add_message(request, messages.INFO, 'User deleted')
        return redirect('/admin/accounts/user/')
        

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)

admin.site.site_url="/admin/"