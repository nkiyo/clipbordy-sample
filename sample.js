// 参考URL
// タブ区切りテキストのパース => https://stackoverflow.com/a/48670873
// split関数の失敗チェック => https://stackoverflow.com/a/20578787
import clipboard from 'clipboardy';

// クリップボードを読んでJSON化する
// 以下、動作サンプル
// クリップボードの内容：
//   3	Vampire Weekend『Father of the Bride』
//   5	小袋成彬『Piercing』
// msgの内容：
//   [{"id":"3","msg":"Vampire Weekend『Father of the Bride』"},{"id":"5","msg":"小袋成彬『Piercing』"}]
//
// TODO
// 想定していない構成のテキストをクリップボードから受け取った場合のエラーチェック
//   => split結果の検証方法？
const msgs = clipboard.readSync()
           .split('\r\n')
           .map(e => {
              //const [id, msg] = e.split('\t');
              const columns = e.split('\t');
              if(columns.length == 2) {
                const id = columns[0]
                const msg = columns[1]
                return {id, msg}
              } else {
                return undefined
              }
});

if(msgs.some(e => !e)) { // falsy check
  console.log(`parse failed`)
} else {
  console.log(`${JSON.stringify(msgs)}`)
}
