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
    readonly_fields = ('user','cart', 'receiver', 'payment_mode', 'shipping_status', 'code')

    def total_price(self, obj):
        return obj.cart.total_price

    def has_add_permission(self, request):
        return False

@admin.register(receiverInfo)
class receiverInfoAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'full_name', 'phone_number', 'address', 'created_at')
    list_display_links = ('id', 'full_name')
    list_filter = ('created_at',)
    list_per_page = 25
    search_fields = ('full_name', 'phone_number', 'address')
    readonly_fields = ('full_name', 'phone_number', 'address')
