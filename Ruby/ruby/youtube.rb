require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

# ---リンク取得----
url = 'https://www.youtube.com/'
driver.get(url)

word = import('検索したいワードを入力してください')

search = driver.find_elemnt_by_id('search-container')[0]
seatch.input(word)

puts '完了'
sleep 3