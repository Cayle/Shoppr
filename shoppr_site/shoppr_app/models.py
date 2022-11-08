from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    product_id = models.IntegerField()
    store = models.TextField()
    name = models.TextField()
    image_url = models.URLField()
    url = models.URLField()
    standard_price = models.DecimalField(decimal_places = 2, max_digits = 5)
    sales_price = models.DecimalField(decimal_places = 2, max_digits = 5)
    unit_discount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"({self.product_id}) {self.name} - {self.store}"


class WishListItem(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)


    def __str__(self):
        return f"User: {self.user} - Product: {self.product}"

