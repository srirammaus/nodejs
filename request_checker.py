import requests
from concurrent.futures import ThreadPoolExecutor

def get_url(url):
    return requests.get(url)

list_of_urls = ["http://127.0.0.1:8081/index"]*66000

with ThreadPoolExecutor(max_workers=10) as pool:
    response_list = list(pool.map(get_url,list_of_urls))

for response in response_list:
    print(response)