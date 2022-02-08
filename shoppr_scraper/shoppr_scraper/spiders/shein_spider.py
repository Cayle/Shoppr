import scrapy

class SheinSpider(scrapy.Spider):
    name  = "shein"

    def start_requests(self):
        search_word = input("Enter your search term ==> ")
        url = f"https://us.shein.com/pdsearch/{search_word}"
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('section.j-expose__product-item')[:20]
        for each_product in products:
            product_url  = each_product.css("div.S-product-item__wrapper a::attr(href)").extract_first()
            product_name = each_product.css("div.S-product-item__name a::text").get().strip()
            yield {
            'product_url': product_url,
            'product_name': product_name,
            }
            