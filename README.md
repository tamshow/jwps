# Japan Web Production Standards


## UIコンポーネント+プロトタイピング+アクセシビリティ+CMS

Japan Web Production Standardsは統一ルールに基づいたCSSのUIコンポーネントとJavaScriptのUIコンポーネントを組み合わせたwebサイト用のビジュアルスタイルガイドを含むフレームワークです。   
UIコンポーネントを組み合わせてwebページを構築していく手法を得意とし、CMSを構築に必要なCSS、JavaScriptがまとまっています。   
また、アクセシビリティ達成基準のレベルAに加え、AAのうち一部の達成基準に配慮しています。   
最終的には達成基準のすべてを満たすことを目指していますが、現時点ではすべての達成基準を満たすことはできていません。

 - [サンプルサイトを見る](https://tamshow.github.io/jwps/)
 - [テンプレートのサンプルを見る](http://template.tamshow.com/filelist.html)




## デザインリソース (For designers)

![StyleGuide](https://tamshow.github.io/jwps/assets/img/common/JWPS.png)

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
HTMLはそのまま使用せずCMSで使うことを前提に作成します。   
インクルードは必要に応じて使い分けてください。   
`frontend/source`フォルダが作業場所です。   
`gulp serve`することで`frontend/source`を開発用ルートとしてファイルをwatchします。
`gulp build`することで`frontend/source/assets`を公開用に調整し`frontend/build/assets`へ書き出します。   
画像圧縮はしていません。必要に応じて圧縮してください。   
Sassのmixinは[bourbonファミリー](https://www.bourbon.io/)を参考・使用します。   
`source/assets/src/bundle/`以下に配置したJSファイルはバンドルしたパターンとバンドルしないパターンが書き出されます。必要に応じて使い分けてください。    

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


//json-server起動
$ cd json-server
$ node server.js


//スタイルガイド作成
$ cd hologram
$ hologram
//docsフォルダ作成
$ gulp docs
hologramで書き出したファイルをdocsフォルダに移動します。

```


#### ディレクトリ構造

```
.
 ├── frontend
 │   ├── source（開発用）
 │   │   ├── assets
 │   │   │   ├── fonts
 │   │   │   ├── img
 │   │   │   ├── src
 │   │   │   └── sass
 │   │   │
 │   │   ├── styleguide（必要に応じてhologramで作成）
 │   │   │   ├── index.html
 │   │   │   ├── started.html
 │   │   │   └── ....html
 │   │   │
 │   │   ├── index.html（必要に応じてhtmlファイルを追加）
 │   │   ├── 404.html
 │   │   ├── _partials
 │   │   └── ....
 │   │
 │   ├── package.json
 │   ├── yarn.lock
 │   └── gulpfile.js
 │
 ├── build（公開用 assetsのみ書き出される）
 │   └── assets（圧縮済み）
 │
 ├── design（デザインファイル）
 │   └── JWPS.xd
 │
 ├── docs（スタイルガイド表示用 必要に応じて作成）
 │   └── ...
 │
 ├── LICENSE.txt
 └── README.md
```
