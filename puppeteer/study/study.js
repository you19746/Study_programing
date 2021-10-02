const puppeteer = require('puppeteer');
// ああそうだった

(async (event, context, callback) => {

  let result = null;
  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: false,  // ヘッドレスモードオフ
      defaultViewport: null,  //画面サイズ
      slowMo: 10  //遅延時間
    });

    // ブラウザを立ち上げる
    page = await browser.newPage();

    // ユーザーエージェント
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    //JSON形式
    content = {
      "admin_site_url": "https://amzn.to/3FaZW9k",
      "login_id": "you_wist@yahoo.co.jp",
      "login_pass": "kurosyati",
      "content_name": "amazon_movie",
      "site_selenium_name": "amazon_prime",
      "content_info": {
        "search": "カナリア",
      }
    };

    let contentUpdate = new Study(content, page);
    // ログイン処理
    let loginResponse = await contentUpdate.login();

    // コンテンツ名取得
    const contentName = content['content_name'];

    if (typeof updateResult === 'undefined') {
      var updateResult;
      // コンテンツ実行
      switch (contentName) {
        // 店舗速報
        case 'amazon_movie':
          updateResult = await contentUpdate.setMovie();
          break;

        case '':
          updateResult = await contentUpdate.setEvent();
          break;

        default:
          updateResult = commonFunction.unauthorizedAccess;
          updateResult['endAt'] = startAt;
      }

    }

  } catch (error) {
    // return callback(error);
    return console.log('エラーが発生したので、終了します');
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  // return callback(null, result);
  return console.log('正常終了しました');
})();

//  -------------------
// 練習クラス
//  -------------------
class Study {
  constructor(contentInfo, page) {
    this.page = page;
    // 管理者画面URL
    this.adminSiteUrl = contentInfo.admin_site_url;
    // ログインID
    this.loginId = contentInfo.login_id;
    // ログインPASS
    this.loginPass = contentInfo.login_pass;
    // コンテンツ名
    this.contentName = contentInfo.content_name;
    // コンテンツ情報
    this.contentInfo = contentInfo.content_info;
  }

  // ログイン処理
  async login() {
    // 管理者ログイン画面に遷移
    await this.page.goto(this.adminSiteUrl);
    await this.page.waitForTimeout(1000);

    // ID入力して次に進む
    await this.page.type('input[name="email"]', this.loginId);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      await this.page.click('input[id="continue"]'),
    ]);

    // ログイン判定
    if (this.page.url() === 'https://www.amazon.co.jp/ap/signin') {
      console.log('ログインエラー')
      await browser.close();
    }
    
    // パスワードを入力
    await this.page.type('input[name="password"]', this.loginPass);

    // ログインボタン押下
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      await this.page.click('input[id="signInSubmit"]'),
    ]);

    // ログイン判定
    if (this.page.url() === 'https://www.amazon.co.jp/ap/signin') {
      console.log('ログインエラー')
      await browser.close();
    } else {
      return true;
    }
  }
//  -------------------
//   ムービーコンテンツ
// --------------------
async setMovie(){

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

  // 残回数判定処理
  if(remainingCount === ZERO){
    console.log('残回数が無いため、処理を終了します。');
    return;
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

  // ローカルファイルでテスト
  const filename = this.contentInfo.local_image;
  if(filename.length === 1){
    console.log('画像ファイルが破損しているため更新できませんでした。画像ファイルの再確認をお願いします。')
    var error_code = '251';
    var response = await this.page.content();
    var ret = '';
  }

  // ファイルアップロード
  await this.page.waitForSelector('input[type="file"]');
  let inputFile = await this.page.$('input[type="file"]');
  inputFile.uploadFile(filename);

  // エラー確認
  var alertMessages = await this.page.$$('div.error_comment');
  if (alertMessages.length > 0) {
    console.log('入力が完了していません');
    await this.page.close();
    var ret = await commonFunction.confirmErrorMessageAppearance(alertMessages);
    var error_code = '301';
    var response = await this.page.content();
  }
  // 正常更新
  console.log('投稿完了しました。');
  var error_code = '100';
  var response = await this.page.content();
  var ret = '';
  return;

  }

//  -------------------
//   ○○コンテンツ
// --------------------
async setTest(){
  }
};