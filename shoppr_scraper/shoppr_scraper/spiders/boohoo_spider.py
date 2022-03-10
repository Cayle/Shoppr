import scrapy
import requests

class BoohooSpider(scrapy.Spider):
    name  = "boohoo"

    custom_settings = { 
        "FEEDS": {
            "../shoppr_site/shoppr_app/boohoo_items.json": {"format": "json"},
        }, 
    }
        

    def start_requests(self):
        self.base_url = "https://us.boohoo.com"
        url = f"{self.base_url}/search/?q={self.search_word}"
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        response_products = response.css('li.grid-tile')
        products = response_products if len(response_products) < 10 else response_products[:10]
        for each_product in products:
            product_url = self.base_url + each_product.css('div.product-tile-name a::attr(href)').extract_first()
            maybe_product__id = each_product.css('div.product-tile-name a::attr(href)').re("/([A-Z].+).html")
            product_id = None if not maybe_product__id else maybe_product__id[0]
            product_name = each_product.css('div.product-tile-name a::text').extract_first().strip('\n')
            product_std_price = each_product.css('div.product-pricing span.product-standard-price::text').re("\$([0-9]+\.[0-9]+)")[0]
            product_sales_price =each_product.css(' div.product-pricing span.product-sales-price::text').re("\$([0-9]+\.[0-9]+)")[0]
            product_img_url = "https:" + each_product.css('input.js-primary-image-default-url::attr(value)').re("(.+)\?\$")[0] + ".jpg"
            unit_discount = str(int(((float(product_std_price) - float(product_sales_price)) / float(product_std_price) ) * 100))
            yield {
            'product_brand': 'boohoo',
            'product_id': product_id,
            'product_name': product_name,
            'product_img_url': product_img_url,
            'product_url': product_url,
            'product_std_price': product_std_price,
            'product_sales_price': product_sales_price,
            'unit_discount': unit_discount
            }
 
