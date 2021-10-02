const chromium = require('chrome-aws-lambda');
const AWS = require("aws-sdk");
AWS.config.update({ region: 'ap-northeast-1' });
// const rdsdataservice = new AWS.RDSDataService();
const fs = require('fs');
const { exit } = require('process');

const SQL_STATEMENT = 'INSERT INTO update_results (user_id, content_id, is_success, code, update_type, update_method, start_at, end_at, message, source) VALUES (:user_id, :content_id, :is_success, :code, :update_type, :update_method, :start_at, :end_at, :message, :source)';
const DB_SECRETS_STORE_ARN = 'arn:aws:secretsmanager:ap-northeast-1:995476726295:secret:utopia-bk-dev-rds-secret-WeroS9';
const DB_AURORA_CLUSTER_ARN = 'arn:aws:rds:ap-northeast-1:995476726295:cluster:utopia-bk-dev-db';
const DATA_BASE_NAME = 'auto_update';
const SCHEMA = 'auto_update';
// const DB_SECRETS_STORE_ARN = process.env.DBSecretsStoreArn;
// const DB_AURORA_CLUSTER_ARN = process.env.DBAuroraClusterArn;
// const DATA_BASE_NAME = process.env.dataBaseName;
// const SCHEMA = process.env.schema;

/**
 * プログラムエラー
 * @param {Object} response 
 * @returns 
 */
exports.programError = async function (response) {
  var errorCode = '413';
  var ret = '';
  return this.stopProgram(errorCode, response, ret);
}

/**
 * エラーメッセージ結合出現タイプ
 * @param {Object} elements エラーメッセージの配列
 * @returns {String} errorMessage エラーメッセージ
 */
exports.confirmErrorMessageAppearance = async function (elements) {
  var errorMessage = '';
  for (var element of elements) {

    errorMessage += await (await element.getProperty('textContent')).jsonValue() + ' ';
  }
  return errorMessage;
}

/**
 * CKeditor入力
 * @param {番号} ckeId 
 * @param {本文} content 
 * @param {html} page 
 * @returns 
 */
exports.inputCke = async function (ckeId, content, page) {
  let ckeSource = await page.$('#cke_' + ckeId);
  await Promise.all([
      ckeSource.click()
  ]);
  var content = parseCkeHtmlWithoutUnescape(content.content);
  await page.waitForSelector('.cke_source');
  await Promise.all([
      page.type('.cke_source', content)
  ]);
  return;
}

/**
 * 画像アップロード
 * @param {String} image 
 * @returns filenames
 */
exports.uploadImage = async function (image) {
  var s3 = new AWS.S3();
  const s3BucketName = 'utopia-bk-auto-update-dev';
  var localFilePath = '/tmp/';
  var s3Params = {
    Bucket: s3BucketName,
    Key: image
  };
  const getS3Object = async (s3Params, localFilePath) => {
    return new Promise((resolve) => {
      s3.getObject(s3Params, function (err, data) {
        if (err) {
          /**
           * エラー時は空で返す
           */
          resolve('');
        } else {
          var filePath = localFilePath + 'test.png'
          fs.writeFileSync(filePath, data.Body);
          resolve(filePath);
        }
      })
    });
  }
  const filenames = await getS3Object(s3Params, localFilePath);
  return filenames;
}

/**
 * プログラム終了処理
 * @param {Number} code 
 * @param {String} response 
 * @param {String} ret 
 * @returns {Object} updateResult
 */
exports.stopProgram = function stopProgram(code, response, ret) {
  /**
   * エラコードの説明
   * @type {Object} errorCode エラーコード：エラーメッセージの連想配列
   */
  const errorCode = {
    100: '正常に処理を実行しました。',
    101: '開始時刻を修正して更新しました。',
    102: '終了時刻を修正して更新しました。',
    103: '開始時刻と終了時刻を修正して更新しました。',
    104: '有効期限を修正して更新しました。',
    105: '更新できましたが、終了時刻、または、有効期限の日時が過去の為、お客様から閲覧ができません。',
    106: '女性の名前を取得しました。',
    
    200: '登録されている情報でログインできませんでした。',
    201: '必須項目が入力されていないため、更新できませんでした。',
    211: '年齢は18以上99以下で指定してください。',
    212: '対象の女性が媒体に存在しませんでした。',
    213: '女性が重複しています。女性名の再確認をお願いします。',
    214: '対象の女性が現在非表示中の為選択できません。',
    215: 'さんは媒体上に存在しませんでした。',
    230: '開始時刻の指定が誤っています。',
    231: '終了時刻の指定が誤っています。',
    232: '開始時刻が終了時刻より未来の日時になっています。',
    233: '有効期限の指定が誤っています。',
    234: '終了時刻、または、有効期限が過去の日時になっています。',
    235: '開始時刻が過去の日時になっています。',
    236: '入店日の指定が誤っています。',
    250: '投稿内容が前回と同じであるため更新できませんでした。',
    251: '画像ファイルが破損しているため更新できませんでした。画像ファイルの再確認をお願いします。',
    252: '動画ファイルが破損しているため更新できませんでした。動画ファイルの再確認をお願いします。',
    253: '',

    /**
     * 300番台 媒体仕様により更新できず
     */
    300: '】と表示されたため更新できませんでした。',
    301: '',
    310: '残回数が0回のため更新できませんでした。',
    312: 'まで更新できません',
    313: '登録可能な上限のため、登録できませんでした。',
    314: '更新できないコンテンツです。ご契約プランのご確認をお願いします。',
    315: '対象のページへ移動する事ができませんでした。',
    316: '残回数の取得ができませんでした。',
    317: '媒体側のアクセス集中、またはネットワーク等の問題で接続できませんでした。',
    318: '審査が完了するまでご利用になれません。',
    319: '対象のクーポンはありません。',
    330: '現在出勤している女性が1人もいないため更新できませんでした。',
    331: 'これ以上女性を登録できません。',
    332: '登録できる女性がいません。',
    333: '途中で登録可能な上限に達したため処理を中断しました。',
    334: '登録できるステータスではありません。',
    400: '媒体に接続できませんでした。',
    401: 'S3に接続できませんでした。',
    410: '媒体側のアクセス集中、またはネットワーク等の問題で接続できませんでした。',
    411: '媒体に接続ができませんでした。',
    412: '媒体側のアクセス集中、またはネットワーク等の問題で接続できませんでした。',
    413: '媒体側のアクセス集中、またはネットワーク等の問題で接続できませんでした。'
  }

  /**
   * 更新終了時間を取得
   * @type {String} endAt
   */
  var endAt = new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '');

  /**
   * 更新データの連想配列
   * @type {object} updateResult
   * @params {Number} code エラーコード
   * @params {String} message エラーメッセージ
   * @params {String} endAt 更新終了時間
   * @params {String} response 更新終了時のhtml
   */
  updateResult = {
    'code': String(code),
    'message': ret + errorCode[code],
    'endAt': String(endAt),
    'source': String(response)
  };

  return updateResult;
}

/**
 * 更新結果DB登録
 * @param {Object} event 更新データの連想配列
 * @param {Object} updateResult 更新結果の連想配列
 * @returns 
 */
exports.registDatabase = async function (event, updateResult) {
  try {
    var transactionBeginParams = {
      resourceArn: DB_AURORA_CLUSTER_ARN,
      secretArn: DB_SECRETS_STORE_ARN,
      database: DATA_BASE_NAME,
      schema: SCHEMA
    };
    /**
     * トランザクション開始
     * @param {Object} params 
     * @returns 
     */
    const beginTransaction = async (params) => {
      return new Promise((resolve) => {
        rdsdataservice.beginTransaction(params, function (err, data) {
          if (err) console.log(err, err.stack); // エラー発生時
          else resolve(data);           // 成功時レスポンス
        });
      });
    }
    const beginTransactionData = await beginTransaction(transactionBeginParams);
    /**
     * トランザクションIDの取得
     */
    var transactionId = beginTransactionData.transactionId;
    var is_success = 0;
    if (updateResult.code === '100') {
      is_success = 1;
    }
    var insertParams = {
      resourceArn: DB_AURORA_CLUSTER_ARN,
      secretArn: DB_SECRETS_STORE_ARN,
      sql: SQL_STATEMENT,
      // continueAfterTimeout: true,
      database: DATA_BASE_NAME,
      includeResultMetadata: false,
      parameters: [
        {
          name: 'user_id',
          value: { 'longValue': event['user_id'] }
        },
        {
          name: 'content_id',
          value: { 'longValue': event['content_id'] }
        },
        {
          name: 'is_success',
          value: { 'longValue': is_success }
        },
        {
          name: 'code',
          value: { 'longValue': updateResult.code }
        },
        {
          name: 'update_type',
          value: { 'longValue': 0 }
        },
        {
          name: 'update_method',
          value: { 'longValue': 1 }
        },
        {
          name: 'start_at',
          value: { 'stringValue': updateResult.startAt }
        },
        {
          name: 'end_at',
          value: { 'stringValue': updateResult.endAt }
        },
        {
          name: 'message',
          value: { 'stringValue': updateResult.message },
        },
        {
          name: 'source',
          value: { 'blobValue': updateResult.source },
        },
      ],
      schema: SCHEMA,
      transactionId: transactionId
    };
    /**
     * クエリ実行
     * @param {Object} params 
     * @returns 
     */
    const executeStatement = async (params) => {
      return new Promise((resolve) => {
        rdsdataservice.executeStatement(params, function (err, data) {
          if (err) console.log(err, err.stack); // エラー発生時
          else resolve('executeStatement');           // 成功時レスポンス
        });
      });
    }
    var commitParams = {
      resourceArn: DB_AURORA_CLUSTER_ARN,
      secretArn: DB_SECRETS_STORE_ARN,
      transactionId: transactionId
    };
    /**
     * コミット
     * @param {Object} params 
     * @returns 
     */
    const commitTransaction = async (params) => {
      return new Promise((resolve) => {
        rdsdataservice.commitTransaction(params, function (err, data) {
          if (err) console.log(err, err.stack); // エラー発生時
          else resolve('コミット');           // 成功時レスポンス
        })
      });
    }
    /**
     * クエリの実行
     */
    await executeStatement(insertParams);
    /**
     * コミット
     */
    await commitTransaction(commitParams);

    delete updateResult.source;
    updateResult['contentName'] = event['selenium_name'].replace('.py', '');
    result = updateResult;
  } catch (error) {
    console.log(error)
    console.log('ロールバック');
    var rollbackParams = {
      resourceArn: DB_AURORA_CLUSTER_ARN,
      secretArn: DB_SECRETS_STORE_ARN,
      transactionId: transactionId
    };
    const rollbackTransaction = async (params) => {
      return new Promise((resolve) => {
        rdsdataservice.rollbackTransaction(params, function (err, data) {
          if (err) console.log(err, err.stack); // エラー発生時
          else resolve('コミット');           // 成功時レスポンス
        })
      });
    }
    var response = await rollbackTransaction(rollbackParams);

    result = 'fail';
  }
  return result;
}

/**
 * 待機処理(ミリ秒)
 * @param {Number} delay 
 * @returns 
 */
exports.sleep = async function (delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * htmlパース
 * @param {String} string 
 * @returns string
 */
exports.parseTextarea = async function (string) {
  return string.replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
  // return string.replace('\r', '\\r').replace('\n', '\\n').replace('\/', '/').replace('\'', '');
}

/**
 * 該当するコンテンツがない場合に返す連想配列
 * @type {Object}
 */
exports.unauthorizedAccess = {
  code: '301',
  message: '該当するコンテンツはありません。',
  source: ''
}

/**
 * CKEditorのhtmlパースunescape無し版
 * @param {String} string 
 * @returns string
 */
function parseCkeHtmlWithoutUnescape(string) {
  return string.replace("'", '').replace('\r', '').replace('\n', '').replace('\/', '/').replace('\'', '');
}
