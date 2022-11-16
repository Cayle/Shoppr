from django.urls import path

from . import views

app_name = "shoppr_app" 

urlpatterns = [
    path('', views.index, name='index'),
    path('shop', views.shop, name='shop'),
    path('search/<str:search_word>', views.search_json, name='search'),
    path('base', views.base, name='base'),
    path('register', views.register, name='register'),
    path('login', views.login_request, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('wishlists/<int:user_id>', views.getUserWishlist, name = 'user_wishlist'),
    path('wishlist/', views.addAWishlist, name =  'newWishlist'),
]