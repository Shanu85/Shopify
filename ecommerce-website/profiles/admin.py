from django.contrib import admin

from .models import Address, FavoritesProducts


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'user', 'receiver_full_name',
                    'address', 'postal_code', 'created_at')
    list_display_links = ('id', 'user')
    list_filter = ('state', 'city')
    list_per_page = 25
    search_fields = (
        'user__phone_number', 'user__email',
        'receiver_full_name', 'receiver_phone_number', 'state', 'city',
        'postal_address', 'postal_code'
    )
    readonly_fields = ('receiver_full_name', 'receiver_phone_number',
                       'state', 'city', 'postal_address', 'postal_code')

    def address(self, obj):
        return f"{obj.state}, {obj.city}, {obj.postal_address}"

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super(AddressAdmin, self).changeform_view(request, object_id, extra_context=extra_context)


@admin.register(FavoritesProducts)
class FavoritesProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'products_count')
    list_display_links = ('id', 'user')
    list_filter = ('products__title',)
    list_per_page = 25
    search_fields = (
        'user__phone_number', 'user__email', 'products__title'
    )
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super(FavoritesProductsAdmin, self).changeform_view(request, object_id, extra_context=extra_context)
