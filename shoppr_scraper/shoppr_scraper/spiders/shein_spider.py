import scrapy
import requests
from scrapy.crawler import CrawlerProcess
from . import boohoo_spider
from .. import items
import json


class SheinSpider(scrapy.Spider):
    name  = "shein"

    custom_settings = { 
        "FEEDS": {
            "../shoppr_site/shoppr_app/shein_items.json": {"format": "json"},
        }, 
    }

    def start_requests(self):
        self.prefix_url = "https://us.shein.com"
        url = f"{self.prefix_url}/pdsearch/{self.search_word}"
        yield scrapy.Request(url=url, callback=self.parse)

    def get_price(self, product_id):
        r = requests.get(f"{self.prefix_url}/goods_detail_v2_realtime/realtime_price?_lang=en&_ver=1.1.8&currency=&goods_ids={product_id}").json()
        prices = r['prices'][str(product_id)]
        return prices['retailPrice']['usdAmount'], prices['salePrice']['usdAmount'], prices['unit_discount']

    def parse(self, response):
        results = []
        products = response.css('section.j-expose__product-item')[:10]
        for each_product in products:
            product_id  = each_product.css('div.S-product-item__wrapper a::attr(href)').re('p-([0-9]+)-cat')[0]
            product_std_price, product_sales_price, unit_discount = self.get_price(product_id)
            product_url  = each_product.css("div.S-product-item__wrapper a::attr(href)").extract_first()
            product_name = each_product.css("div.S-product-item__name a::text").get().strip()
            product_img_url = "https:" + each_product.css("div.S-product-item__wrapper a.j-expose__product-item-img img::attr(data-src)").extract_first()
            yield {
            'product_id': product_id,
            'product_std_price': product_std_price,
            'product_sales_price': product_sales_price,
            'unit_discount': unit_discount,
            'product_url': self.prefix_url + product_url,
            'product_name': product_name,
            'product_image': product_img_url,
            }
