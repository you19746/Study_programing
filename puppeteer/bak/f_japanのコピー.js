const chromium = require('chrome-aws-lambda');
const AWS = require("aws-sdk");
AWS.config.update({ region: 'ap-northeast-1' });
const KMS = new AWS.KMS();

// データベース関連
// const rdsdataservice = new AWS.RDSDataService();

const fs = require('fs');
const { exit } = require('process');
var commonFunction = require('./common-function.js');


// 日付補正
const ONE_MONTH = 1;
// 日付-明日
const ONE_DAY = 1;
// 公開
const PUBLIC = 1;
// 非公開
const PRIVATE = 0;
// 段数-1段目
const FIRST = 0;
// 段数-2段目
const SECOND = 1;
// index補正
const INDEX_CORRECTION = 1;
// イベント数
const EVENT_NUM = 5
// 対象イベントが空欄の場合
const NULL_EVENT = -1;
// オプション数
const OPTION_NUM = 5;
// フリーワード数
const FREE_WORD_NUM = 6;
// 口コミクーポン
const KUCHIKOMI_COUPON = 0;

exports.handler = async (event, context, callback) => {

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
    browser = await chromium.puppeteer.launch({
      headless: false,  // ヘッドレスモードオフ
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      // ヘッドレスChrome
      // headless: chromium.headless,
      // 証明書エラー
      ignoreHTTPSErrors: true,
    });

    // ブラウザを立ち上げる
    page = await browser.newPage();

    // ユーザーエージェント
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    // クラスインスタンス
    content = {
      "admin_site_url": "https://fuzoku.jp/entry/login",
      "login_id": "koiirog1",
      "login_pass": "koiirog2",
      "selenium_name": "event_regist_1_update.py",
      "site_selenium_name": "pure_lovers",
      "user_id": "2",
      "content_id": "235",
      "content_info": {
        "start_type": "右欄から選択する",
        "start_year": "2021",
        "start_month": "9",
        "start_day": "1",
        "is_previous": "1",
        "end_type": "右欄から選択する",
        "end_year": "2021",
        "end_month": "11",
        "end_day": "1",
        "is_endless": "0",
        "title": "ご新規様限定★50分8,000円！最安！安心！可愛い！",
        "image": "contents-images/2/3257/private_template/2969/image.jpg",
        "content": "<div style=\"background:none;\">\r\n<div style=\"background:#fff;border:#ffffff 0px solid;text-align:center;line-height:1.4;font-family:&#039;ヒラギノ角ゴ Pro W3&#039;, &#039;Hiragino Kaku Gothic Pro&#039;, &#039;メイリオ&#039;, Meiryo, Osaka, &#039;ＭＳ Ｐゴシック&#039;, &#039;MS PGothic&#039;, sans-serif;\">\r\n<div style=\"border-left:1px #ffd700 solid;border-right:1px #ffd700 solid;\">\r\n<div style=\"background:#2ECC4B;border-top:3px #ffd700 solid;border-bottom:3px #ffd700 solid;padding:10px 0px 10px;\"><span style=\"text-decoration:none;font-size:24px;color:#ffffe0;font-weight:bold;\">★ご新規様限定割引★&nbsp;</span></div>\r\n\r\n<div style=\"background:#ffffff;margin:10px 10px 10px;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;color:#00008b;font-size:16px;text-align:center;line-height:1.2;\">\r\n<div style=\"color:#04B4AE;font-weight:bold;padding-top:3px;\">『ハニープラザ』を<br />\r\n初めてご利用頂くお客様へ<br />\r\n<br />\r\n当店の可愛い素人女性を<br />\r\nご新規様特別料金にて<br />\r\nご案内させていただきます。</div>\r\n\r\n<div style=\"font-size:16px;padding-top:5px;\"><span style=\"font-size:28px;\">【 <span style=\"color:#FF8000;font-weight:bold;\">新規割</span>】料金</span><br />\r\n<span style=\"font-weight:bold;color:#2E64FE;\">―――――▼10時～18時▼―――――</span><br />\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★50分　11,000円</span><br />\r\n&darr;3,000円OFF&darr;<br />\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">8,000円</span><br />\r\n<br />\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★70分　15,000円</span><br />\r\n&darr;3,500円OFF&darr;<br />\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">11,500円</span><br />\r\n<br />\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★90分　19,000円</span><br />\r\n&darr;4,000円OFF&darr;<br />\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">15,000円</span><br />\r\n<br />\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★110分　23,000円</span><br />\r\n&darr;4,500円OFF&darr;<br />\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">18,500円</span><br />\r\n<br />\r\n※入会金別<br />\r\n※指名料別<br />\r\n※18時以降はプラス <span style=\"color:#FF0040;\">2,000円</span>になります。<br />\r\n&nbsp;</div>\r\n\r\n<div style=\"color:#04B4AE;font-weight:bold;border-top:1px solid #ffd700;padding:2px;\">メルマガ登録をして頂くと、<br />\r\n次回以降もお得に遊べる割引を<br />\r\nご用意しております♪<br />\r\n<br />\r\n<span style=\"color:#FE2E64;font-weight:bold;text-decoration:none;\">詳しくは<br />\r\n<span style=\"color:#FF00BF;font-weight:bold;text-decoration:underline;font-size:18px;\">オフィシャルホームページ</span><br />\r\nをご覧ください！&nbsp;</span><br />\r\n<br />\r\n年中無休！！<br />\r\nいつでもご利用ください！！</div>\r\n</div>\r\n\r\n<div style=\"border-top:1px solid #ffd700;padding:2px;\"><span style=\"color:#FC9610;font-size:18px;font-weight:bold;text-decoration:none;\">▼本日の出勤女性一覧はコチラ▼</span>\r\n\r\n<div style=\"border:#ffffe0 1px solid;margin:0 10px 10px 10px;padding:15px 0px 15px 0px;color:#F2E9EB;font-size:17px;font-weight:bold;text-decoration:none;background:#FC9610;\"><a href=\"https://www.purelovers.com/kanto/shop/61/schedule/\" style=\"text-decoration:none;\"><span style=\"color:#fff;font-weight:bold;text-decoration:none;font-size:20px;\">出勤情報</span>&nbsp;</a></div>\r\n</div>\r\n\r\n<div style=\"border-top:#ffd700 3px solid;border-bottom:#ffd700 3px solid;margin:5px 0px;padding-top:5px;padding-bottom:5px;padding-left:0px;padding-right:0px;font-size:22px;color:#F456BA;font-weight:bold;background:#2ECC4B;\">&nbsp;</div>\r\n\r\n<div style=\"font-size:12px;color:#000;text-align:left;\">※注意事項※<br />\r\n・ハニープラザのご利用が初めてのお客様のみご利用頂けます。<br />\r\n・他割引とは併用できません。<br />\r\n・入会金、指名料は別途となります。<br />\r\n・18時以降はプラス2,000円になります。</div>\r\n</div>\r\n</div>\r\n</div>",
        "remarks": "・ハニープラザのご利用が初めてのお客様のみご利用頂けます。\r\n・他割引とは併用できません。\r\n・入会金、指名料は別途となります。\r\n・18時以降はプラス2,000円になります。",
        "is_not_sokuhime": [],
        "is_commuting": [
          {
            "name": "ハニー"
          },
          {
            "name": "るり"
          },
          {
            "name": "あいな"
          },
          {
            "name": "もえか"
          },
          {
            "name": "みき"
          },
          {
            "name": "みこと"
          },
          {
            "name": "ちよ"
          },
          {
            "name": "めいさ"
          }
        ]
      }
    }

  //   content = {
  //     "admin_site_url":"https://fuzoku.jp/entry/login",
  //     "login_id":"koiirog1",
  //     "login_pass":"koiirog2",
  //     "selenium_name":"tenpo_sokuho.py",
  //     "site_selenium_name":"fuzoku_japan",
  //     "user_id":"1",
  //     "content_id":1068,
  //     "content_info":{
  //        "title":"☆60分7,000円で美少女と…♪☆ご新規様限定キャンペーン!!",
  //        "cke_source":"<div style=\"background:#fff; color:#000; font-size:14px; line-height:1.2; text-align:center; font-family: ヒラギノ明朝 Pro W6, Hiragino Mincho Pro, HGS明朝E, ＭＳ Ｐ明朝, serif;\">\r\n<div style=\"display:block; margin:0 auto; \r\nfont-size:16px; line-height:1.2;\">\r\n<div style=\"width:100%;margin:0 auto;\">\r\n<div style=\"background:#008DFF;height:6px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FF5580;height:5px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#FFFF00;height:4px;\">&nbsp;</div>\r\n\r\n<div style=\"background:#501480;height:3px;\">&nbsp;</div>\r\n\r\n<div style=\"border-top:2px solid #2DC849;border-bottom:2px solid #2DC849;text-align:center;color:rgb(68,68,68);font-family:&#039;Hiragino Kaku Gothic ProN&#039;, &#039;メイリオ&#039;, sans-serif;\">\r\n<div style=\"margin:0px;background:#F1F1F1;padding:0;\">\r\n<div style=\"background:#000000;padding-top:10px;padding-bottom:10px;\"><span style=\"font-size:28px;color:#ffffe0;font-weight:bold;\">ご新規様限定!!</span><br />\r\n<span style=\"font-size:14px;color:#FF6A0C;font-weight:bold;\">ご新規様特別プラン♪<br />\r\n最高峰エステ<br />\r\n厳選された美少女があなた様のために<br />\r\n密着エロマッサージをさせて頂きます。</span></div>\r\n\r\n<div style=\"margin:0 1px;padding:5px;line-height:1.5;font-weight:bold;font-size:20px;\"><span style=\"color:#FF5580;\">【採用率15％】</span><br />\r\n<span style=\"color:#0096FF;\">【清楚系美少女のみ採用】</span><br />\r\n<span style=\"color:#FFA500;\">【密着型やみつきエステ】</span></div>\r\n\r\n<div style=\"padding:0 1px;text-align:center;line-height:1.5;\">\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#FF6A0C;color:#fffacd;padding:3px;font-size:15px;font-weight:normal;\">▼料金プラン▼</div>\r\n\r\n<div style=\"background:#fffaf0;border:#F5E90B 1px solid;color:#000001;\">\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"width:250px;margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">60分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>11,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">7,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#ffffff;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">90分　</span><br />\r\n<span style=\"font-size:15px;\"><strike>17,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">12,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n\r\n<div style=\"background:#e6e6e6;\">\r\n<div style=\"margin:0 auto;font-size:22px;padding:3px;\"><span style=\"padding:3px;color:#0000ff;\">120分</span><br />\r\n<span style=\"font-size:15px;\"><strike>23,980円</strike>&rArr;</span>&nbsp;<span style=\"padding:3px;color:#ff0000;font-size:28px;\">&nbsp;<span style=\"color:#ff0000;font-weight:bold;\">17,000円!!</span>&nbsp;</span></div>\r\n</div>\r\n<span style=\"color:#696969;font-size:15px;\">※入会金　指名料金は別途頂きます。</span></div>\r\n<span style=\"color:#ff00ff;\">▼　▼　▼</span>\r\n\r\n<div style=\"color:rgb(62,88,102);font-size:16px;font-weight:bold;padding:0 1px;\">\r\n<div style=\"background:#1EAF5F;color:#ffff00;padding:3px;font-size:20px;font-weight:bold;\">90分コース</div>\r\n\r\n<div style=\"background:#ffe6ec;border:#1EAF5F 1px solid;color:#000001;\">\r\n<div style=\"background:#e6fff1;\">\r\n<div style=\"margin:0 auto;font-size:18px;padding:3px;color:#0000ff;\">いちゃいちゃシャワータイム<br />\r\n&darr;<br />\r\n上半身密着マッサージ<br />\r\n&darr;<br />\r\n下半身密着マッサージ<br />\r\n&darr;<br />\r\n睾丸、おしりマッサージ<br />\r\n&darr;<br />\r\n性感プレー</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<div style=\"border-top:5px solid #F5E90B;border-bottom:5px solid #F5E90B;\">\r\n<div style=\"background:#ffffff;margin:0 1px;padding:5px;line-height:1.5;border-bottom:1px solid #F5E90B;\">&nbsp;</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" /></div>\r\n\r\n<div style=\"color:#ffffff; display:block; margin:0 auto; padding:5px 10px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;\r\nborder:1px solid #c7ac00;\r\nbackground:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c62d1f), color-stop(1, #f24437));\r\nbackground:-moz-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-webkit-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-o-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:-ms-linear-gradient(top, #c62d1f 5%, #f24437 100%);\r\nbackground:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);\r\nbackground-color:#c62d1f;\r\n\"><a href=\"http://koiiro.gakuen.tokyo/maga/\" style=\"color:#fff; font-weight:bold; padding:5px 0px 5px 0px; display:block; \r\n text-decoration:none;  font-size:20px;\">http://koiiro.gakuen.tokyo/maga/&nbsp;</a></div>\r\n<span style=\"font-size:12px; color:#0000ff;\">▲メルマガ登録ページへ▲&nbsp;</span>\r\n\r\n<hr style=\"border:none; width: 100%; text-align: center; padding-bottom: 1px;\r\nbackground:#FF0C39;\r\nbackground: -moz-linear-gradient(left,  rgba(255,12,57,0) 0%, rgba(255,12,57,1) 50%, rgba(255,12,57,0) 100%);\r\nbackground: -webkit-linear-gradient(left,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\r\nbackground: linear-gradient(to right,  rgba(255,12,57,0) 0%,rgba(255,12,57,1) 50%,rgba(255,12,57,0) 100%);\" />\r\n<div style=\"margin:5px 0; padding:3px;\"><span style=\"display:block; margin:0 auto; text-decoration:none; padding:3px;\r\n-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;border:1px solid #0000ff;\r\nfont-size:18px; font-weight:bold; \">TEL:03-6277-4621&nbsp;</span>&nbsp;<span style=\"font-size:12px; color:#0000ff;\">&nbsp;▲お電話でのご予約▲&nbsp;</span><br />\r\n<br />\r\n<span style=\"font-size:18px;\">24時間営業&nbsp;</span></div>\r\n\r\n<div style=\"border-top:2px solid #000001; border-bottom:2px solid #000001; padding:5px 0; margin-top:6px;\"><a href=\"https://fuzoku.jp/koiirogakuentokyo/\" style=\"display:block; max-width:220px; margin:0 auto; text-decoration:none;\"><img src=\"http://smart.koiiro.gakuen.tokyo/img/common/logo.png\" style=\"width:100%;\" />&nbsp;<span style=\"font-size:12px; color:#000001;\">&nbsp;▲お店ページはコチラ▲&nbsp;</span>&nbsp;</a></div>\r\n\r\n<div style=\"font-size:12px; line-height:1.2; text-align:left; padding:5px;\">■注意事項<br />\r\n※電話またはメール予約にて&nbsp;｢新規割引を見た｣と必ずお伝え下さい</div>\r\n</div>",
  //        "category":"お得情報",
  //        "image":"contents-images/1/1068/private_template/1002/image.jpg",
  //        "is_not_sokuhime":[
            
  //        ],
  //        "is_commuting":[
  //           {
  //              "name":"臼井 百合香"
  //           },
  //           {
  //              "name":"秋月 梨花"
  //           }
  //        ]
  //     }
  //  }

    let contentUpdate = new PureLovers(content, page);
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

    // if (typeof updateResult === 'undefined') {
    //   var updateResult;
    //   // コンテンツ実行
    //   switch (contentName) {
    //     // イベント1段目
    //     case 'event_regist_1_update':
    //       updateResult = await contentUpdate.setEventRegist1Update();
    //       break;
    //     // イベント2段目
    //     case 'event_regist_2_update':
    //       updateResult = await contentUpdate.setEventRegist2Update();
    //       break;
    //     // イベント3段目
    //     case 'event_regist_3_update':
    //       updateResult = await contentUpdate.setEventRegist3Update();
    //       break;
    //     // イベント4段目
    //     case 'event_regist_4_update':
    //       updateResult = await contentUpdate.setEventRegist4Update();
    //       break;
    //     // イベント5段目
    //     case 'event_regist_5_update':
    //       updateResult = await contentUpdate.setEventRegist5Update();
    //       break;
    //     // 業界最安値1段目
    //     case 'gyokai_lowest_price_1_update':
    //       updateResult = await contentUpdate.setGyokaiLowestPrice1Update();
    //       break;
    //     // 業界最安値2段目
    //     case 'gyokai_lowest_price_2_update':
    //       updateResult = await contentUpdate.setGyokaiLowestPrice2Update();
    //       break;
    //     // 口コミクーポン
    //     case 'kuchikomi_coupon_update':
    //       updateResult = await contentUpdate.setKuchikomiCouponUpdate();
    //       break;
    //     // クーポン1段目
    //     case 'waribiki_coupon_1_update':
    //       updateResult = await contentUpdate.setWaribikiCoupon1Update();
    //       break;
    //     // クーポン2段目
    //     case 'waribiki_coupon_2_update':
    //       updateResult = await contentUpdate.setWaribikiCoupon2Update();
    //       break;
    //     // クーポン3段目
    //     case 'waribiki_coupon_3_update':
    //       updateResult = await contentUpdate.setWaribikiCoupon3Update();
    //       break;
    //     default:
    //       updateResult = commonFunction.unauthorizedAccess;
    //       updateResult['endAt'] = startAt;
    //   }

    // }

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
};

class PureLovers {
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
    // // イベント登録URL
    // this.eventUpdateUrl = 'https://www.purelovers.com/shop/edit-event/';
    // // 業界最安値URL
    // this.GyokaiLowestPriceUpdateUrl = 'https://www.purelovers.com/shop/low-price-new/index/';
    // // クーポンURL
    // this.couponUpdateUrl = 'https://www.purelovers.com/shop/edit-coupon';
  }

  // ログイン処理
  async login() {
    // 管理者ログイン画面に遷移
    await this.page.goto(this.adminSiteUrl);
    await this.page.type('input[name="username"]', this.loginId);
    await this.page.type('input[name="password"]', this.loginPass);
    const submitButton = await this.page.$('button[name="login_btn"]');

    // ログインボタン押下
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      submitButton.click(),
    ]);

    // ログイン判定
    if (this.page.url() == this.adminSiteUrl) {
      return false;
    } else {
      return true;
    }
  }

}

  // // イベント1段目
  // async setEventRegist1Update() {
  //   return this.setEvent(1);
  // }

  // // イベント2段目
  // async setEventRegist2Update() {
  //   return this.setEvent(2);
  // }

  // // イベント3段目
  // async setEventRegist3Update() {
  //   return this.setEvent(3);
  // }

  // // イベント4段目
  // async setEventRegist4Update() {
  //   return this.setEvent(4);
  // }

  // // イベント5段目
  // async setEventRegist5Update() {
  //   return this.setEvent(5);
  // }

  // // イベント共通処理
  // async setEvent(order) {
  //   console.log('イベント共通処理' + order);

  //   // 「イベント登録」へ遷移
  //   const eventUpdate = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.goto(this.eventUpdateUrl)
  //   ]);

  //   // イベント並び順
  //   let resultOrders = await this.page.$$('#order');
  //   let orders = [];
  //   for (const resultOrder of resultOrders) {
  //     orders.push(await (await resultOrder.getProperty('value')).jsonValue());
  //   }

  //   var index = orders.indexOf(String(order));

  //   if (index === NULL_EVENT && order >= 1 && order <= EVENT_NUM) {
  //     index = orders.indexOf('');
  //   }

  //   // イベントID取得
  //   let resultSelector = await this.page.$$('div.editArea');
  //   let eventId = await (await resultSelector[index].getProperty('id')).jsonValue();

  //   // 更新するイベントを空欄にする
  //   const clearLink = await this.page.$$('a[class="clear"]');
  //   await Promise.all([
  //     clearLink[index].click(),
  //     this.page.on('dialog', async dialog => {
  //       dialog.accept(); // OK
  //     })
  //   ]);

  //   // イベント並び順設定
  //   await this.page.type('select[name="event[' + eventId + '][order]"]', String(order));

  //   // イベント開始日設定
  //   // 本日が選択されていた場合
  //   if (this.contentInfo.start_type === '本日') {
  //     // イベント開始日の本日ボタンクリック
  //     let todayOpen = await this.page.$$('.today_open');
  //     await todayOpen[index].click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.start_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#open_year_' + eventId, String(tomorrow.getFullYear()));
  //     await this.page.select('#open_month_' + eventId, String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#open_day_' + eventId, String(tomorrow.getDate()));
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#open_year_' + eventId, this.contentInfo.start_year);
  //     await this.page.select('#open_month_' + eventId, this.contentInfo.start_month);
  //     await this.page.select('#open_day_' + eventId, this.contentInfo.start_day);
  //   }

  //   // 事前公開設定
  //   if (this.contentInfo.is_previous) {
  //     await this.page.click('input[name="event[' + eventId + '][previous]"]');
  //   }

  //   // イベント終了日設定
  //   // 本日が選択されていた場合
  //   if (this.contentInfo.end_type === '本日') {
  //     // イベント終了日の本日ボタンクリック
  //     let todayClose = await this.page.$$('.today_close');
  //     await todayClose[index].click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.end_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#close_year_' + eventId, String(tomorrow.getFullYear()));
  //     await this.page.select('#close_month_' + eventId, String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#close_day_' + eventId, String(tomorrow.getDate()));
  //   // 無期限が選択された場合
  //   } else if (this.contentInfo.end_type === '無期限') {
  //     await this.page.click('input[name="event[' + eventId + '][endless]"]');
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#close_year_' + eventId, this.contentInfo.end_year);
  //     await this.page.select('#close_month_' + eventId, this.contentInfo.end_month);
  //     await this.page.select('#close_day_' + eventId, this.contentInfo.end_day);
  //   }

  //   // イベントタイトル設定
  //   await this.page.type('input[name="event[' + eventId + '][title]"]', this.contentInfo.title)

  //   // 画像アップロード
  //   if (this.contentInfo.image.length > 0) {
  //     const filenames = await commonFunction.uploadImage(this.contentInfo.image);
  //     // 保存したローカルパス
  //     console.log(filenames);
  //     if (filenames.length === 0) {
  //       var error_code = '251';
  //       var response = await this.page.content();
  //       var ret = '';
  //       return commonFunction.stopProgram(error_code, response, ret);
  //     }
  //     // ファイルアップロード
  //     await this.page.waitForSelector('input[type="file"]');
  //     let inputFiles = await this.page.$$('input[type="file"]');
  //     await inputFiles[index].uploadFile(filenames);
  //   }

  //   // イベント内容各段のソースボタンの番号
  //   let cke_source_btn_ids = {
  //     0: '18',
  //     1: '52',
  //     2: '84',
  //     3: '116',
  //     4: '148'
  //   };

  //   // イベント内容の設定
  //   let ckeId = cke_source_btn_ids[index];
  //   await commonFunction.inputCke(ckeId, this.contentInfo, this.page);

  //   // イベント利用条件設定
  //   await this.page.type('textarea[name="event[' + eventId + '][remarks]"]', this.contentInfo.remarks);

  //   // 確認ボタンをクリック
  //   const confirmForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.click('input[name="submit_button"]'),
  //   ]);
  //   console.log('確認ボタン押しました');
  //   await page.waitFor(5000);

  //   // エラー確認
  //   var alertMessages = await this.page.$$('p[class="alert"]');
  //   if (alertMessages.length > 0) {
  //     var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
  //     var error_code = '301';
  //     var response = await this.page.content();
  //     return commonFunction.stopProgram(error_code, response, ret);
  //   }

  //   // 登録ボタンをクリック
  //   // const registForm = await Promise.all([
  //   //   this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //   //   this.page.click('input[value="登録"]')
  //   // ]);

  //   // var error_code = '100';
  //   // var response = await this.page.content();
  //   // var ret = '';
  //   // return commonFunction.stopProgram(error_code, response, ret);
  // }

  // // 業界最安値1段目
  // async setGyokaiLowestPrice1Update() {
  //   return this.setGyokaiLowestPrice(1);
  // }

  // // 業界最安値2段目
  // async setGyokaiLowestPrice2Update() {
  //   return this.setGyokaiLowestPrice(2);
  // }

  // // 業界最安値共通処理
  // async setGyokaiLowestPrice(index) {
  //   console.log('業界最安値共通処理' + index);

  //   // 業界最安値へ遷移
  //   const eventUpdate = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.goto(this.GyokaiLowestPriceUpdateUrl),
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] })
  //   ]);

  //   // 契約外時のエラー処理
  //   let Message = await this.page.$('.guideArea > p');
  //   var errorMessage = await (await Message.getProperty('textContent')).jsonValue();
  //   if (errorMessage === 'ご契約中の契約プランではご利用になれない機能です。') {
  //     console.log('ご契約中の契約プランではご利用になれない機能です。')
  //     var response = await this.page.content();
  //     var error_code = '301';
  //     var ret = 'ご契約中の契約プランではご利用になれない機能です。';
  //     return commonFunction.stopProgram(error_code, response, ret);
  //   }

  //   // 公開設定確認処理
  //   if (this.contentInfo.state === '公開') {
  //     var state = [];
  //     var sum = 0;
  //     let publishStates = await this.page.$$('.status > p');
  //     for (const publishState of publishStates) {
  //       if ((await (await publishState.getProperty('textContent')).jsonValue()).includes('公開中')) {
  //         state.push(1);
  //         sum += 1;
  //       } else {
  //         state.push(0);
  //       }
  //     }

  //     if (sum > 0 && state[index - INDEX_CORRECTION] !== PUBLIC) {
  //       console.log('変更が必要');
  //       let lowPriceLink = await this.page.$$('.valRight > a');
  //       if (index === SECOND) {
  //         var order = SECOND;
  //       } else {
  //         var order = FIRST;
  //       }

  //       await Promise.all([
  //         this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //         await lowPriceLink[order].click()
  //       ]);

  //       // 非公開に設定
  //       await this.page.evaluate(() => document.querySelector('#state_2').checked = true);

  //       // 確認ボタンをクリック
  //       const confirmForm = await Promise.all([
  //         this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //         this.page.click('input[name="submit_button"]')
  //       ]);

  //       // 登録ボタンをクリック
  //       const registForm = await Promise.all([
  //         this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //         this.page.click('input[value="登録"]')
  //       ]);

  //       // 業界最安値へ遷移
  //       const eventUpdate = await Promise.all([
  //         this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //         this.page.goto(this.GyokaiLowestPriceUpdateUrl),
  //         this.page.waitForNavigation({ waitUntil: ['load', 'load'] })
  //       ]);
  //     }
  //   }

  //   // 更新するクーポンをクリック
  //   let lowPriceLink = await this.page.$$('.valRight > a');

  //   const lowPriceForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     await lowPriceLink[index - INDEX_CORRECTION].click()
  //   ]);

  //   // 本日が選択されていた場合
  //   if (this.contentInfo.open_type === '本日') {
  //     // 開始日の本日ボタンクリック
  //     let todayOpen = await this.page.$('.today_open');
  //     await todayOpen.click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.open_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#open_year', String(tomorrow.getFullYear()));
  //     await this.page.select('#open_month', String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#open_day', String(tomorrow.getDate()));
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#open_year', this.contentInfo.open_year);
  //     await this.page.select('#open_month', this.contentInfo.open_month);
  //     await this.page.select('#open_day', this.contentInfo.open_day);
  //   }

  //   // 終了日設定
  //   // 本日が選択されていた場合
  //   if (this.contentInfo.close_type === '本日') {
  //     // 終了日の本日ボタンクリック
  //     let todayClose = await this.page.$('.today_close');
  //     await todayClose.click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.close_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#close_year', String(tomorrow.getFullYear()));
  //     await this.page.select('#close_month', String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#close_day', String(tomorrow.getDate()));
  //   // 無期限が選択されていた場合
  //   } else if (this.contentInfo.close_type === '無期限') {
  //     let endlessFlag = await this.page.$('#endless[checked="checked"]');
  //     if (!endlessFlag) {
  //       await this.page.click('#endless');
  //     }
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#close_year', this.contentInfo.close_year);
  //     await this.page.select('#close_month', this.contentInfo.close_month);
  //     await this.page.select('#close_day', this.contentInfo.close_day);
  //   }

  //   // イメージ画像
  //   if (this.contentInfo.shop_img_type === '画像をアップロードする') {
  //     await this.page.evaluate(() => document.querySelector('#shop_img_type2').checked = true);
  //     // 画像アップロード
  //     const filenames = await commonFunction.uploadImage(this.contentInfo.upload_file);

  //     // ファイルアップロード
  //     await this.page.waitForSelector('input[type="file"]');
  //     let inputFiles = await this.page.$('input[type="file"]');
  //     await inputFiles.uploadFile(filenames);
  //   } else {
  //     await this.page.evaluate(() => document.querySelector('#shop_img_type1').checked = true);
  //     // 女性名を取得
  //     var girlsName = {};
  //     let girlsId = await this.page.$$('#girl_crypt_id > option');
  //     for (var i = 0; i < girlsId.length; i++) {
  //       var girlName = await (await girlsId[i].getProperty('textContent')).jsonValue();
  //       var girlId = await (await girlsId[i].getProperty('value')).jsonValue();
  //       girlsName[girlName] = girlId;
  //     }
  //     if (this.contentInfo.shop_img_type in girlsName) {
  //       await this.page.select('#girl_crypt_id', girlsName[this.contentInfo.shop_img_type]);
  //     } else {
  //       var error_code = '215';
  //       var response = await this.page.content();
  //       var ret = this.contentInfo.shop_img_type;

  //       return commonFunction.stopProgram(error_code, response, ret);
  //     }
  //   }

  //   // イベントタイトル設定
  //   await this.page.evaluate(() => document.querySelector('input[name="title"]').value = '');
  //   await this.page.type('input[name="title"]', this.contentInfo.title);

  //   // 入会金
  //   await this.page.evaluate(() => document.querySelector('input[name="admission_price"]').value = '');
  //   await this.page.type('input[name="admission_price"]', this.contentInfo.admission_price);
  //   await this.page.evaluate(() => document.querySelector('input[name="discount_admission_price"]').value = '');
  //   await this.page.type('input[name="discount_admission_price"]', this.contentInfo.discount_admission_price);

  //   // 指名・フリー
  //   let nominationList = { '指名料金': '1', '写真指名': '2', 'ネット指名': '3', 'フリー': '4', '本指名': '5', '場内指名': '6' }
  //   await this.page.select('#nomination_name', nominationList[this.contentInfo.nomination_name]);
  //   await this.page.evaluate(() => document.querySelector('input[name="nomination_price"]').value = '');
  //   await this.page.type('input[name="nomination_price"]', this.contentInfo.nomination_price);
  //   await this.page.evaluate(() => document.querySelector('input[name="discount_nomination_price"]').value = '');
  //   await this.page.type('input[name="discount_nomination_price"]', this.contentInfo.discount_nomination_price);

  //   // コース料金・時間
  //   await this.page.evaluate(() => document.querySelector('input[name="course_name"]').value = '');
  //   await this.page.type('input[name="course_name"]', this.contentInfo.course_price);
  //   await this.page.evaluate(() => document.querySelector('input[name="course_time"]').value = '');
  //   await this.page.type('input[name="course_time"]', this.contentInfo.course_time);
  //   await this.page.evaluate(() => document.querySelector('input[name="course_price"]').value = '');
  //   await this.page.type('input[name="course_price"]', this.contentInfo.course_price);
  //   await this.page.evaluate(() => document.querySelector('input[name="discount_course_time"]').value = '');
  //   await this.page.type('input[name="discount_course_time"]', this.contentInfo.discount_course_time);
  //   await this.page.evaluate(() => document.querySelector('input[name="discount_course_price"]').value = '');
  //   await this.page.type('input[name="discount_course_price"]', this.contentInfo.discount_course_price);

  //   // オプション1~5
  //   for (var i = 1; i <= OPTION_NUM; i++) {
  //     await this.page.evaluate((i) => { document.querySelector('input[name="option_name' + String(i) + '"]').value = '' }, i);
  //     await this.page.type('input[name="option_name' + String(i) + '"]', this.contentInfo['option_name_' + String(i)]);
  //     await this.page.evaluate((i) => { document.querySelector('input[name="option_price' + String(i) + '"]').value = '' }, i);
  //     await this.page.type('input[name="option_price' + String(i) + '"]', this.contentInfo['option_price_' + String(i)]);
  //     await this.page.evaluate((i) => { document.querySelector('input[name="discount_option_price' + String(i) + '"]').value = '' }, i);
  //     await this.page.type('input[name="discount_option_price' + String(i) + '"]', this.contentInfo['discount_option_price_' + String(i)]);
  //   }

  //   // ホテル代
  //   if (this.contentInfo.hotel_charge_type === '別途') {
  //     await this.page.evaluate(() => document.querySelector('input[name="hotel_charge_type"][value="1"]').checked = true);
  //   } else {
  //     await this.page.evaluate(() => document.querySelector('input[name="hotel_charge_type"][value="2"]').checked = true);
  //   }

  //   // 交通費
  //   if (this.contentInfo.transportation_charge_type === '別途') {
  //     await this.page.evaluate(() => document.querySelector('input[name="transportation_charge_type"][value="1"]').checked = true);
  //   } else {
  //     await this.page.evaluate(() => document.querySelector('input[name="transportation_charge_type"][value="2"]').checked = true);
  //   }

  //   // ご新規限定
  //   if (this.contentInfo.new_customer_only) {
  //     await this.page.click('input[name="new_customer_only"]');
  //   }

  //   // オールタイム
  //   if (this.contentInfo.all_time) {
  //     await this.page.click('input[name="all_time"]');
  //   }

  //   // 口コミ必須
  //   if (this.contentInfo.reviews_required) {
  //     await this.page.click('input[name="reviews_required"]');
  //   }

  //   // フリーワード入力欄数取得
  //   var freeWord = await this.page.$$('input[name*="condition_free_word_list"]');
  //   var clickNum = FREE_WORD_NUM - freeWord.length;

  //   // 入力欄を追加
  //   if (clickNum > 0) {
  //     for (var k = 1; k <= clickNum; k++) {
  //       await Promise.all([
  //         this.page.click('#column-button'),
  //       ]);
  //     }
  //   }

  //   // 追加入力欄
  //   var addFreeWord = await this.page.$$('input[name="condition_free_word_list[]"]');

  //   var k = 0;
  //   var j = INDEX_CORRECTION;
  //   // フリーワード入力
  //   for (var i = 1; i <= FREE_WORD_NUM; i++) {
  //     if (i <= freeWord.length) {
  //       await this.page.evaluate((i, j) => { document.querySelector('input[name="condition_free_word_list[' + String(i - j) + ']"]').value = '' }, i, j);
  //       await this.page.type('input[name="condition_free_word_list[' + String(i - INDEX_CORRECTION) + ']"]', this.contentInfo['condition_free_word_list_' + String(i)]);
  //     } else {
  //       addFreeWord[k].type(this.contentInfo['condition_free_word_list_' + String(i)]);
  //       k++;
  //       await commonFunction.sleep(500);
  //     }
  //   }

  //   // 公開設定
  //   if (this.contentInfo.state === '公開') {
  //     await this.page.evaluate(() => document.querySelector('#state_1').checked = true);
  //   } else {
  //     await this.page.evaluate(() => document.querySelector('#state_2').checked = true);
  //   }

  //   // 確認ボタンをクリック
  //   const confirmForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.click('input[name="submit_button"]')
  //   ]);

  //   // エラー確認
  //   var alertMessages = await this.page.$$('p[class="alert"]');
  //   if (alertMessages.length > 0) {
  //     var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
  //     var error_code = '301';
  //     var response = await this.page.content();
  //     return commonFunction.stopProgram(error_code, response, ret);
  //   }

  //   // 登録ボタンをクリック
  //   const registForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.click('input[value="登録"]')
  //   ]);

  //   var error_code = '100';
  //   var response = await this.page.content();
  //   var ret = '';
  //   return commonFunction.stopProgram(error_code, response, ret);
  // }

  // // 口コミクーポン
  // async setKuchikomiCouponUpdate() {
  //   return this.setCoupon(0);
  // }

  // // クーポン1段目
  // async setWaribikiCoupon1Update() {
  //   return this.setCoupon(1);
  // }

  // // クーポン2段目
  // async setWaribikiCoupon2Update() {
  //   return this.setCoupon(2);
  // }

  // // クーポン3段目
  // async setWaribikiCoupon3Update() {
  //   return this.setCoupon(3);
  // }

  // // クーポン
  // async setCoupon(index) {
  //   console.log('クーポン共通処理' + index);

  //   // 「割引クーポンの登録」へ遷移
  //   const eventUpdate = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.goto(this.couponUpdateUrl)
  //   ]);

  //   // 更新するイベントを空欄にする
  //   await Promise.all([
  //     this.page.click('#clear_' + String(index)),
  //     this.page.on('dialog', async dialog => {
  //       dialog.accept(); // OK
  //     })
  //   ]);

  //   // 並び順設定
  //   // if (index != this.kuchikomiCoupon) {
  //   if (index != KUCHIKOMI_COUPON) {
  //     await this.page.type('select[name="list[' + index + '][order]"]', String(index));
  //   }

  //   // 有効期限開始日設定
  //   // 本日が選択されていた場合
  //   if (this.contentInfo.start_type === '本日') {
  //     // 有効期限開始日の本日ボタンクリック
  //     let todayOpen = await this.page.$$('.today_open');
  //     await todayOpen[index].click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.start_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#open_year_' + index, String(tomorrow.getFullYear()));
  //     await this.page.select('#open_month_' + index, String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#open_day_' + index, String(tomorrow.getDate()));
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#open_year_' + index, this.contentInfo.start_year);
  //     await this.page.select('#open_month_' + index, this.contentInfo.start_month);
  //     await this.page.select('#open_day_' + index, this.contentInfo.start_day);
  //   }

  //   // 事前公開設定
  //   if (this.contentInfo.is_previous) {
  //     await this.page.click('input[name="list[' + index + '][previous_flag]"]');
  //   }

  //   // 有効期限終了日設定
  //   // 本日が選択されていた場合
  //   if (this.contentInfo.end_type === '本日') {
  //     // 有効期限終了日の本日ボタンクリック
  //     let todayClose = await this.page.$$('.today_close');
  //     await todayClose[index].click();
  //   // 明日が選択されていた場合
  //   } else if (this.contentInfo.end_type === '明日') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + ONE_DAY);
  //     await this.page.select('#close_year_' + index, String(tomorrow.getFullYear()));
  //     await this.page.select('#close_month_' + index, String(tomorrow.getMonth() + ONE_MONTH));
  //     await this.page.select('#close_day_' + index, String(tomorrow.getDate()));
  //   // 無期限が選択されていた場合
  //   } else if (this.contentInfo.end_type === '無期限') {
  //     await this.page.click('input[name="list[' + index + '][endless_flag]"]');
  //   // 右欄から指定するが選択されていた場合
  //   } else {
  //     await this.page.select('#close_year_' + index, this.contentInfo.end_year);
  //     await this.page.select('#close_month_' + index, this.contentInfo.end_month);
  //     await this.page.select('#close_day_' + index, this.contentInfo.end_day);
  //   }

  //   // クーポン内容
  //   var content = await commonFunction.parseTextarea(this.contentInfo.content);
  //   // console.log(content);
  //   await this.page.type('textarea[name="list[' + index + '][comment]"]', content);

  //   // 投稿者確認方法
  //   // if (index === this.kuchikomiCoupon) {
  //   if (index === KUCHIKOMI_COUPON) {
  //     if (this.contentInfo.proof_method === 'マイページ画面の提示') {
  //       await this.page.evaluate((index) => {
  //         document.querySelector('input[name="list[' + index + '][proof_method]"][value="0"]').checked = true;
  //       }, index);
  //     } else if (this.contentInfo.proof_method === 'クーポンコードの申告') {
  //       await this.page.evaluate((index) => {
  //         document.querySelector('input[name="list[' + index + '][proof_method]"][value="1"]').checked = true;
  //       }, index);
  //       await this.page.type('input[name="list[' + index + '][code]"]', this.contentInfo.code);
  //     } else {
  //       await this.page.evaluate((index) => {
  //         document.querySelector('input[name="list[' + index + '][proof_method]"][value="2"]').checked = true;
  //       }, index);
  //     }
  //   }

  //   // クーポン利用条件 
  //   var condition = await commonFunction.parseTextarea(this.contentInfo.condition);
  //   await this.page.type('textarea[name="list[' + index + '][condition]"]', condition);

  //   // 確認ボタンをクリック
  //   const confirmForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.click('input[name="submit_button"]')
  //   ]);

  //   // エラー確認
  //   var alertMessages = await this.page.$$('p[class="alert"]');
  //   if (alertMessages.length > 0) {
  //     var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
  //     var error_code = '301';
  //     var response = await this.page.content();
  //     return commonFunction.stopProgram(error_code, response, ret);
  //   }

  //   // 登録ボタンをクリック
  //   const registForm = await Promise.all([
  //     this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
  //     this.page.click('input[value="登録"]')
  //   ]);

  //   var error_code = '100';
  //   var response = await this.page.content();
  //   var ret = '';
  //   return commonFunction.stopProgram(error_code, response, ret);
  // }

// }

