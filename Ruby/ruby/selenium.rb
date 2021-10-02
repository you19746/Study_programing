require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

# ---リンク取得----
driver.get("https://hebi.5ch.net/test/read.cgi/news4vip/1594403090/")

links = []
driver.find_elements(:tag_name, 'span').each do |spans|
	links << spans.find_element(:tag_name, 'a')
end

links.each do |link|
	link.text
end

puts '完了'
sleep 3