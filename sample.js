// 参考URL
// タブ区切りテキストのパース => https://stackoverflow.com/a/48670873
// split関数の失敗チェック => https://stackoverflow.com/a/20578787
import clipboard from 'clipboardy';
import { get } from 'lodash-es';

// クリップボードを読んでJSON化する
// 以下、動作サンプル
// クリップボードの内容：
//   3	Vampire Weekend『Father of the Bride』
//   5	小袋成彬『Piercing』
//   XX	ほげ『ほげ/ほげ』
// msgの内容：
//   [{"id":"3","msg":"Vampire Weekend『Father of the Bride』"},{"id":"5","msg":"小袋成彬『Piercing』"}]
//
// TODO
// 想定していない構成のテキストをクリップボードから受け取った場合のエラーチェック
//   => split結果の検証方法？
const textFromClipboard = clipboard.readSync()
console.log(`text from clipboard =>
${textFromClipboard}`)
const msgs = textFromClipboard
           .split('\r\n')
           .map(e => {
              const columns = e.split('\t');
              if(columns.length == 2) {
                const id = columns[0]
                const msg = columns[1]
                if(id && msg) {
                  return {id, msg}
                } else {
                  return null
                }
              } else {
                return null
              }
});

if(msgs.some(e => e === null)) {
  console.log(`parse failed`)
} else {
  //console.log(`json =>
//${JSON.stringify(msgs)}`)
}

const msgJson = {
  MM: "xx",
  YY: "xx",
  msgs: [],
  check: null,
  jirei: null
}
msgJson.MM = "06"
msgJson.YY = "07"
msgJson.msgs = msgs.filter(e => parseInt(e.id)) // idが整数を意味する文字列の場合
msgJson.check = get(msgs.find(e => !parseInt(e.id)), "msg") // idが整数以外を意味する文字列の場合
console.log(JSON.stringify(msgJson))

