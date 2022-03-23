import scrapy
import requests
import re

class AsosSpider(scrapy.Spider):
    name  = "asos"

    custom_settings = { 
        "FEEDS": {
            "../shoppr_site/shoppr_app/asos_items.json": {"format": "json"},
        }, 
    }

    def image_from_url(self, product_url):
      img_prefix = "https://images.asos-media.com/products"
      new_product_url = product_url.replace("//", "/")
      url_pieces = new_product_url.split("/")
      name_idx = url_pieces.index('prd') - 1
      product_name = url_pieces[name_idx]
      query_prms = url_pieces[-1]
      query_params = query_prms.split("?")
      product_id = query_params[0]
      clr = re.findall("clr=(.*)&colourWayId", query_params[1])[0]
      color = "".join(clr.split("-"))
      img_url = img_prefix +"/"+product_name + "/"+product_id+"-1-"+color
      return img_url, product_id
    
    def split_it(self, string):
      str1 = string.replace(",", ";")
      str_spl = str1.split(";")
      product_name = str_spl[0]
      product_std_price = re.findall("([0-9]+.[0-9]+)", str_spl[1])[0]
      product_sales_price = product_std_price
      unit_discount = '0'
      if len(str_spl) > 2:
        product_sales_price = re.findall("([0-9]+.[0-9]+)", str_spl[2])[0]
        unit_discount = re.findall("([0-9]+)", str_spl[3])[0]
      return product_name, product_std_price, product_sales_price, unit_discount

    def start_requests(self):
        self.base_url = "https://www.asos.com/us"
        url = f"{self.base_url}/search/?q={self.search_word}"
        # url = f"{self.base_url}/search/?q=sundress"
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        response_products = response.css('article')
        products = response_products if len(response_products) < 10 else response_products[:10]
        #results = []
        for each_product in products:
            product_url = each_product.css('a::attr(href)').extract_first()
            product_img_url, product_id = self.image_from_url(product_url)
            meta_info = each_product.css('a::attr(aria-label)').extract_first()
            product_name, product_std_price, product_sales_price, unit_discount = self.split_it(meta_info)
            # results.append({
            # 'product_brand': 'asos',
            # 'product_id': product_id,
            # 'product_name': product_name,
            # 'product_img_url': product_img_url,
            # 'product_url': product_url,
            # 'product_std_price': product_std_price,
            # 'product_sales_price': product_sales_price,
            # 'unit_discount': unit_discount
            # })
            yield {
            'product_brand': 'asos',
            'product_id': product_id,
            'product_name': product_name,
            'product_img_url': product_img_url,
            'product_url': product_url,
            'product_std_price': product_std_price,
            'product_sales_price': product_sales_price,
            'unit_discount': unit_discount
            }
        # print(results)

 
