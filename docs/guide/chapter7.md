---
sidebarDepth: 2
title: CHAPTER 7
---

# CH7 より大規模なアプリケーション開発

## S35 単一ファイルコンポーネントとは

<page-info page="221～225"/>

<code-caption>Exampleコンポーネント</code-caption>
```vue
<template>
  <div class="example">
    <span class="title">{{ text }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Example',
    data() {
      return {
        text: 'example'
      }
    }
  }
</script>

<!-- scoped CSS -->
<style scoped>
  .title {
    color: #ffbb00;
  }
</style>
```

## S38 Vue CLIの導入

<page-info page="231～237"/>

### フォルダとファイルの構成

<page-info page="234"/>

次のように、ルートコンストラクタのテンプレートを描画関数に変更してそれ以外はすべて「.vue」ファイルを使用することで、ランタイム限定ビルド（ややコンパクトサイズ）の Vue.js を利用できます。
テンプレートオプションを使用していると、コンパイルが必要になるためランタイム限定ビルドは利用できません。

<code-caption>main.js 変更前</code-caption>
```js
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

<code-caption>main.js 変更後</code-caption>
```js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

## S39 Vue.jsプラグイン

<page-info page="238～241"/>

### プラグインを自作してみよう

<page-info page="238"/>

<code-caption>スクロール数値を共有するプラグイン</code-caption>
```js
var windowPlugin = {
  install: function(Vue) {
    // プラグインデータ用にVueインスタンスを利用する
    var store = new Vue({
      data: {
        scrollY: 0
      }
    })
    // ウィンドウのスクロールイベントをハンドル
    var timer = null
    window.addEventListener('scroll', function() {
      if (timer === null) {
        timer = setTimeout(function() {
          // 200ms間隔でscrollYプロパティに代入
          store.scrollY = window.scrollY
          clearTimeout(timer)
          timer = null
        }, 200)
      }
    })
    // インスタンスプロパティに登録
    Vue.prototype.$window = store.$data
  }
}
```

<code-caption>プラグインを登録</code-caption>
```js
Vue.use(windowPlugin)
```

<code-caption>すべての Vue インスタンスで使用可能</code-caption>
```js
Vue.component('my-component', {
  template: '<div>{{ scrollY }}</div>',
  computed: {
    scrollY: function() {
      return this.$window.scrollY
    }
  }
})
```

## S40 ES2015 で書いてみよう

<page-info page="242～250"/>

### 変数宣言の書き方

<code-caption>再代入</code-caption>
```js
let x = 0
console.log(x++) // -> 1
const x = 0
console.log(x++) // -> Identifier 'x' has already been declared
```

<code-caption>スコープ</code-caption>
```js
{
  let x = 1
}
console.log(x) // -> x is not defined
```

<code-caption>配列を空にする</code-caption>
```js
const array = [1, 2]
array.push(3)
console.log(array) // -> (3) [1, 2, 3]
array.length = 0
console.log(array) // -> []
```

### 関数とメソッドの書き方

#### function の省略

<code-caption>Vue の this を使いたい場合はこれ！</code-caption>
```js
new Vue({
  methods: {
    handleClick() { ... }
  }
})
```

#### アロー関数

<code-caption>STEP1</code-caption>
```js
const newArray = array.map(el => {
  return el * 2
})
```

<code-caption>STEP2 return を省略</code-caption>
```js
const newArray = array.map(el => el * 2)
```

<code-caption>STEP3 複数の引数</code-caption>
```js
const newArray = array.map((el, index) => el * 2)
```

<code-caption>STEP4 オブジェクトの return</code-caption>
```js
const newArray = array.map(el => ({ value: el * 2 }))
```

### テンプレートリテラル

```js
const name = 'たま'
const template = `
  <div class="template">
    <strong>${ name }</strong>
  </div>`
console.log(template)
```

### プロパティのショートハンド

```js
const a = 'foo'
const b = 'bar'
const newObject = { a, b }
```

### 分割代入

```js
// 配列要素1,2をそれぞれ変数a,bに代入
const [a, b] = [1, 2]
console.log(a) // -> 1
// nameプロパティだけ代入
const { name } = { id: 1, name: 'りんご' }
console.log(name) // -> りんご
```

```js
function myFunction({ id, name }) {
  console.log(name) // -> りんご
}
myFunction({ id: 1, name: 'りんご' })
```

### スプレッド演算子

```js
const array = [1, 2, 3]
// バラバラの3つの引数として渡す
myFunction(...array)
// arrayを展開して4を加えた新しい一次配列を作成
const newArray = [...array, 4] // -> (4) [1, 2, 3, 4]
```

### 配列メソッド

#### find

```js
const array = [
  { id: 1, name: 'りんご' },
  { id: 2, name: 'ばなな' }
]
const result = array.find(el => el.id === 2)
console.log(result) // -> { id: 2, name: 'ばなな' }
```

#### findIndex

```js
const array = [
  { id: 1, name: 'りんご' },
  { id: 2, name: 'ばなな' }
]
const result = array.findIndex(el => el.id === 2)
console.log(result) // -> 1
```

### Promise

<code-caption>成功を知る</code-caption>
```js
function myFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功したことを通知
      resolve('success!')
    }, 1000)
  })
}
// 1秒後にmyFunctionが終わった知らせを受けてthenの処理が行われる
myFunction().then(value => {
  console.log(value) // -> success!
})
```

<code-caption>失敗を知る</code-caption>
```js
function myFunction(num) {
  return new Promise((resolve, reject) => {
    if (num < 10) {
      resolve('success!')
    } else {
      reject('error!')
    }
  })
}
myFunction(100).catch(value => {
  console.log(value) // -> error!
})
```

<code-caption>どっちでもいい</code-caption>
```js
myFunction().then().catch().finally(() => {
  // 成功でも失敗でも行われる
})
```