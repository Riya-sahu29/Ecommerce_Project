from django.contrib import admin
from .models import Category, Product, UserProfile, Order, OrderItem, CategoryImage

# Inline for multiple images
class CategoryImageInline(admin.TabularInline):
    model = CategoryImage
    extra = 1

#  Custom Category admin
class CategoryAdmin(admin.ModelAdmin):
    inlines = [CategoryImageInline]

# Register models
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product)
admin.site.register(UserProfile)
admin.site.register(Order)
admin.site.register(OrderItem)