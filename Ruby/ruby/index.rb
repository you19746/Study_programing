require 'selenium-webdriver'
d = Selenium::WebDriver.for :chrome

d.get("https://www.youtube.com/watch?v=yJy15F9qO7Y&list=PLA3bxKt06DEUVm9Q544ivW7vg5izszc20")
sleep 3
# # ---------------
# # 特定のURLを開く
# #  ---------------

# d.get("")

# # ---------------
# # 特定の要素を取得する
# # ---------------
# find_element：最初に見つかった要素を返す
# find_elements：見つかった要素すべてを返す

# ・IDが一致する要素を返す
# el = driver.find_element(:id, 'some_id')

# ・クラス名が一致する要素を返す
# el = driver.find_element(:class, 'some_class_name')

# ・HTMLタグの名前が一致する
# el = driver.find_element(:tag_name, 'div')

# ・アンカーテキスト(リンクテキスト)が一致する
# el = driver.find_element(:link, 'anchor_text')

# ・XPath形式で要素を指定する
# el = driver.find_element(:xpath, "//a[@href='/login']")

# ・cssセレクターで要素を指定する
# el = driver.find_element(:css, '#some_id')

# # ---------------
# # 要素のテキストを取得
# # ---------------

# driver.find_element(:id, 'some_id').text

# # ---------------
# # 要素の属性値の取得
# # ---------------

# driver.find_element(:id, 'some_id').attribute('class')

# # ---------------
# # クリック、テキスト入力
# # ---------------

# ・ボタンやリンクをクリックする
# driver.find_element(:id, 'some_id').click

# ・テキストフィールドに値を入れる
# driver.find_element(:id, 'some_field_id').send_keys 'テキスト入力'
# driver.find_element(:id, 'some_field_id').set 'テキスト入力'

# ・テキストフィールドの値を空にする
# ※ ただし、type=fileの場合はclearメソッドでエラーになるので注意
# driver.find_element(:id, 'some_field_id').clear

# # ---------------
# # キーボードの操作
# # ---------------

# キーボードでenterを実行する場合はこちら。

# driver.find_element(:id, '#q_name').native.send_keys(:return)
# driver.find_element(:id, '#q_name').native.send_keys(:enter)

# # ---------------
# チェックボックス・ラジオボタン
# # ---------------

# # ・チェックボックス/ラジオボタンを選択する
# # ・ラジオボタンがセットされた場合にのみ、チェックをクリック
# unless driver.find_element(:id, 'some_radio_id').selected?
#   driver.find_element(:id, 'some_radio_id').click
# end

# # ・チェックボックス/ラジオボタンの選択を解除する
# driver.find_element(:id, 'some_check_box').clear

# # ---------------
# セレクトタグ
# # ---------------

# ・セレクトタグの取得
# select = Selenium::WebDriver::Support::Select.new(driver.find_element(:id, 'some_select_id'))
# select.select_by(:value, 'value1')    # valueの値で選択
# select.select_by(:text, '表示テキスト') # 表示テキストで選択
# select.select_by(:index, 3)           # インデックス（0始まり）で選択

# ・すべてのオプションを取得
# all_options = select.find_elements(:tag_name, 'option')

# # ---------------
# 要素の存在確認
# # ---------------

# ・1件以上あれば要素が存在すると判定
# driver.find_elements(:id, 'some_id').size >= 1

# def has_some_id?
#   driver.find_element(:id, 'some_id')
#   true
# rescue
#   false
# end

# # ---------------
# JavaScriptの実行
# # ---------------

# driver.execute_script('return window.location.pathname')

# # ---------------
# 要素の表示を待つ
# # ---------------
# 特定の要素が表示されるまで10秒を上限にwait(待ち時間を設定)ができます。

# wait = Selenium::WebDriver::Wait.new(timeout: 10)

# ・要素が現れるまで待つ
# wait.new(timeout: 10).until { driver.find_element(:id, 'some_id') }

# ・要素が表示されるまで待つ
# wait.until { driver.find_element(:id, 'some_id').displayed? }

# ・要素のテキストが期待される値になるまで待つ
# wait.until { driver.find_element(:id, 'some_id').text == 'Ajaxで生成されたテキスト' }

# # ---------------
# find_elementのタイムアウトを設定する
# # ---------------
# find_elementのタイムアウト時間はimplicit_waitで設定できます。

# driver.manage.timeouts.implicit_wait = 10

# driver.get 'http://google.com'
# el = driver.find_element(:id, 'some_id')
# Capybaraの場合はcssが表示されるまで待ってくれますが、Seleniumの場合は表示されるまでは待ってくれないので注意して使ってください。

# # ---------------
# Windowを移動する
# # ---------------

# window_titles = driver.window_handles.map do |w|
#   driver.switch_to.window(w)
#   [w, driver.title]
# end

# selected_id = window_titles.find { |e1, e2| e2 == '取得したいウィンドウのタイトル' }.first
# raise 'Not found window' unless selected_id

# driver.switch_to.window(selected_id)

# # ---------------
# JSのダイアログの操作
# # ---------------

# a = driver.switch_to.alert
# if a.text == '期待したテキストがある'
#   a.dismiss
# else
#   a.accept
# end

# # ---------------
# スクリーンショットを撮る
# # ---------------
# スクリーンショットの取得方法です。private APIのため動作保証はありませんのでご注意ください。

# driver.save_screenshot('path/to/filename.png')
