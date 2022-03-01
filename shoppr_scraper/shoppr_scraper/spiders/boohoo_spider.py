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
        results = []
        products = response.css('li.grid-tile')[:10]
        for each_product in products:
            product_url = self.base_url + each_product.css('div.product-tile-name a::attr(href)').extract_first()
            product_name = each_product.css('div.product-tile-name a::text').extract_first().strip('\n')
            product_std_price = each_product.css('div.product-pricing span.product-standard-price::text').extract_first().strip('\n')
            product_sales_price =each_product.css(' div.product-pricing span.product-sales-price::text').re("\$[0-9]+\.[0-9]+")[0]
            product_image =  "https:" + each_product.css('input.js-primary-image-default-url::attr(value)').extract_first()
            yield {
            'product_url': product_url,
            'product_name': product_name,
            'product_std_price': product_std_price,
            'product_sales_price': product_sales_price,
            'product_image': product_image,
            }
 
