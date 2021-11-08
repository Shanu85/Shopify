from django.contrib import admin

from .models import Address1


# @admin.register(Address1)
class AddressAdmin1(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'user', 'receiver_full_name',
                    'address', 'postal_code', 'created_at')
    list_display_links = ('id', 'user')
    list_filter = ('user', 'state', 'city')
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







