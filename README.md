# Japan Web Production Standards


## UIコンポーネント+プロトタイピング+アクセシビリティ+CMS

Japan Web Production Standardsは統一ルールに基づいたCSSのUIコンポーネントとJavaScriptのUIコンポーネントを組み合わせたwebサイト用のビジュアルスタイルガイドを含むフレームワークです。   
UIコンポーネントを組み合わせてwebページを構築していく手法を得意とし、CMSを構築に必要なCSS、JavaScriptがまとまっています。   
また、アクセシビリティ達成基準のレベルAに加え、AAのうち一部の達成基準に配慮しています。   
最終的には達成基準のすべてを満たすことを目指していますが、現時点ではすべての達成基準を満たすことはできていません。


## デザインリソース (For designers)

![StyleGuide](https://tamshow.github.io/jwps/assets/img/dummy/style-guide.png)

 -  [Download design files (XD)](https://github.com/tamshow/jwps/blob/master/design/JWPS.xd)
  
  
## 開発ガイドライン (For developers)


### コーディングマナー
 - メンテナンス性、可読性を意識したコーディングを心がけます。
 - 拡張性、再利用性、柔軟性、効率を意識したルールを持たせます。
 - 要素の追加・削除のし易さを心がけます。
 - アクセシビリティに配慮します。


### 対応ブラウザ

 - Internet Explorer11、Microsoft Edge 最新ver、Firefox 最新ver、Chrome 最新ver Safari 最新ver
 - スマートフォンOSに搭載されている標準のブラウザ
 - 旧ブラウザは閲覧性を重視します。


### おおまかに説明
assets内（CSS、JSなど）を管理します。   
CMSで使うことを前提にまとめています。   
`frontend/source`フォルダが作業場所です。   
`gulp serve`することで`frontend/source`を開発用ルートとしてファイルをwatchします。
`gulp build`することで`frontend/source/assets`を公開用に調整し`frontend/build/assets`へ書き出します。   
画像圧縮はしていません。必要に応じて圧縮してください。   
Sassのmixinは[bourbonファミリー](https://www.bourbon.io/)を参考・使用します。   
`source/assets/src/@jwps/`以下に配置したJSファイルはバンドルしたパターンとバンドルしないパターンが書き出されます。必要に応じて使い分けてください。 

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
 │   ├── yarn.lock
 │   └── gulpfile.js
 │
 ├── assets（公開用）
 ├── LICENSE.txt
 └── README.md
```
