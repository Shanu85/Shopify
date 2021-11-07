from django.contrib import admin

from .models import Order, receiverInfo


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('user', 'code', 'total_price', 'shipping_status', 'created_at')
    list_display_links = ('user',)
    list_editable = ('shipping_status',)
    list_filter = ('shipping_status', 'payment_mode', 'created_at')
    list_per_page = 25
    search_fields = ('user__phone_number', 'user__email', 'code')
    readonly_fields = ('user','cart', 'reciver', 'payment_mode', 'shipping_status', 'code')

    def total_price(self, obj):
        return obj.cart.total_price

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_save_and_continue'] = False
        extra_context['show_save'] = False
        return super(OrderAdmin, self).changeform_view(request, object_id, extra_context=extra_context)


#@admin.register(ReciverInfo)
class ReciverInfoAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'full_name', 'phone_number', 'address', 'created_at')
    list_display_links = ('id', 'full_name')
    list_filter = ('created_at',)
    list_per_page = 25
    search_fields = ('full_name', 'phone_number', 'address')
    readonly_fields = ('full_name', 'phone_number', 'address')
