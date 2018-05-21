# このサイトについて


## Webコンポーネント+プロトタイピング+アクセシビリティ+CMS

Webサイトを閲覧する目的のほどんどは「情報取得」にあり、また閲覧されているものの約9割は文字情報になります。理想的なWebサイトは作りっぱなしではなく、公開後に成長を続けられるサイトであると思います。<br>
そのどちらも兼ね備え、また、運用スタッフが公開までにCMSの扱い、拡張の方法を会得できるという特長もあります。

### Webコンポーネントとは
統一ルールに基づいたUIデザインパーツを組み合わせてWebページを構築していくというこれから主流になってくるWeb制作の手法です。PC、スマホ共通パーツを用いるレスポンシブデザインと親和性が高いのが特長です。<br>
パーツは必要最小限になるため運用担当者の学習コストが低く、すぐに扱えるようになります。
また、デザインが破綻しにくくメンテナンス性も高いものになります。

### プロトタイピングとは
デザインを固めてからコーディングに入る従来の方式ではなく、デザイン前に早々にCMSを仮の状態（プロトタイプ）で動かしてしまい原稿やサイト構成を作ってしまうことで、使用した上でのアイデア・問題点（求める制作物との齟齬など）の洗い出し、使用感を伴ったフィードバック、改修を公開前に行うという手法を指します。

### アクセシビリティとは
「アクセシビリティ」という言葉からは、障害者への対応というイメージを持たれることが多いですが、それだけではありません。アクセシビリティが向上すれば、アクセスできる人の母数が増えます。アクセシビリティへの配慮を行う事は、障害者や高齢者だけでなく、あらゆる人に恩恵をもたらす可能性があります。また、SEOにも有利になります。

### CMSとは
コンテンツ・マネジメント・システムの略で、Webサイトを管理・更新できるシステムのことをいいます。


## デザインリソース (For designers)

![StyleGuide](/tamshow/jwps/blob/images/style-guide.png)


## 開発ガイドライン (For developers)


### コーディングマナー
 - メンテナンス性、可読性を意識したコーディングを心がけます。
 - 拡張性、再利用性、柔軟性、効率を意識したルールを持たせます。
 - 要素の追加・削除のし易さを心がけます。


### 使用するToolについて
 - [material-icons.css](material-icons.css)
 - [jquery.js](jquery.js)
 - [lodash.js](lodash.js)
 - [moment.js](moment.js)


#### デバイス判定用
デバイスを判定してbodyタグに出力します。   
```
data-device="desktop" data-touch-device="true"
```


### 対応ブラウザ

 - Internet Explorer11、Microsoft Edge 最新ver、Firefox 最新ver、Chrome 最新ver Safari 最新ver
 - スマートフォンOSに搭載されている標準のブラウザ
 - 旧ブラウザは閲覧性を重視します。


### 環境構築

#### 必要環境
- Node 8.4.0
- npm 5.3.0
- yarn 1.3.2


#### インストール
```
//通常
$ cd frontend
$ yarn install

//hologramを使う場合
$ bundle install --path vendor/bundle
```

#### 開発サイクル

```
//開発時
$ gulp serve

frontend/source/フォルダをルートとしてファイルをwatchします。
localhost:9000を見に行きます。


//公開時
$ gulp build

JS、CSSなど圧縮、または不要ファイルを削除します。
画像圧縮はしていません。必要に応じて圧縮してください。
HTMLファイルは必要に応じてテンプレート等に組み込んで使用してください。


//json-server
$ cd json-server
$ node server.js


//hologram
$ cd hologram
$ hologram

```


#### ディレクトリ構造

```
.
 ├── frontend
 │   ├── source
 │   │   ├── assets（開発用）
 │   │   │   ├── fonts
 │   │   │   ├── img
 │   │   │   ├── src
 │   │   │   └── sass
 │   │   │
 │   │   ├── docs（hologramで作成）
 │   │   │   ├── index.html
 │   │   │   ├── started.html
 │   │   │   └── ....html
 │   │   │
 │   │   ├── index.html（htmlファイル必要に応じて追加）
 │   │   ├── 404.html
 │   │   └── ....
 │   │
 │   ├── package.json
 │   ├── webpack.config.js
 │   ├── yarn.lock
 │   └── gulpfile.js
 │
 ├── assets（公開用）
 ├── LICENSE.txt
 └── README.md
```


### おおまかに
主にassets内（CSS、JSなど）を管理します。   
`frontend/source`フォルダが作業場所です。   
`gulp serve`することで`frontend/source`を開発用ルートとしてファイルをwatchします。
`gulp build`することで`frontend/source/assets`を公開用に調整し`frontend/build/assets`へ書き出します。   
画像圧縮はしていません。必要に応じて圧縮してください。 
