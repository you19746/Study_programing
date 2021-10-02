const puppeteer = require('puppeteer');

// AWS用の諸々の設定
// cunst cromiun = require('puppeteer');
// const AWS = require("aws-sdk");
// AWS.config.update({ region: 'ap-northeast-1' });
// const KMS = new AWS.KMS();

// データベース関連
// const rdsdataservice = new AWS.RDSDataService();

// const fs = require('fs');
// const { exit } = require('process');
var commonFunction = require('./common-function.js');


// 日付補正
const ONE_MONTH = 1;
// 日付-明日
const ONE_DAY = 1;
// 公開
const IS_PUBLIC = 1;
// 非公開
const IS_PRIVATE = 0;
// 段数-1段目
const FIRST = 0;
// 段数-2段目
const SECOND = 1;
// index補正
const INDEX_CORRECTION = 1;
// 対象イベントが空欄の場合
const NULL_EVENT = -1;
// オプション数
const OPTION_COUNT = 5;
// フリーワード数
const FREE_WORD_COUNT = 6;
// 残回数なし
const ZERO = 0;

(async (event, context, callback) => {

  // ローカル開発時はコメントアウト
  // console.log('送信されてきたデータ');
  // console.log(event);

  // var tmp_body = event['Records'][0]['body'];
  // var all_content_info = JSON.parse(tmp_body);
  // var content = all_content_info;

  // console.log(content);
  // ここまで　ローカル開発時はコメントアウト
  // return;

  let result = null;
  let browser = null;
  // 更新開始時間（現在の日付）取得
  const startAt = new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '');

  try {
    browser = await puppeteer.launch({
      headless: false,  // ヘッドレスモードオフ
    //   args: chromium.args,
      defaultViewport: null,  //画面サイズ
      slowMo: 10  //遅延時間
    //   executablePath: await puppeteer.executablePath, //chromiunのパスの場所
      // 証明書エラー
      // ignoreHTTPSErrors: true,
    });

    // ブラウザを立ち上げる
    page = await browser.newPage();

    // ユーザーエージェント
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // クラスインスタンス
  //   content = {
  //     "admin_site_url": "https://fuzoku.jp/entry/login",
  //     "login_id": "koiirog1",
  //     "login_pass": "koiirog2",
  //     "selenium_name": "tenpo_sokuho.py",
  //     "site_selenium_name": "fuzoku_japan",
  //     "user_id": "1",
  //     "content_id": "10",
  //     "content_info": {
  //         "title": "☆60分7,000円で美少女と…♪☆ご新規様限定キャンペーン!!",
  //         "cke_source": "<div style=\"background:#fff; color:#000; font-size:14px; line-height:1.2; text-align:center; font-family: ヒラギノ明朝 Pro W6, Hiragino Mincho Pro, HGS明朝E, ＭＳ Ｐ明朝, serif;\">\r\n<div style=\"display:block; margin:0 auto; \r\nfont-size:16px; line-height:1.2;\">\r\n<div style=\"width:100%;margin:0 auto;\">\r\n<div style=\"background:#008DFF;height:6px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FF5580;height:5px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FFFF00;height:4px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#501480;height:3px;\">&nbsp;</div>\r\n\r\n<div style=\"border-top:2px solid #2DC849;border-bottom:2px solid #2DC849;text-align:center;color:rgb(68,68,68);font-family:&#039;Hiragino Kaku Gothic ProN&#039;, &#039;メイリオ&#039;, sans-serif;\">\r\n<div style=\"margin:0px;background:#F1F1F1;padding:0;\">\r\n<div style=\"background:#000000;padding-top:10px;padding-bottom:10px;\"><span style=\"font-size:28px;color:#ffffe0;font-weight:bold;\">ご新規様限定!!</span><br />\r\n<span style=\"font-size:14px;color:#FF6A0C;font-weight:bold;\">ご新規様特別プラン♪<br />\r\n最高峰エステ<br />\r\n厳選された美少女があなた様のために<br />\r\n密着エロマッサージをさせて頂きます。</span></div>\r\n\r\n<div style=\"margin:0 1px;padding:5px;line-height:1.5;font-weight:bold;font-size:20px;\"><span style=\"color:#FF5580;\">【採用率15％】</span><br />\r\n<span style=\"color:#0096FF;\">【清楚系美少女のみ採用】</span><br />\r\n<span style=\"color:#FFA500;\">【密着型やみつきエステ】</span></div>\r\n\r\n<div style=\"padding:0 1px;text-align:center;line-height:1.5;\">\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#FF6A0C;color:#fffacd;padding:3px;font-size:15px;font-weight:normal;\">▼料金プラン▼</div>\r\n\r\n<div style=\"background:#fffaf0;border:#F5E90B 1px solid;color:#000001;\">\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"width:250px;margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">60分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>11,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">7,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#ffffff;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">90分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>17,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">12,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">120分</span><br />\r\n<span style=\"font-size:15px;\"><strike>23,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">17,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n<span style=\"color:#696969;font-size:15px;\">※入会金　指名料金は別途頂きます。</span></div>\r\n<span style=\"color:#ff00ff;\">▼　▼　▼</span>\r\n\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#1EAF5F;color:#ffff00;padding:3px;font-size:20px;font-weight:bold;\">90分コース</div>\r\n\r\n<div style=\"background:#ffe6ec;border:#1EAF5F 1px solid;color:#000001;\">\r\n<div style=\"background:#e6fff1;\">\r\n<div style=\"margin:0 auto;font-size:18px;padding:3px;color:#0000ff;\">いちゃいちゃシャワータイム<br />\r\n&darr;<br />\r\n上半身密着マッサージ<br />\r\n&darr;<br />\r\n下半身密着マッサージ<br />\r\n&darr;<br />\r\n睾丸、おしりマッサージ<br />\r\n&darr;<br />\r\n性感プレー</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<div style=\"border-top:5px solid #F5E90B;border-bottom:5px solid #F5E90B;\">\r\n<div style=\"background:#ffffff;margin:0 1px;padding:5px;line-height:1.5;border-bottom:1px solid #F5E90B;\">&nbsp;</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" /></div>\r\n\r\n<div style=\"color:#ffffff; display:block; margin:0 auto; padding:5px 10px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;\r\nborder:1px solid #c7ac00;\r\nbackground:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c62d1f), color-stop(1, #f24437));\r\nbackground:-moz-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-webkit-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-o-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-ms-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);\r\nbackground-color:#c62d1f;\r\n\"><a href=\"http://koiiro.gakuen.tokyo/maga/\" style=\"color:#fff; font-weight:bold; padding:5px 0px 5px 0px; display:block; \r\n text-decoration:none;  font-size:20px;\">http://koiiro.gakuen.tokyo/maga/&nbsp;</a></div>\r\n<span style=\"font-size:12px; color:#0000ff;\">▲メルマガ登録ページへ▲&nbsp;</span>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" />\r\n<div style=\"margin:5px 0; padding:3px;\"><span style=\"display:block; margin:0 auto; text-decoration:none; padding:3px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;border:1px solid #0000ff;\r\nfont-size:18px; font-weight:bold; \">TEL:03-6277-4621&nbsp;</span>&nbsp;<span style=\"font-size:12px; color:#0000ff;\">&nbsp;▲お電話でのご予約▲&nbsp;</span><br />\r\n<br />\r\n<span style=\"font-size:18px;\">24時間営業&nbsp;</span></div>\r\n\r\n<div style=\"border-top:2px solid #000001; border-bottom:2px solid #000001; padding:5px 0; margin-top:6px;\"><a href=\"https://fuzoku.jp/koiirogakuentokyo/\" style=\"display:block; max-width:220px; margin:0 auto; text-decoration:none;\"><img src=\"http://smart.koiiro.gakuen.tokyo/img/common/logo.png\" style=\"width:100%;\" />&nbsp;<span style=\"font-size:12px; color:#000001;\">&nbsp;▲お店ページはコチラ▲&nbsp;</span>&nbsp;</a></div>\r\n\r\n<div style=\"font-size:12px; line-height:1.2; text-align:left; padding:5px;\">■注意事項<br />\r\n※電話またはメール予約にて&nbsp;｢新規割引を見た｣と必ずお伝え下さい</div>\r\n</div>",
  //         "category": "お得情報",
  //         "image": "contents-images/1/1068/private_template/1002/image.jpg",
  //         "local_image": "/Users/katouyuuki/Dropbox/仕事用/PROG/puppeteer/images/image.jpg",
  //         "is_not_sokuhime": [],
  //         "is_commuting": [
  //             {
  //                 "name": "臼井 百合香"
  //             },
  //             {
  //                 "name": "片桐 優"
  //             },
  //             {
  //                 "name": "秋月 梨花"
  //             },
  //             {
  //                 "name": "青山 りと"
  //             }
  //         ]
  //     }
  // }

  //イベントテスト
  content = {
    　"admin_site_url":"https://fuzoku.jp/entry/login",
    "login_id":"koiirog1",
    "login_pass":"koiirog2",
    "selenium_name":"event_regist_1_update.py",
    "site_selenium_name":"fuzoku_japan",
    "user_id":"1",
    "content_id":"14",
    "content_info":{
       "title":"☆ご新規様限定!!☆",
       "cke_source":"<div style=\"background:#fff; color:#000; font-size:14px; line-height:1.2; text-align:center; font-family: ヒラギノ明朝 Pro W6, Hiragino Mincho Pro, HGS明朝E, ＭＳ Ｐ明朝, serif;\">\r\n<div style=\"display:block; margin:0 auto; \r\nfont-size:16px; line-height:1.2;\">\r\n<div style=\"width:100%;margin:0 auto;\">\r\n<div style=\"background:#008DFF;height:6px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FF5580;height:5px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FFFF00;height:4px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#501480;height:3px;\">&nbsp;</div>\r\n\r\n<div style=\"border-top:2px solid #2DC849;border-bottom:2px solid #2DC849;text-align:center;color:rgb(68,68,68);font-family:&#039;Hiragino Kaku Gothic ProN&#039;, &#039;メイリオ&#039;, sans-serif;\">\r\n<div style=\"margin:0px;background:#F1F1F1;padding:0;\">\r\n<div style=\"background:#000000;padding-top:10px;padding-bottom:10px;\"><span style=\"font-size:28px;color:#ffffe0;font-weight:bold;\">ご新規様限定!!</span><br />\r\n<span style=\"font-size:14px;color:#FF6A0C;font-weight:bold;\">ご新規様特別プラン♪<br />\r\n最高峰エステ<br />\r\n厳選された美少女があなた様のために<br />\r\n密着エロマッサージをさせて頂きます。</span></div>\r\n\r\n<div style=\"margin:0 1px;padding:5px;line-height:1.5;font-weight:bold;font-size:20px;\"><span style=\"color:#FF5580;\">【採用率15％】</span><br />\r\n<span style=\"color:#0096FF;\">【清楚系美少女のみ採用】</span><br />\r\n<span style=\"color:#FFA500;\">【密着型やみつきエステ】</span></div>\r\n\r\n<div style=\"padding:0 1px;text-align:center;line-height:1.5;\">\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#FF6A0C;color:#fffacd;padding:3px;font-size:15px;font-weight:normal;\">▼料金プラン▼</div>\r\n\r\n<div style=\"background:#fffaf0;border:#F5E90B 1px solid;color:#000001;\">\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"width:250px;margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">60分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>11,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\"><span style=\"color:#ff0000;font-weight:bold;\">7,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#ffffff;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">90分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>17,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">12,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">120分</span><br />\r\n<span style=\"font-size:15px;\"><strike>23,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">17,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n<span style=\"color:#696969;font-size:15px;\">※入会金　指名料金は別途頂きます。</span></div>\r\n<span style=\"color:#ff00ff;\">▼　▼　▼</span>\r\n\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#1EAF5F;color:#ffff00;padding:3px;font-size:20px;font-weight:bold;\">90分コース</div>\r\n\r\n<div style=\"background:#ffe6ec;border:#1EAF5F 1px solid;color:#000001;\">\r\n<div style=\"background:#e6fff1;\">\r\n<div style=\"margin:0 auto;font-size:18px;padding:3px;color:#0000ff;\">いちゃいちゃシャワータイム<br />\r\n&darr;<br />\r\n上半身密着マッサージ<br />\r\n&darr;<br />\r\n下半身密着マッサージ<br />\r\n&darr;<br />\r\n睾丸、おしりマッサージ<br />\r\n&darr;<br />\r\n性感プレー</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<div style=\"border-top:5px solid #F5E90B;border-bottom:5px solid #F5E90B;\">\r\n<div style=\"background:#ffffff;margin:0 1px;padding:5px;line-height:1.5;border-bottom:1px solid #F5E90B;\">&nbsp;</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" /></div>\r\n\r\n<div style=\"color:#ffffff; display:block; margin:0 auto; padding:5px 10px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;\r\nborder:1px solid #C7AC00;\r\nbackground:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #C62D1F), color-stop(1, #F24437));\r\nbackground:-moz-linear-gradient(top, #C62D1F 5%, #F24437 100%);\r\nbackground:-webkit-linear-gradient(top, #C62D1F 5%, #F24437 100%);\r\nbackground:-o-linear-gradient(top, #C62D1F 5%, #F24437 100%);\r\nbackground:-ms-linear-gradient(top, #C62D1F 5%, #F24437 100%);\r\nbackground:linear-gradient(to bottom, #C62D1F 5%, #F24437 100%);\r\nbackground-color:#c62d1f;\r\n\"><a href=\"http://koiiro.gakuen.tokyo/maga/\" style=\"color:#fff; font-weight:bold; padding:5px 0px 5px 0px; display:block; \r\n text-decoration:none;  font-size:20px;\">http://koiiro.gakuen.tokyo/maga/&nbsp;</a></div>\r\n<span style=\"font-size:12px; color:#0000ff;\">▲メルマガ登録ページへ▲&nbsp;</span>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" />\r\n<div style=\"margin:5px 0; padding:3px;\"><span style=\"display:block; margin:0 auto; text-decoration:none; padding:3px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;border:1px solid #0000FF;\r\nfont-size:18px; font-weight:bold; \">TEL:03-6277-4621&nbsp;</span>&nbsp;<span style=\"font-size:12px; color:#0000ff;\">&nbsp;▲お電話でのご予約▲&nbsp;</span><br />\r\n<br />\r\n<span style=\"font-size:18px;\">24時間営業&nbsp;</span></div>\r\n\r\n<div style=\"border-top:2px solid #000001; border-bottom:2px solid #000001; padding:5px 0; margin-top:6px;\"><a href=\"https://fuzoku.jp/koiirogakuentokyo/\" style=\"display:block; max-width:220px; margin:0 auto; text-decoration:none;\"><img src=\"http://pictdt.com/images/gotandakoiirologo.gif\" style=\"width:100%;\" />&nbsp;<span style=\"font-size:12px; color:#000001;\">&nbsp;▲お店ページはコチラ▲&nbsp;</span>&nbsp;</a></div>\r\n\r\n<div style=\"font-size:12px; line-height:1.2; text-align:left; padding:5px;\">■注意事項<br />\r\n※電話またはメール予約にて&nbsp;｢新規割引を見た｣と必ずお伝え下さい</div>\r\n</div>",
       "category":"新規様限定",
       "girls":"野崎 のん",
       "start_type":"右欄から指定する",
       "start_year":"2020",
       "start_month":"1",
       "start_day":"1",
       "end_type":"明日",
       "end_year":"2020",
       "end_month":"1",
       "end_day":"1",
       "is_not_sokuhime":[
          
       ],
       "is_commuting":[
          
       ]
    }

  }

    let contentUpdate = new FuzokuJapan(content, page);
    // ログイン処理
    let loginResponse = await contentUpdate.login();

    // if (!loginResponse) {
    //   // ログインエラーとしてDBに登録して終了
    //   var error_code = '200';
    //   var response = await this.page.content();
    //   var updateResult = commonFunction.stopProgram(error_code, response);
    // }
    // result = null;

    // コンテンツ名取得
    const contentName = content['selenium_name'].replace('.py', '');

    if (typeof updateResult === 'undefined') {
      var updateResult;
      // コンテンツ実行
      switch (contentName) {
        // 店舗速報
        case 'tenpo_sokuho':
          updateResult = await contentUpdate.setSokuho();
          break;

        case 'event_regist_1_update':
          updateResult = await contentUpdate.setEvent();
          break;

        default:
          updateResult = commonFunction.unauthorizedAccess;
          updateResult['endAt'] = startAt;
      }

    }

  } catch (error) {
    console.log(error);
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  // 開始時間追加
  // updateResult['startAt'] = startAt;

  // // 更新結果DB登録
  // result = await commonFunction.registDatabase(content, updateResult);

  return callback(null, result);
})();

//  -------------------
// 風俗じゃぱんクラス
//  -------------------
class FuzokuJapan {
  constructor(contentInfo, page) {
    this.page = page;
    // 管理者画面URL
    this.adminSiteUrl = contentInfo.admin_site_url;
    // ログインID
    this.loginId = contentInfo.login_id;
    // ログインPASS
    this.loginPass = contentInfo.login_pass;
    // コンテンツ名
    this.contentName = contentInfo.selenium_name;
    // コンテンツ情報
    this.contentInfo = contentInfo.content_info;
  }

  // ログイン処理
  async login() {
    // 管理者ログイン画面に遷移
    await this.page.goto(this.adminSiteUrl);

    // ID、PASS入力
    await this.page.type('input[name="username"]', this.loginId);
    await this.page.type('input[name="password"]', this.loginPass);

    // ログインボタン押下
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      await this.page.click('button[name="login_btn"]'),
      // await this.page.waitForTimeout(5000)
    ]);

    // ログイン判定
    if (this.page.url() === this.adminSiteUrl) {
      return false;
    } else {
      return true;
    }
  }
//  -------------------
//   店舗速報コンテンツ
// --------------------
async setSokuho(){

  // 店舗速報ページに遷移
  await this.page.$$eval('ul.menuList a', elems => {
    elems.forEach(elem => {
        if (elem.innerText === '店舗速報') elem.click();
    });
  });

  // 残回数取得
  let remainingContent = await this.page.$('span.news-rest-count');
  let remainingCount = await (await remainingContent.getProperty('textContent')).jsonValue();
  remainingCount = remainingCount.substr(3).slice(0, -1);
  // console.log(result);

  // 残回数判定処理
  if(remainingCount === ZERO){
    console.log('残回数が無いため、処理を終了します。');
    return;

    // エラーを返して終了
    // var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
    // var error_code = '310';
    // var response = await this.page.content();
    // return commonFunction.stopProgram(error_code, response, ret);
  }
  console.log('残回数は' + remainingCount + '回です');

  // 新規投稿をクリック
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    await this.page.click('div.new_button a'),
  ]);

  // タイトル入力
  await this.page.type('input[name="title"]', this.contentInfo.title);

  // 「速報タグ設定」の選択（デフォルトが最新情報になっている）
  var tags = {"最新情報": 0, "女の子編集": 1, "新人体験入店": 2, "お得情報": 3}
  await this.page.click('label[for="form_newstag_' + tags[this.contentInfo.category] + '"]')

  // 本文
  // ckeエディター切り替え
  await Promise.all([
      await this.page.click('#cke_12')
  ]);
  // 本文入力
  var content = this.contentInfo.cke_source.replace("'", '').replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
  await page.type('.cke_source', content)

// ---------------------------------
// 　参考
  // let ckeId = cke_source_btn_ids[0];
  // await commonFunction.inputCke(ckeId, this.contentInfo, this.page);

  // // common-functionの内容
  // exports.inputCke = async function (ckeId, content, page) {
  //   let ckeSource = await page.$('#cke_' + ckeId);
  //   await Promise.all([
  //       ckeSource.click()
  //   ]);
  //   var content = parseCkeHtmlWithoutUnescape(content.content);
  // function parseCkeHtmlWithoutUnescape(string) {
    //   return string.replace("'", '').replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
    // }
  //   await page.waitForSelector('.cke_source');
  //   await Promise.all([
  //       page.type('.cke_source', content)
  //   ]);
  //   return;
  // }
// ---------------------------------

  // 画像登録
  // s3
  // if (this.contentInfo.image.length > 0) {
  //   const filenames = await commonFunction.uploadImage(this.contentInfo.image);

  // ローカルファイルでテスト
  const filename = this.contentInfo.local_image;
  if(filename.length === 1){
    console.log('画像ファイルが破損しているため更新できませんでした。画像ファイルの再確認をお願いします。')
    var error_code = '251';
    var response = await this.page.content();
    var ret = '';
    // return commonFunction.stopProgram(error_code, response, ret);
  }

  // ファイルアップロード
  await this.page.waitForSelector('input[type="file"]');
  let inputFile = await this.page.$('input[type="file"]');
  inputFile.uploadFile(filename);

  // await Promise.all([
  //   this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  //   await this.page.click('div.new_button a'),
  // ]);

// ---------------------------------
  // 参考
  // if (this.contentInfo.image.length > 0) {
  //   const filenames = await commonFunction.uploadImage(this.contentInfo.image);
  //   // 保存したローカルパス
  //   console.log(filenames);
  //   if (filenames.length === 0) {
  //     var error_code = '251';
  //     var response = await this.page.content();
  //     var ret = '';
  //     return commonFunction.stopProgram(error_code, response, ret);
  //   }

  // s3から画像を取得　commonFunction.uploadImage 
  // exports.uploadImage = async function (image) {
  //   var s3 = new AWS.S3();
  //   const s3BucketName = 'utopia-bk-auto-update-dev';
  //   var localFilePath = '/tmp/';
  //   var s3Params = {
  //     Bucket: s3BucketName,
  //     Key: image
  //   };
  //   const getS3Object = async (s3Params, localFilePath) => {
  //     return new Promise((resolve) => {
  //       s3.getObject(s3Params, function (err, data) {
  //         if (err) {
  //           /**
  //            * エラー時は空で返す
  //            */
  //           resolve('');
  //         } else {
  //           var filePath = localFilePath + 'test.png'
  //           fs.writeFileSync(filePath, data.Body);
  //           resolve(filePath);
  //         }
  //       })
  //     });
  //   }
  //   const filenames = await getS3Object(s3Params, localFilePath);
  //   return filenames;
  // }
// ---------------------------------

  // 更新前のwait
  // await page.waitForTimeout(5000);

  // 更新ボタンをクリック
  // ※投稿されてしまうので普段はコメントアウト
  // const confirmForm = await Promise.all([
  //   this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //   this.page.click('input[name="register_btn"]'),
  // ]);

  // エラー確認
  var alertMessages = await this.page.$$('div.error_comment');
  if (alertMessages.length > 0) {
    console.log('入力が完了していません');
    await this.page.close();
    var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
    var error_code = '301';
    var response = await this.page.content();
    // return commonFunction.stopProgram(error_code, response, ret);
  }
  // 正常更新
  console.log('投稿完了しました。');
  var error_code = '100';
  var response = await this.page.content();
  var ret = '';
  return;
  // return commonFunction.stopProgram(error_code, response, ret);

  }

//  -------------------
//   イベント更新コンテンツ
// --------------------
async setEvent(){

  // 店舗速報ページに遷移
  await this.page.$$eval('ul.menuList a', elems => {
    elems.forEach(elem => {
        if (elem.innerText === 'イベント（フリーテキスト）') elem.click();
    });
  });
  await this.page.waitForTimeout(1000);

  // イベント枚数判定処理

  // 既存の内容削除
  await this.page.$eval('input[name="formvalue[0][coupon_title]"]', element => element.value = '');
  // タイトル入力
  await this.page.type('input[name="formvalue[0][coupon_title]"]', this.contentInfo.title);

  // 「アイコン」の選択
  var tags = {"じゃぱん限定": 0, "新規様限定": 1, "終了間近": 2}
  await this.page.click('label[for="form_formvalue[0][coupon_icon]_' + tags[this.contentInfo.category] + '"]')
  
  // await this.page.waitForTimeout(5000);
  
  // 有効期限設定

  // イベント開始日設定
  // 本日が選択されていた場合
  if (this.contentInfo.start_type === '本日') {
    const today = new Date();
    await this.page.select('select[name="formvalue[0][coupon_start_yy]"]', String(today.getFullYear()));
    await this.page.select('select[name="formvalue[0][coupon_start_mm]"]', String(today.getMonth()));
    await this.page.select('select[name="formvalue[0][coupon_start_dd]"]', String(today.getDate()));
  // 明日が選択されていた場合
  } else if (this.contentInfo.start_type === '明日') {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
    await this.page.select('select[name="formvalue[0][coupon_start_yy]"]', String(tomorrow.getFullYear()));
    await this.page.select('select[name="formvalue[0][coupon_start_mm]"]', String(tomorrow.getMonth()));
    await this.page.select('select[name="formvalue[0][coupon_start_dd]"]', String(tomorrow.getDate()));
  // 右欄から指定するが選択されていた場合
  } else {
    await this.page.select('select[name="formvalue[0][coupon_start_yy]"]', this.contentInfo.start_year);
    await this.page.select('select[name="formvalue[0][coupon_start_mm]"]', this.contentInfo.start_month);
    await this.page.select('select[name="formvalue[0][coupon_start_dd]"]', this.contentInfo.start_day);
  }

  // イベント終了日設定
  // 本日が選択されていた場合
  if (this.contentInfo.end_type === '本日') {
    const today = new Date();
    await this.page.select('select[name="formvalue[0][coupon_end_yy]"]', String(today.getFullYear()));
    await this.page.select('select[name="formvalue[0][coupon_end_mm]"]', String(today.getMonth()));
    await this.page.select('select[name="formvalue[0][coupon_end_dd]"]', String(today.getDate()));
  // 明日が選択されていた場合
  } else if (this.contentInfo.end_type === '明日') {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
    await this.page.select('select[name="formvalue[0][coupon_end_yy]"]', String(tomorrow.getFullYear()));
    await this.page.select('select[name="formvalue[0][coupon_end_mm]"]', String(tomorrow.getMonth()));
    await this.page.select('select[name="formvalue[0][coupon_end_dd]"]', String(tomorrow.getDate()));
  // 右欄から指定するが選択されていた場合
  } else {
    await this.page.select('select[name="formvalue[0][coupon_end_yy]"]', this.contentInfo.end_year);
    await this.page.select('select[name="formvalue[0][coupon_end_mm]"]', this.contentInfo.end_month);
    await this.page.select('select[name="formvalue[0][coupon_end_dd]"]', this.contentInfo.end_day);
  }
  
  // 本文
  // ckeエディター切り替え
  await Promise.all([
      await this.page.click('#cke_19')
  ]);
  // 本文削除
  await this.page.$eval('.cke_source', element => element.value = '') 
  // 本文入力
  var content = this.contentInfo.cke_source.replace("'", '').replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
  await this.page.type('.cke_source', content)

  // 女性画像選択
  // 「女の子を設定する」押下
  await this.page.click('input[name="girl_select0"]');
  await this.page.waitForTimeout(5000);

  // 一致する女性を選択
  console.log(this.contentInfo['girls']);
  await this.page.$$eval('div.list_area li div:first-child', elems => {
    elems.forEach(elem => {
        if (elem.innerText === '蒼井　 ほたる') elem.click();
    });
  });
  await this.page.waitForTimeout(1000);
// ---------------------------------

  // 更新前のwait
  // await page.waitForTimeout(5000);

  // 更新ボタンをクリック
  // ※投稿されてしまうので普段はコメントアウト
  // const confirmForm = await Promise.all([
  //   this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //   this.page.click('input[name="confirm_0"]'),
  // ]);

  // エラー確認
  var alertMessages = await this.page.$$('div.error_comment');
  if (alertMessages.length > 0) {
    console.log('入力が完了していません');
    await this.page.close();
    var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
    var error_code = '301';
    var response = await this.page.content();
    // return commonFunction.stopProgram(error_code, response, ret);
  }
  // 正常更新
  console.log('投稿完了しました。');
  var error_code = '100';
  var response = await this.page.content();
  var ret = '';
  return;
  // return commonFunction.stopProgram(error_code, response, ret);

  }
};