import re
from django.shortcuts import  render, redirect
from .forms import NewUserForm
from django.contrib import messages

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm 

from rest_framework import permissions
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


def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user, backend="django.contrib.auth.backends.ModelBackend")
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("shoppr_app:index")
			else:
				messages.error(request,"User with the entered information does not exist. Check and try again.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request, "shoppr_app/login.html", context={"login_form":form})

@api_view(['POST'])
def register(request):
	if request.method == "POST":
		print(request.POST)
		form = NewUserForm(request.POST)
		# print(form)
		if form.is_valid():
			user = form.save()
			response = {
				'status': 'OK',
				'user': user,
			}
			# messages.success(request, "Registration successful." )
			# login(request, user, backend="django.contrib.auth.backends.ModelBackend")
			# return redirect("shoppr_app:index")
			return Response(response)
		else:
			response = {
				'status': 'ERROR',
			}
			# messages.error(request, "Unsuccessful registration. Invalid information.")
			return Response(response)
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

