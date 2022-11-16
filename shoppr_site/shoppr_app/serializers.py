from rest_framework import serializers
from .models import Product, WishListItem


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'store', 'name', 'image_url', 'url', 'standard_price', 'sales_price', 'unit_discount')


class WishlistItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WishListItem
        fields = ('id', 'user', 'product')