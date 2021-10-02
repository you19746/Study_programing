
exports.sayHello = function () {
  console.log('Hello!');
} 


// プログラム終了
exports.stopProgram = function (response, error_code, ret, startDate) {

  console.log('プログラム終了');
  // エラーコード
  const errorCode = {
      100: '正常に処理を実行しました。',
      200: '登録されている情報でログインできませんでした。',
      230: '開始時刻の指定が誤っています。',
      231: '終了時刻の指定が誤っています。',
      232: '開始時刻が終了時刻より未来の日時になっています。',
      250: '投稿内容が前回と同じであるため更新できませんでした。',
      251: '画像ファイルが破損しているため更新できませんでした。画像ファイルの再確認をお願いします。',
      252: '動画ファイルが破損しているため更新できませんでした。動画ファイルの再確認をお願いします。',
      253: '画像ファイルが添付されていません。画像ファイルの再確認をお願いします。',
      // 300番台 媒体仕様により更新できず
      301: ''
  }
  try {
      var sourceBase64 = btoa(response.content);
  } catch {
      var sourceBase64 = '';
  }

  var startAt = startDate.toISOString().
      replace(/T/, ' ').
      replace(/\..+/, '');

  var endAt = new Date().toISOString().
      replace(/T/, ' ').
      replace(/\..+/, '');

  // 更新データ
  ret = {
      'code'      :String(error_code),
      'message'   :ret + errorCode[error_code],
      'startAt'  :String(startAt),
      'endAt'    :String(endAt),
      'source'    :sourceBase64
  };


  // tmpファイル削除
  // ************************

  console.log('プログラム終了');
  console.log(ret);

  return ret;
}