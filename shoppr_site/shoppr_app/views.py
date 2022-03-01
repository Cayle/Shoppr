from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from scrapyd_api import ScrapydAPI
import json
from time import sleep
import os

def index(request):
    return HttpResponse("Hello, world. You're at the app's index.")


def clean_data_files():
	if os.path.exists('shoppr_app/shein_items.json'):
  		os.remove('shoppr_app/shein_items.json')

	if os.path.exists('shoppr_app/boohoo_items.json'):
		os.remove('shoppr_app/boohoo_items.json')

def search(request, search_word):
	clean_data_files()
	scrapyd = ScrapydAPI('http://localhost:6800')
	scrapyd.schedule('shoppr_scraper', 'shein', search_word=search_word)
	scrapyd.schedule('shoppr_scraper', 'boohoo', search_word=search_word)
	sleep(30)
	shein_file  = open('shoppr_app/shein_items.json')
	boohoo_file =  open('shoppr_app/boohoo_items.json')
	data =  json.load(shein_file)
	data.extend(json.load(boohoo_file))
	return  JsonResponse(data, safe=False)

