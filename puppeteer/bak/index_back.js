const chromium = require('chrome-aws-lambda');
const AWS = require("aws-sdk");
AWS.config.update({ region: 'ap-northeast-1' });
const KMS = new AWS.KMS();
// const rdsdataservice = new AWS.RDSDataService();
const fs = require('fs');
const { exit } = require('process');
var commonFunction = require('./commonfunction.js');

// 更新開始時間（現在の日付）取得
const startDate = new Date();
console.log(startDate);



exports.handler = async (event, context, callback) => {

  // event = {
  //   Records: [
  //     {
  //       messageId: '3180f51e-0569-4795-86e9-eb1513d76904',
  //       receiptHandle: 'AQEBFb2+dRKCVFYW1NOPC0UBI+zkq51yuUokcfic937mEv9NP9i4ITQkY5UlRPqWD0uMl5TodNfFVmrGrNFj6ble/hXsWXYG9v+Dk7o4WN6zd6j7zpmAO3SncqMmwlLU387G4RmCr+yTWIYtABgQV681GB0k5cxsYii4TYUAJMUJt7oMO8lxa+CkFvhuVM5NrOX8Z4BESdJk9uT6z8rmCsHtsuKJnL0ygo7iyJeXwODrW3NFYvldwARxBIOw8UxE0ZQkpAG9/9yL9kb4hJg0h/OUS1GA0wTK1URCyzvY0PbbJcoTTAnfydnbGtNh3Iw29KN4',
  //       body: '{"admin_site_url": "https://www.purelovers.com/shop/login/", "login_id": "seifukutengoku", "login_pass": "G8XYEh5HDKV8", "site_division": "sales", "selenium_name": "gyokai_lowest_price_1_update.py", "site_selenium_name": "pure_lovers", "user_id": 18, "content_id": 540, "content_info": {"open_type": "\\u53f3\\u6b04\\u304b\\u3089\\u65e5\\u4ed8\\u3092\\u6307\\u5b9a", "open_year": "2021", "open_month": "7", "open_day": "1", "close_type": "\\u7121\\u671f\\u9650", "close_year": "2021", "close_month": "1", "close_day": "1", "shop_img_type": "\\u753b\\u50cf\\u3092\\u30a2\\u30c3\\u30d7\\u30ed\\u30fc\\u30c9\\u3059\\u308b", "upload_file": "contents-images/18/6507/private_template/6882/upload_file.jpg", "title": "\\u696d\\u754c\\u6fc0\\u9707", "admission_price": "2000", "discount_admission_price": "2000", "nomination_name": "\\u6307\\u540d\\u6599\\u91d1", "nomination_price": "2000", "discount_nomination_price": "1000", "course_name": "\\u696d\\u754c\\u6700\\u5b89\\u5024", "course_time": "40", "course_price": "13000", "discount_course_time": "40", "discount_course_price": "10000", "option_name_1": "", "option_price_1": "", "discount_option_price_1": "", "option_name_2": "", "option_price_2": "", "discount_option_price_2": "", "option_name_3": "", "option_price_3": "", "discount_option_price_3": "", "option_name_4": "", "option_price_4": "", "discount_option_price_4": "", "option_name_5": "", "option_price_5": "", "discount_option_price_5": "", "hotel_charge_type": "\\u8fbc", "transportation_charge_type": "\\u5225\\u9014", "new_customer_only": 1, "all_time": 0, "reviews_required": 0, "condition_free_word_list_1": "\\u4eca\\u5e74\\u3082\\u3084\\u3089\\u305b\\u3066\\u9802\\u304d\\u307e\\u3059\\uff3e\\uff3e\\u3054\\u65b0\\u898f\\u69d8\\u9650\\u5b9a\\u3067\\u300c\\u5272\\u5f15\\uff08`\\u30fb\\u76bf\\u30fb\\u00b4\\uff09\\u300d\\u958b\\u50ac\\u2606", "condition_free_word_list_2": "\\u30b3\\u30b9\\u30c1\\u30e5\\u30fc\\u30e040\\u7a2e\\u985e\\u4ee5\\u4e0a+\\u30a4\\u30e1\\u30fc\\u30b8\\u30b3\\u30fc\\u30b9\\uff08\\u604b\\u4eba\\u30fb\\u75f4\\u6f22\\u30fb\\u591c\\u9019\\u3044\\uff09\\u5168\\u3066\\u304c\\u7121\\u6599\\u3067\\u3059\\u266a", "condition_free_word_list_3": "", "condition_free_word_list_4": "\\u25c7\\u5165\\u4f1a\\u91d1\\u8fbc \\u25c7\\u6307\\u540d\\u6599\\u5225\\u9014\\uff08\\uffe52,000\\uff09\\u25c7\\u3054\\u65b0\\u898f\\u69d8\\u9650\\u5b9a\\u25c7\\u30db\\u30c6\\u30eb\\u4ee3\\u5225\\u9014", "condition_free_word_list_5": "\\u30aa\\u30fc\\u30eb\\u30bf\\u30a4\\u30e0", "condition_free_word_list_6": "\\u203b\\u300c\\u3074\\u3085\\u3042\\u3089\\u3070\\u7279\\u8a2d\\u30b3\\u30fc\\u30b9\\u300d\\u3068\\u306a\\u308a\\u307e\\u3059", "state": "\\u975e\\u516c\\u958b"}, "is_not_sokuhime": [], "is_commuting": [{"name": "\\u307e\\u307f\\u3044"}, {"name": "\\u308a\\u3046"}, {"name": "\\u308a\\u3044\\u306a"}, {"name": "\\u307f\\u3044\\u304b"}, {"name": "\\u3042\\u3084\\u306a"}, {"name": "\\u3042\\u304a"}, {"name": "\\u307f\\u304b\\u3093"}, {"name": "\\u306d\\u308b"}, {"name": "\\u307f\\u3084"}, {"name": "\\u3057\\u3044\\u306a"}, {"name": "\\u3048\\u306a"}, {"name": "\\u304b\\u306a"}]}',
  //       attributes: [Object],
  //       messageAttributes: [Object],
  //       md5OfMessageAttributes: '4311486491bdee69c41d244c86467cbe',
  //       md5OfBody: '1125c76fc2e502827973d44b75a01d47',
  //       eventSource: 'aws:sqs',
  //       eventSourceARN: 'arn:aws:sqs:ap-northeast-1:995476726295:dev_post_pure_lovers.fifo',
  //       awsRegion: 'ap-northeast-1'
  //     }
  //   ]
  // };


  // console.log('送信されてきたデータ');
  // console.log(event);
  
  // var tmp_body = event['Records'][0]['body'];
  // var all_content_info = JSON.parse(tmp_body);
 //  var event = all_content_info;

  // console.log(event);
  // return;

  let result = null;
  let browser = null;
  // var sqlStatement = 'INSERT INTO update_results (user_id, content_id, is_success, code, update_type, update_method, start_at, end_at, message) VALUES (:user_id, :content_id, :is_success, :code, :update_type, :update_method, :start_at, :end_at, :message)';
  // var DBSecretsStoreArn = 'arn:aws:secretsmanager:ap-northeast-1:995476726295:secret:utopia-bk-dev-rds-secret-WeroS9';
  // var DBAuroraClusterArn = 'arn:aws:rds:ap-northeast-1:995476726295:cluster:utopia-bk-dev-db';
  // var dataBaseName = 'auto_update';
  // var schema = 'auto_update';

  try {
    browser = await chromium.puppeteer.launch({
      headless: false,
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
    event = { "admin_site_url": "https:\/\/www.purelovers.com\/shop\/login\/", "login_id": "ekimae4033", "login_pass": "bpMmPs3W", "selenium_name": "event_regist_1_update.py", "site_selenium_name": "pure_lovers", "user_id": "2", "content_id": "235", "content_info": { "start_type": "右欄から選択する", "start_year": "2021", "start_month": "9", "start_day": "1", "is_previous": "1", "end_type": "右欄から選択する", "end_year": "2021", "end_month": "11", "end_day": "1", "is_endless": "0", "title": "ご新規様限定★50分8,000円！最安！安心！可愛い！", "image": "contents-images\/2\/3257\/private_template\/2969\/image.jpg", "content": "<div style=\"background:none;\">\r\n<div style=\"background:#fff;border:#ffffff 0px solid;text-align:center;line-height:1.4;font-family:&#039;ヒラギノ角ゴ Pro W3&#039;, &#039;Hiragino Kaku Gothic Pro&#039;, &#039;メイリオ&#039;, Meiryo, Osaka, &#039;ＭＳ Ｐゴシック&#039;, &#039;MS PGothic&#039;, sans-serif;\">\r\n<div style=\"border-left:1px #ffd700 solid;border-right:1px #ffd700 solid;\">\r\n<div style=\"background:#2ECC4B;border-top:3px #ffd700 solid;border-bottom:3px #ffd700 solid;padding:10px 0px 10px;\"><span style=\"text-decoration:none;font-size:24px;color:#ffffe0;font-weight:bold;\">★ご新規様限定割引★&nbsp;<\/span><\/div>\r\n\r\n<div style=\"background:#ffffff;margin:10px 10px 10px;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;color:#00008b;font-size:16px;text-align:center;line-height:1.2;\">\r\n<div style=\"color:#04B4AE;font-weight:bold;padding-top:3px;\">『ハニープラザ』を<br \/>\r\n初めてご利用頂くお客様へ<br \/>\r\n<br \/>\r\n当店の可愛い素人女性を<br \/>\r\nご新規様特別料金にて<br \/>\r\nご案内させていただきます。<\/div>\r\n\r\n<div style=\"font-size:16px;padding-top:5px;\"><span style=\"font-size:28px;\">【 <span style=\"color:#FF8000;font-weight:bold;\">新規割<\/span>】料金<\/span><br \/>\r\n<span style=\"font-weight:bold;color:#2E64FE;\">―――――▼10時～18時▼―――――<\/span><br \/>\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★50分　11,000円<\/span><br \/>\r\n&darr;3,000円OFF&darr;<br \/>\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">8,000円<\/span><br \/>\r\n<br \/>\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★70分　15,000円<\/span><br \/>\r\n&darr;3,500円OFF&darr;<br \/>\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">11,500円<\/span><br \/>\r\n<br \/>\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★90分　19,000円<\/span><br \/>\r\n&darr;4,000円OFF&darr;<br \/>\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">15,000円<\/span><br \/>\r\n<br \/>\r\n<span style=\"color:#2E64FE;font-weight:bold;\">★110分　23,000円<\/span><br \/>\r\n&darr;4,500円OFF&darr;<br \/>\r\n<span style=\"color:#FF0040;font-size:34px;font-weight:bold;\">18,500円<\/span><br \/>\r\n<br \/>\r\n※入会金別<br \/>\r\n※指名料別<br \/>\r\n※18時以降はプラス <span style=\"color:#FF0040;\">2,000円<\/span>になります。<br \/>\r\n&nbsp;<\/div>\r\n\r\n<div style=\"color:#04B4AE;font-weight:bold;border-top:1px solid #ffd700;padding:2px;\">メルマガ登録をして頂くと、<br \/>\r\n次回以降もお得に遊べる割引を<br \/>\r\nご用意しております♪<br \/>\r\n<br \/>\r\n<span style=\"color:#FE2E64;font-weight:bold;text-decoration:none;\">詳しくは<br \/>\r\n<span style=\"color:#FF00BF;font-weight:bold;text-decoration:underline;font-size:18px;\">オフィシャルホームページ<\/span><br \/>\r\nをご覧ください！&nbsp;<\/span><br \/>\r\n<br \/>\r\n年中無休！！<br \/>\r\nいつでもご利用ください！！<\/div>\r\n<\/div>\r\n\r\n<div style=\"border-top:1px solid #ffd700;padding:2px;\"><span style=\"color:#FC9610;font-size:18px;font-weight:bold;text-decoration:none;\">▼本日の出勤女性一覧はコチラ▼<\/span>\r\n\r\n<div style=\"border:#ffffe0 1px solid;margin:0 10px 10px 10px;padding:15px 0px 15px 0px;color:#F2E9EB;font-size:17px;font-weight:bold;text-decoration:none;background:#FC9610;\"><a href=\"https:\/\/www.purelovers.com\/kanto\/shop\/61\/schedule\/\" style=\"text-decoration:none;\"><span style=\"color:#fff;font-weight:bold;text-decoration:none;font-size:20px;\">出勤情報<\/span>&nbsp;<\/a><\/div>\r\n<\/div>\r\n\r\n<div style=\"border-top:#ffd700 3px solid;border-bottom:#ffd700 3px solid;margin:5px 0px;padding-top:5px;padding-bottom:5px;padding-left:0px;padding-right:0px;font-size:22px;color:#F456BA;font-weight:bold;background:#2ECC4B;\">&nbsp;<\/div>\r\n\r\n<div style=\"font-size:12px;color:#000;text-align:left;\">※注意事項※<br \/>\r\n・ハニープラザのご利用が初めてのお客様のみご利用頂けます。<br \/>\r\n・他割引とは併用できません。<br \/>\r\n・入会金、指名料は別途となります。<br \/>\r\n・18時以降はプラス2,000円になります。<\/div>\r\n<\/div>\r\n<\/div>\r\n<\/div>", "remarks": "・ハニープラザのご利用が初めてのお客様のみご利用頂けます。\r\n・他割引とは併用できません。\r\n・入会金、指名料は別途となります。\r\n・18時以降はプラス2,000円になります。", "is_not_sokuhime": [], "is_commuting": [{ "name": "ハニー" }, { "name": "るり" }, { "name": "あいな" }, { "name": "もえか" }, { "name": "みき" }, { "name": "みこと" }, { "name": "ちよ" }, { "name": "めいさ" }] } };
    
    let contentUpdate = new PureLovers(event, page);
    // ログイン処理
    let loginResponse = await contentUpdate.login();

    // if (!loginResponse) {
    //   // ログインエラーとしてDBに登録して終了
    // }
    // result = null;

    // コンテンツ名取得
    const contentName = event['selenium_name'].replace('.py', '');
    
    var updateResult;
    // コンテンツ実行
    switch (contentName) {
      case 'event_regist_1_update':
        console.log('イベント1段目');
        updateResult = await contentUpdate.commonEventRegistUpdate(1);
        break;
      case 'event_regist_2_update':
        console.log('イベント2段目');
        updateResult = await contentUpdate.commonEventRegistUpdate(2);
        break;
      case 'event_regist_3_update':
        console.log('イベント3段目');
        updateResult = await contentUpdate.commonEventRegistUpdate(3);
        break;
      case 'event_regist_4_update':
        console.log('イベント4段目');
        updateResult = await contentUpdate.commonEventRegistUpdate(4);
        break;
      case 'event_regist_5_update':
        console.log('イベント5段目');
        updateResult = await contentUpdate.commonEventRegistUpdate(5);
        break;
      case 'gyokai_lowest_price_1_update':
        console.log('業界最安値１段目');
        updateResult = await contentUpdate.commonGyokaiLowestPriceUpdate(1);
        console.log(updateResult);
        break;
      default:
        var response = '';
        var error_code = '301';
        var ret = '不正アクセスです。';
    
        return stopProgram(response, error_code, ret);
    }

  } catch (error) {
    console.log(error);
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  // try {

  //   var transactionBeginParamas = {
  //     resourceArn: DBAuroraClusterArn,
  //     secretArn: DBSecretsStoreArn,
  //     database: dataBaseName,
  //     schema: schema
  //   };

  //   // トランザクション開始
  //   const beginTransaction = async (params) => {
  //     return new Promise((resolve) => {
  //       rdsdataservice.beginTransaction(params, function (err, data) {
  //         if (err) console.log(err, err.stack); // エラー発生時
  //         else resolve(data);           // 成功時レスポンス
  //       });
  //     });
  //   };
    
  //   const beginTransactionData = await beginTransaction(transactionBeginParamas);
  //   // トランザクションID取得
  //   const transactionId = beginTransactionData.transactionId;
    
  //   // 登録用テストデータ
  //   // var updateResult = {
  //   //   'code'      : 235,
  //   //   'message'   : 'TestTestTest',
  //   //   'startAt'  : '2021-08-16 19:08:09',
  //   //   'endAt'    :'2021-08-16 19:08:09',
  //   //   'source'    :''
  //   // };
    
  //   console.log('登録内容');
  //   console.log(updateResult);
  //   console.log(event['content_id']);

    
  //   var insertParams = {
  //     resourceArn: DBAuroraClusterArn,
  //     secretArn: DBSecretsStoreArn,
  //     sql: sqlStatement,
  //     // continueAfterTimeout: true,
  //     database: 'auto_update',
  //     includeResultMetadata: false,
  //     parameters: [
  //       {
  //         name: 'user_id',
  //         value: { 'longValue': event['user_id'] }
  //       },
  //       {
  //         name: 'content_id',
  //         value: { 'longValue': event['content_id'] }
  //       },
  //       {
  //         name: 'is_success',
  //         value: { 'longValue': 1 }
  //       },
  //       {
  //         name: 'code',
  //         value: { 'longValue': updateResult.code }
  //       },
  //       {
  //         name: 'update_type',
  //         value: { 'longValue': 0 }
  //       },
  //       {
  //         name: 'update_method',
  //         value: { 'longValue': 1 }
  //       },
  //       {
  //         name: 'start_at',
  //         value: { 'stringValue': updateResult.startAt }
  //       },
  //       {
  //         name: 'end_at',
  //         value: { 'stringValue': updateResult.endAt }
  //       },
  //       {
  //         name: 'message',
  //         value: { 'stringValue': updateResult.message },
  //       },
  //     ],
  //     schema: schema,
  //     transactionId: transactionId
  //   };

  //   // クエリ実行
  //   const executeStatement = async (params) => {
  //     return new Promise((resolve) => {
  //       rdsdataservice.executeStatement(params, function (err, data) {
  //         if (err) console.log(err, err.stack); // エラー発生時
  //         else resolve('executeStatement');           // 成功時レスポンス
  //       });
  //     });
  //   }

  //   var commitParams = {
  //     resourceArn: DBAuroraClusterArn,
  //     secretArn: DBSecretsStoreArn,
  //     transactionId: transactionId
  //   };
  //   // コミット
  //   const commitTransaction = async (params) => {
  //     return new Promise((resolve) => {
  //       rdsdataservice.commitTransaction(params, function (err, data) {
  //         if (err) console.log(err, err.stack); // エラー発生時
  //         else resolve('コミット');           // 成功時レスポンス
  //       })
  //     });
  //   }
  //   // クエリの実行
  //   await executeStatement(insertParams);
  //   // コミット
  //   await commitTransaction(commitParams);

  // } catch (error) {
  //   console.log('ロールバック');
  // }

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
    // イベント登録URL
    this.eventUpdateUrl = 'https://www.purelovers.com/shop/edit-event/';
    // 業界最安値URL
    this.GyokaiLowestPriceUpdateUrl = 'https://www.purelovers.com/shop/low-price-new/index/';
  }

  // // ログイン処理
  async login() {
    // 管理者ログイン画面に遷移
    await this.page.goto(this.adminSiteUrl);
    await this.page.type('input[name="id"]', this.loginId);
    await this.page.type('input[name="password"]', this.loginPass);
    const submitButton = await this.page.$$('input[name="submit_button"]');

    // ログインボタン押下
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      submitButton[1].click(),
    ]);

    // ログイン判定
    if (this.page.url() == this.adminSiteUrl) {
      return false;
    } else {
      return true;
    }
  }

  // イベント共通処理
  async commonEventRegistUpdate(order){
    console.log('イベント共通処理' + order);
    console.log(this.page.url());

    // 「イベント登録」へ遷移
    const eventUpdate = await Promise.all([
      this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
      this.page.goto(this.eventUpdateUrl)
    ]);
    console.log(this.page.url());

    // イベント並び順
    let resultOrders = await this.page.$$('#order');
    let orders = [];
    for (let i = 0; i < resultOrders.length; i++) {
      orders.push(await (await resultOrders[i].getProperty('value')).jsonValue());
    }
    console.log(orders);

    var index = orders.indexOf(String(order));
    console.log(index);

    if (index === -1 && order >= 1 && order <= 5) {
      index = orders.indexOf('');
    }

    // イベントID取得
    let resultSelector = await this.page.$$('div.editArea');
    let eventId = await (await resultSelector[index].getProperty('id')).jsonValue();
    console.log(eventId);

    // 更新するイベントを空欄にする
    const clearLink = await this.page.$$('a[class="clear"]');
    const clearForm = await Promise.all([
      clearLink[index].click(),
      this.page.on('dialog', async dialog => {
        dialog.accept(); // OK
      })
    ]);

    // イベント並び順設定
    await this.page.type('select[name="event[' + eventId + '][order]"]', String(order));

    // イベント開始日設定
    // 本日が選択されていた場合
    if (this.contentInfo.start_type === '本日') {
      console.log('本日');
      // イベント開始日の本日ボタンクリック
      let todayOpen = await this.page.$$('.today_open');
      await todayOpen[index].click();
    // 明日が選択されていた場合
    } else if (this.contentInfo.start_type === '明日') {
      console.log('明日');
      const tomorrow = new Date();
      tomorrow.setDate( tomorrow.getDate() + 1 );
      await this.page.select('#open_year_' + eventId, String(tomorrow.getFullYear()));
      await this.page.select('#open_month_' + eventId, String(tomorrow.getMonth() + 1));
      await this.page.select('#open_day_' + eventId, String(tomorrow.getDate()));
    // 右欄から指定するが選択されていた場合
    } else {
      console.log('右欄から指定する');
      await this.page.select('#open_year_' + eventId, this.contentInfo.start_year);
      await this.page.select('#open_month_' + eventId, this.contentInfo.start_month);
      await this.page.select('#open_day_' + eventId, this.contentInfo.start_day);
    }

    if (this.contentInfo.is_previous) {
      console.log('事前公開');
      await this.page.click('input[name="event[' + eventId + '][previous]"]');
    }

    // イベント終了日設定
    // 本日が選択されていた場合
    if (this.contentInfo.end_type === '本日') {
      console.log('本日');
      // イベント終了日の本日ボタンクリック
      let todayClose = await this.page.$$('.today_close');
      await todayClose[index].click();
    // 明日が選択されていた場合
    } else if (this.contentInfo.end_type === '明日') {
      console.log('明日');
      const tomorrow = new Date();
      tomorrow.setDate( tomorrow.getDate() + 1 );
      await this.page.select('#close_year_' + eventId, String(tomorrow.getFullYear()));
      await this.page.select('#close_month_' + eventId, String(tomorrow.getMonth() + 1));
      await this.page.select('#close_day_' + eventId, String(tomorrow.getDate()));
    } else if (this.contentInfo.end_type === '無期限') {
      console.log('無期限');
      await this.page.click('input[name="event[' + eventId + '][endless]"]');
    // 右欄から指定するが選択されていた場合
    } else {
      console.log('右欄から指定する');
      await this.page.select('#close_year_' + eventId, this.contentInfo.end_year);
      await this.page.select('#close_month_' + eventId, this.contentInfo.end_month);
      await this.page.select('#close_day_' + eventId, this.contentInfo.end_day);
    }
    
    console.log(this.contentInfo.title);
    // イベントタイトル設定
    await this.page.type('input[name="event[' + eventId + '][title]"]', this.contentInfo.title)

    console.log(this.contentInfo.image);
    // 画像アップロード
    var s3 = new AWS.S3();
    const s3BucketName = 'utopia-bk-auto-update-dev';
    // Lambdaでは、/tmp/
    var localFilePath = '/tmp/';
    var s3Params = {
        Bucket: s3BucketName,
        Key: this.contentInfo.image
    };

    const getS3Object = async (s3Params, localFilePath) => {
        return new Promise((resolve) => {
            s3.getObject(s3Params, function (err, data) {
                if (err) {
                    // エラーの時の処理を入れてください。
                    console.log(err);
                } else {
                    var filePath = localFilePath + 'test.png'
                    fs.writeFileSync(filePath, data.Body);
                    resolve(filePath);
                }
            })
        });
    }

    const testPngFilePath = await getS3Object(s3Params, localFilePath);
    // 保存したローカルパス
    console.log(testPngFilePath);
    // ファイルアップロード
    await this.page.waitForSelector('input[type="file"]');
    let inputFiles = await this.page.$$('input[type="file"]');
    await inputFiles[index].uploadFile(testPngFilePath);

    // イベント内容各段のソースボタンの番号
    let cke_source_btn_ids = {
      0: '18',
      1: '52',
      2: '84',
      3: '116',
      4: '148'
    };

    // イベント内容の設定
    let cke_id = cke_source_btn_ids[index];
    console.log(cke_id);
    let ckeSource = await this.page.$$('#cke_' + cke_id);

    await ckeSource[0].click();
    var content = parseCkeHtml(this.contentInfo.content);
    const contentForm = await Promise.all([
      await this.page.type('.cke_source', content)
    ]);
    // console.log(content);


    // イベント利用条件設定
    await this.page.type('textarea[name="event[' + eventId + '][remarks]"]', this.contentInfo.remarks);
    
    // 確認ボタンをクリック
    const confirmForm = await Promise.all([
      this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
      this.page.click('input[name="submit_button"]')
    ]);
    console.log('確認ボタン押しました');
    await page.waitFor(5000);


    // 登録ボタンをクリック
    // const registForm = await Promise.all([
    //   this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
    //   this.page.click('input[value="登録"]')
    // ]);

    var response = '';
    var error_code = '100';
    var ret = '';

    return commonFunction.stopProgram(response, error_code, ret, startDate);

  }

  // 業界最安値共通処理
  async commonGyokaiLowestPriceUpdate(index) {
    console.log('業界最安値共通処理' + index);
    console.log(this.page.url());

    // 業界最安値へ遷移
    const eventUpdate = await Promise.all([
      this.page.waitForNavigation({ waitUntil: ['load', 'load'] }),
      this.page.goto(this.GyokaiLowestPriceUpdateUrl),
      this.page.waitForNavigation({ waitUntil: ['load', 'load'] })
    ]);
    console.log(this.page.url());
    // await this.page.setViewport({ width: 1280, height: 7200 });
    // await this.page.screenshot({ path: 'screenshot_1.png' });

    commonFunction.sayHello();
    // 契約外時のエラー処理
    
    let Message = await this.page.$('.guideArea > p');
    var errorMessage = await (await Message.getProperty('textContent')).jsonValue();
    console.log(errorMessage);
    if (errorMessage === 'ご契約中の契約プランではご利用になれない機能です。') {
      console.log('ご契約中の契約プランではご利用になれない機能です。')
      var response = '';
      var error_code = '301';
      var ret = 'ご契約中の契約プランではご利用になれない機能です。';
      return commonFunction.stopProgram(response, error_code, ret, startDate);
    }
    exit();
  }

}

// 待機処理(ミリ秒)
async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

// 特殊文字や改行の削除
function parseCkeHtml(string) {
  return string.replace("'", '').replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
}

