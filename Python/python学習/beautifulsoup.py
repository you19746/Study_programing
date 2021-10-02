# 必要モジュール読み込み
import requests
from bs4 import BeautifulSoup

url = 'https://scraping-for-beginner.herokuapp.com/udemy'
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

