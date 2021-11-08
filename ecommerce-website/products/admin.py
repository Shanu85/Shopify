from django.contrib import admin

from .models import Product, Size


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'title', 'price', 'discount_price', 'available', 'active', 'sale_count', 'created_at', 'status')
    list_display_links = ('id', 'title')
    list_editable = ('active',)
    list_filter = ('active', 'created_at')
    list_per_page = 25
    readonly_fields = ('id', 'title', 'price', 'discount_price','sale_count', 'created_at','user','photo_main', 'photo_1', 'photo_2', 'photo_3', 'photo_4', 'description', 'sizes', 'colors', 'proposal')
    search_fields = ('title', 'price', 'description')

    def has_add_permission(self, request):
        return False


#@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'size', 'waist_min_size',
                    'height_min_size', 'available_count')
    list_display_links = ('id', '__str__')
    list_editable = ('size', 'waist_min_size',
                     'height_min_size', 'available_count')
    list_filter = ('size', "height_min_size")
    list_per_page = 25
    search_fields = ('size', 'waist_min_size',
                     'height_min_size', "hip_min_size" 'available_count')
