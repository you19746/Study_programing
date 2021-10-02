from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

driver = webdriver.Chrome(ChromeDriverManager().install())

content = {
      "admin_site_url": "https://fuzoku.jp/entry/login",
      "login_id": "koiirog1",
      "login_pass": "koiirog2",
      "selenium_name": "tenpo_sokuho.py",
      "site_selenium_name": "fuzoku_japan",
      "user_id": "1",
      "content_id": "10",
      "content_info": {
          "title": "☆60分7,000円で美少女と…♪☆ご新規様限定キャンペーン!!",
          "cke_source": "<div style=\"background:#fff; color:#000; font-size:14px; line-height:1.2; text-align:center; font-family: ヒラギノ明朝 Pro W6, Hiragino Mincho Pro, HGS明朝E, ＭＳ Ｐ明朝, serif;\">\r\n<div style=\"display:block; margin:0 auto; \r\nfont-size:16px; line-height:1.2;\">\r\n<div style=\"width:100%;margin:0 auto;\">\r\n<div style=\"background:#008DFF;height:6px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FF5580;height:5px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FFFF00;height:4px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#501480;height:3px;\">&nbsp;</div>\r\n\r\n<div style=\"border-top:2px solid #2DC849;border-bottom:2px solid #2DC849;text-align:center;color:rgb(68,68,68);font-family:&#039;Hiragino Kaku Gothic ProN&#039;, &#039;メイリオ&#039;, sans-serif;\">\r\n<div style=\"margin:0px;background:#F1F1F1;padding:0;\">\r\n<div style=\"background:#000000;padding-top:10px;padding-bottom:10px;\"><span style=\"font-size:28px;color:#ffffe0;font-weight:bold;\">ご新規様限定!!</span><br />\r\n<span style=\"font-size:14px;color:#FF6A0C;font-weight:bold;\">ご新規様特別プラン♪<br />\r\n最高峰エステ<br />\r\n厳選された美少女があなた様のために<br />\r\n密着エロマッサージをさせて頂きます。</span></div>\r\n\r\n<div style=\"margin:0 1px;padding:5px;line-height:1.5;font-weight:bold;font-size:20px;\"><span style=\"color:#FF5580;\">【採用率15％】</span><br />\r\n<span style=\"color:#0096FF;\">【清楚系美少女のみ採用】</span><br />\r\n<span style=\"color:#FFA500;\">【密着型やみつきエステ】</span></div>\r\n\r\n<div style=\"padding:0 1px;text-align:center;line-height:1.5;\">\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#FF6A0C;color:#fffacd;padding:3px;font-size:15px;font-weight:normal;\">▼料金プラン▼</div>\r\n\r\n<div style=\"background:#fffaf0;border:#F5E90B 1px solid;color:#000001;\">\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"width:250px;margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">60分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>11,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">7,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#ffffff;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">90分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>17,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">12,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">120分</span><br />\r\n<span style=\"font-size:15px;\"><strike>23,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">17,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n<span style=\"color:#696969;font-size:15px;\">※入会金　指名料金は別途頂きます。</span></div>\r\n<span style=\"color:#ff00ff;\">▼　▼　▼</span>\r\n\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#1EAF5F;color:#ffff00;padding:3px;font-size:20px;font-weight:bold;\">90分コース</div>\r\n\r\n<div style=\"background:#ffe6ec;border:#1EAF5F 1px solid;color:#000001;\">\r\n<div style=\"background:#e6fff1;\">\r\n<div style=\"margin:0 auto;font-size:18px;padding:3px;color:#0000ff;\">いちゃいちゃシャワータイム<br />\r\n&darr;<br />\r\n上半身密着マッサージ<br />\r\n&darr;<br />\r\n下半身密着マッサージ<br />\r\n&darr;<br />\r\n睾丸、おしりマッサージ<br />\r\n&darr;<br />\r\n性感プレー</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<div style=\"border-top:5px solid #F5E90B;border-bottom:5px solid #F5E90B;\">\r\n<div style=\"background:#ffffff;margin:0 1px;padding:5px;line-height:1.5;border-bottom:1px solid #F5E90B;\">&nbsp;</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" /></div>\r\n\r\n<div style=\"color:#ffffff; display:block; margin:0 auto; padding:5px 10px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;\r\nborder:1px solid #c7ac00;\r\nbackground:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c62d1f), color-stop(1, #f24437));\r\nbackground:-moz-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-webkit-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-o-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-ms-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);\r\nbackground-color:#c62d1f;\r\n\"><a href=\"http://koiiro.gakuen.tokyo/maga/\" style=\"color:#fff; font-weight:bold; padding:5px 0px 5px 0px; display:block; \r\n text-decoration:none;  font-size:20px;\">http://koiiro.gakuen.tokyo/maga/&nbsp;</a></div>\r\n<span style=\"font-size:12px; color:#0000ff;\">▲メルマガ登録ページへ▲&nbsp;</span>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" />\r\n<div style=\"margin:5px 0; padding:3px;\"><span style=\"display:block; margin:0 auto; text-decoration:none; padding:3px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;border:1px solid #0000ff;\r\nfont-size:18px; font-weight:bold; \">TEL:03-6277-4621&nbsp;</span>&nbsp;<span style=\"font-size:12px; color:#0000ff;\">&nbsp;▲お電話でのご予約▲&nbsp;</span><br />\r\n<br />\r\n<span style=\"font-size:18px;\">24時間営業&nbsp;</span></div>\r\n\r\n<div style=\"border-top:2px solid #000001; border-bottom:2px solid #000001; padding:5px 0; margin-top:6px;\"><a href=\"https://fuzoku.jp/koiirogakuentokyo/\" style=\"display:block; max-width:220px; margin:0 auto; text-decoration:none;\"><img src=\"http://smart.koiiro.gakuen.tokyo/img/common/logo.png\" style=\"width:100%;\" />&nbsp;<span style=\"font-size:12px; color:#000001;\">&nbsp;▲お店ページはコチラ▲&nbsp;</span>&nbsp;</a></div>\r\n\r\n<div style=\"font-size:12px; line-height:1.2; text-align:left; padding:5px;\">■注意事項<br />\r\n※電話またはメール予約にて&nbsp;｢新規割引を見た｣と必ずお伝え下さい</div>\r\n</div>",
          "category": "お得情報",
          "image": "contents-images/1/1068/private_template/1002/image.jpg",
          "local_image": "/Users/katouyuuki/Dropbox/仕事用/PROG/puppeteer/images/image.jpg",
          "is_not_sokuhime": [],
          "is_commuting": [
              {
                  "name": "臼井 百合香"
              },
              {
                  "name": "片桐 優"
              },
              {
                  "name": "秋月 梨花"
              },
              {
                  "name": "青山 りと"
              }
          ]
      }
  }

driver.get(content['admin_site_url'])
driver.find_element_by_name('username').send_keys(content['login_id'])
driver.find_element_by_name('password').send_keys(content['login_pass'])
driver.find_element_by_name('login_btn').click()
sleep(1)

driver.find_element_by_link_text("店舗速報").click()
sleep(1)