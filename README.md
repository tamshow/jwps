# Guidelines

## 概要

### 使用するToolについて

*   [material-icons.css](/)
*   [jquery.js](https://jquery.com/)
*   [lodash.js](https://lodash.com/)
*   [moment.js](https://momentjs.com/)
*   [swiper](http://idangero.us/swiper/)

### デバイス判定用

デバイスを判定してbodyタグに出力します。

`<body data-device="desktop" data-touch-device="true">`

#### 必要環境

*   Ruby 2.4.2
*   Node 8.4.0
*   npm 5.3.0
*   yarn 1.3.2


```
$ yarn install
```


#### 開発時

```
$ gulp serve
```

#### 公開時


```
$ gulp build
```



## コーディングマナー

*   メンテナンス性、可読性を意識したコーディングを心がけます。
*   拡張性、再利用性、柔軟性、効率を意識したルールを持たせます。
*   要素の追加・削除のし易さを心がけます。

使い回せそうなクラスがあったとしても、メンテナンス性を損なうのであれば無理に使い回しません。  
例えば別のクラスを用意して同じコードを記述します。

「Elements」や「Utility」のみでページ要素を組み立てることはしません。  
例えばクラスの組み合わせが3つ以上重複する場合は新たに「Snippets」を作成することを検討します。

また、新規スタイル追加作業は「Components」などではなく「Snippets」に作成することをお勧めします。

## 使い方・分類

#### Layoutとは

*   ページの基本レイアウト
*   Templatesはメインカラムレイアウトの1段組や2段組のパターンを選択します。
*   Gridはメインカラム内の段組レイアウトに使用します。
*   レイアウトの基本の型は次の並びになります。 `.l-main > .l-container > .l-block > .l-grid`
*   外枠に`.rich-editor`を指定することで、内包するタグに「Elements」の主要なベース装飾を指定可能です。  
    主にCMSのリッチエディタ等で使用するイメージな気がしています。  
    `.rich-editor`内では複雑なclassの装飾は使用出来ません。詳しくは[「RichEditor」](l-richeditor.html)を確認ください。  

#### Componentsとは

*   中規模の部品
*   主に一覧ページを構成する部品のような気がしています。
*   ベースのmargin-bottomとして`.is-mb-small`が設定されています。
*   要素間の間隔を制御する場合の汎用マージンボトムで調整します。  
    `.is-mb0`、`.is-mb-xs`、`.is-mb-small`、`.is-mb-medium`、`.is-mb-large`

#### Elementsとは

*   小規模の部品
*   主に詳細ページを構成する部品のような気がしています。
*   ベースのmargin-bottomとして`.is-mb-small`が設定されています。
*   要素間の間隔を制御する場合の汎用マージンボトムで調整します。  
    `.is-mb0`、`.is-mb-xs`、`.is-mb-small`、`.is-mb-medium`、`.is-mb-large`

#### Utilityとは

*   ツール、状態管理など
*   汎用ツールです。ここぞと言うときに力を発揮してくれる頼もしい味方です。

#### Snippetsとは

*   用途を絞ったパーツ
*   コード構造はそのまま使用することを想定しています。
*   特定箇所で使用することを想定としていますので汎用的な記述は必要ありません。
*   必ず`snippets`フォルダ内に配置され`._snippets`という接頭辞のクラスに属しています。
*   内包するclass名は`._body`のようにアンダースコアからはじまる物を使用します。
*   `._snippets-cv-group > ._body`



```
<div class="_snippets-cv-group">
  <div class="_head">
    <h2 class-"_title">タイトル</h2>
    </div>
    <div class="_body">
      <ul class="_list">
        <li>テキスト</li>
        <li>テキスト</li>
      </ul>
  </div>
</div>
```

## 対応ブラウザ

*   Internet Explorer11、Microsoft Edge 最新ver、Firefox 最新ver、Chrome 最新ver Safari 最新ver
*   スマートフォンOSに搭載されている標準のブラウザ
*   旧ブラウザは閲覧性を重視します。

## 命名規則

### 共通

*   単語の繋ぎはハイフン「 - 」を使用します。

### HTML

*   ファイル名はページタイトルを英語化します。

### img

*   固有のClass名がある場合は同じファイル名でも良いです。
*   `[要素]_[属性][連番]`

```bg_top.png
icon_arrow1.png
      </pre>

```

### CSS

#### 記述方法

*   接頭辞 + BEM記法、マルチクラス
*   `[接頭辞]-[塊]__[要素]--[属性]`
*   フォルダの先頭の文字を接頭辞として使用します。「assets/sass/以下」
*   パーツのメンテナンス性を重視ししてください。重複するパーツを作成しても構いません。
*   コンポーネント単位のclass名毎にscssファイルを作成してください。
*   新規スタイル追加箇所に迷った場合は「snippets」に作成してください。

```
<div class="c-unit">
 <div class="c-unit__head">
  <h2 class-"c-unit__title">タイトル</h2>
 </div>
 <div class="c-unit__body">
     <ul class="e-list e-list--disc">
       <li>テキスト</li>
       <li>テキスト</li>
     </ul>
 </div>
</div>
```


#### コメント

*   コメントは読み安やを考え自由に入れて大丈夫です。
*   例えば文脈にそった見出しなど記述してください。
*   例えば複雑なコードはなるべくコメントを残してください。

```
例）

/* ==========================================================================
 #FIME NAME
 ========================================================================== */

/* 見だし1
 ========================================================================== */

/* 見だし2
* ------------------------------------------------------------ */

//見だし3

/**
* コメントは気軽に残してください。
*
*/



```

##### 空白

*   空白は読み安やを考え自由に入れて大丈夫です。
*   例えば関連しないブロック間は3つ以上の改行
*   例えばセレクタとプロパティの間は改行

```
例）

.hoge {
margin-top: 10px;
padding-top: 10px;
display: inline-block;

&:before,
&:after {
  border-bottom: 0;
}

}

.fuga {
display: block;
}

.fuga--type1 {
display: inline-block;
}

.fuga--type2 {
display: table;
}

```


### scssディレクトリ構造

デフォルトのディレクトリ構造は次のようになります。

```
sass
├── variables
├── layout
├── components
├── elements
├── utilities
├── core
├── library
├── mixins
└── base.scss

css
└── base.css

```


## JS

### jsの分類や作業の判断

*   HTMLのclassに当てる場合は「js-●●●」など装飾のclassと区別してください。
*   ページ固有のjsは別ファイルを作成します。

### jsディレクトリ構造

デフォルトのディレクトリ構造は次のようになります。

```
js
└── index.js

src
├── index.js
└── library
     └── accordion.js

```