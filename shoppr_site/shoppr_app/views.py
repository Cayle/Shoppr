from curses.ascii import US
import re
from django.shortcuts import  render, redirect

from django.core import serializers
from .forms import NewUserForm
from django.contrib import messages
from .models import Product, WishListItem
from .serializers import ProductSerializer, WishlistItemSerializer
from django.contrib.auth.models import User

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm 

from rest_framework.renderers import JSONRenderer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.http import HttpResponse, JsonResponse
from scrapyd_api import ScrapydAPI
import json
from time import sleep
import os
from django.shortcuts import render

SHEIN_FILE_PATH = "shoppr_app/shein_items.json"
ASOS_FILE_PATH = "shoppr_app/asos_items.json"


def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("shoppr_app:index")

@api_view(['POST'])
def login_request(request):
	if request.method == "POST":
		data1 = {
					"username": "user_one", 
					"password": "testuser101$"
				}
		print(request)
		form = AuthenticationForm(request, data=request.data)
		print(request.data)
		if form.is_valid():
			print("got here 1")
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user, backend="django.contrib.auth.backends.ModelBackend")
				print(f"User name is {user.get_username()}")
				print(f"User ID is {user.password}")
				user = {
					'id': user.pk,
					'username': user.get_username(),
					'password': user.password
				}
				response = {'status': 'OK', 'user': user}
				# messages.info(request, f"You are now logged in as {username}.")
				# return redirect("shoppr_app:index")
				# return Response(response)
				return Response(response, status = status.HTTP_200_OK)
			else:
				print("got here 2")
				response = {'status': 'ERROR'}
				# return Response(response)
				return Response(response, status = status.HTTP_200_OK)
		else:
			print("got here 3")
			response = {'status': 'ERROR'}
			# return Response(response)
			return Response(response, status = status.HTTP_400_BAD_REQUEST)
	print("got here 4")
	response = {'status': 'ERROR'}
	# return Response(response)
	return Response(response)
	# form = AuthenticationForm()
	# return render(request, "shoppr_app/login.html", context={"login_form":form})

@api_view(['POST'])
def addAWishlist(request):
	if request.method == "POST":
		new_wishlist_data = request.data
		product = Product(
						product_id = new_wishlist_data.product_id,
						store=new_wishlist_data.product_brand, 
						name=new_wishlist_data.product_name, 
						image_url =new_wishlist_data.product_img_url, 
						url = new_wishlist_data.product_url, 
						standard_price = new_wishlist_data.product_std_price, 
						sales_price = new_wishlist_data.product_sales_price, 
						unit_discount = new_wishlist_data.product_unit_discount)
		try:
			product.save()
			print("Product saved")
		except:
			print("Error saving the product")
		user = User.objects.get(id = new_wishlist_data.user_id)
	
		wishlist = WishListItem(user = user, product = product)
		try:
			wishlist.save()
			print("Wishlist saved")
		except:
			print("Error saving wishlist item")
	else:
		print("Invalid request method")

# @api_view(['GET'])
def getUserWishlist(request, user_id):
	# user_id = int(request.GET.get('user_id'))
	print('entered')
	print(f"User ID : {user_id}")
	req_user = User.objects.get(id = user_id)
	print("here")

	user_wishlist_obj = WishListItem.objects.filter(user = req_user)
	print(user_wishlist_obj)

	user_wishlist_str = serializers.serialize('json', user_wishlist_obj)
	print(user_wishlist_str)
	
	user_wishlist = json.loads(user_wishlist_str)
	wishlist_products = [Product.objects.get(id = wishlist['fields']['product']) for wishlist in user_wishlist]
	wishlist_products_json = json.loads(serializers.serialize('json', wishlist_products))

	# return HttpResponse(user_wishlist_str, content_type='application/json')
	
	return  JsonResponse(wishlist_products_json, safe=False)

	# user_wish_serialized = WishlistItemSerializer(user_wishlist)
	# print(user_wish_serialized)
	# response = JSONRenderer().render(user_wish_serialized.data)
	# return response
  

@api_view(['POST'])
def register(request):
	if request.method == "POST":
		print(request.data)
		form = NewUserForm(request.data)
		print(form)
		if form.is_valid():
			user = form.save()
			response = {
				'status': 'OK',
			}
			# messages.success(request, "Registration successful." )
			# login(request, user, backend="django.contrib.auth.backends.ModelBackend")
			# return redirect("shoppr_app:index")
			print(response)
			return Response(response, status = status.HTTP_200_OK)
		else:
			response = {
				'status': 'ERROR',
			}
			# messages.error(request, "Unsuccessful registration. Invalid information.")
			print(response)
			return Response(response, status.HTTP_400_BAD_REQUEST)
	# form = NewUserForm()
	# return render (request, "shoppr_app/register.html", context={"register_form":form})


def clean_data_files():
	if os.path.exists(SHEIN_FILE_PATH):
		os.remove(SHEIN_FILE_PATH)

	# if os.path.exists('shoppr_app/boohoo_items.json'):
	# 	os.remove('shoppr_app/boohoo_items.json')

	if os.path.exists(ASOS_FILE_PATH):
		os.remove(ASOS_FILE_PATH)


def search(search_word):
	clean_data_files()
	scrapyd = ScrapydAPI('http://localhost:6800')
	scrapyd.schedule('shoppr_scraper', 'shein', search_word=search_word)
	scrapyd.schedule('shoppr_scraper', 'asos', search_word=search_word)
	sleep(50)
	with open(SHEIN_FILE_PATH, encoding='utf-8', errors='ignore') as shein_file:
		products_data = json.load(shein_file, strict=False)
		
	with open(ASOS_FILE_PATH, encoding='utf-8', errors='ignore') as asos_file:
		products_data.extend(json.load(asos_file, strict=False))

	# with open(SHEIN_FILE_PATH, 'r') as shein_file:
	# 	if shein_file.read():
	# 		products_data = json.loads(shein_file.read())
	# with open(ASOS_FILE_PATH, 'r') as asos_file:
	# 	if asos_file.read():
	# 		products_data.extend(json.loads(asos_file.read()))

	# shein_file  = open('shoppr_app/shein_items.json')
	# asos_file =  open('shoppr_app/asos_items.json')
	# products_data = json.load(shein_file)
	# products_data.extend(json.load(asos_file))
	products_data.sort(key = lambda product: float(product['product_sales_price']))
	data = {'search_word': search_word, 'number_of_results': len(products_data), 'results': products_data}
	return data  

def search_json(request, search_word):
	data = search(search_word)
	return  JsonResponse(data, safe=False)

def base(request):
	return render(request, 'shoppr_app/base.html', {})

def index(request):
	return render(request, 'shoppr_app/index.html', {})

def shop(request):
	search_word = request.GET.get('search_word')
	data = search(search_word)

	return render(request, 'shoppr_app/shop.html', data)

