from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from scrapyd_api import ScrapydAPI
import json
from time import sleep
import os
from django.shortcuts import render


def clean_data_files():
	if os.path.exists('shoppr_app/shein_items.json'):
  		os.remove('shoppr_app/shein_items.json')

	if os.path.exists('shoppr_app/boohoo_items.json'):
		os.remove('shoppr_app/boohoo_items.json')


def search(search_word):
	clean_data_files()
	scrapyd = ScrapydAPI('http://localhost:6800')
	scrapyd.schedule('shoppr_scraper', 'shein', search_word=search_word)
	scrapyd.schedule('shoppr_scraper', 'boohoo', search_word=search_word)
	sleep(30)
	shein_file  = open('shoppr_app/shein_items.json')
	boohoo_file =  open('shoppr_app/boohoo_items.json')
	products_data =  json.load(shein_file)
	products_data.extend(json.load(boohoo_file))
	products_data.sort(key = lambda product: float(product['product_sales_price']))
	data = {'search_word': search_word, 'number_of_results': len(products_data), 'results': products_data}
	return data 

def search_json(request, search_word):
	data = search(search_word)
	return  JsonResponse(data, safe=False)


def index(request):
	return render(request, 'shoppr_app/index.html', {})

def shop(request):
	search_word = request.GET.get('search_word')
	data = search(search_word)

	return render(request, 'shoppr_app/shop.html', data)

