const lambda = require('./FuzokuJapan.js');

/**
 * とりあつ空っぽで（設定も可能）
 */
const event = "{'test': 'local_lambda'}";
const context = "";

/**
 * callackの定義
 * @param {*} error 
 * @param {Object} result 
 */
function callback(error, result){

    /**
     * まあ、書かなくても大丈夫
     */
    if(typeof error !== 'null'){
        console.error(result);
        process.exit(1);
    }
    console.log(result);
    process.exit(0);
}

/**
 * 呼び出し
 */
// lambda.handler(event, context, callback);
