# Japan Web Production Standards


## UIコンポーネント+プロトタイピング+アクセシビリティ+CMS

Japan Web Production Standardsは統一ルールに基づいたCSSのUIコンポーネントとJavaScriptのUIコンポーネントを組み合わせたwebサイト用のビジュアルスタイルガイドを含むフレームワークです。   
UIコンポーネントを組み合わせてwebページを構築していく手法を得意とし、CMSを構築に必要なCSS、JavaScriptがまとまっています。   
また、アクセシビリティ達成基準のレベルAに加え、AAのうち一部の達成基準に配慮しています。   
最終的には達成基準のすべてを満たすことを目指していますが、現時点ではすべての達成基準を満たすことはできていません。

 - [スタイルガイドを見る](https://tamshow.github.io/jwps/)
 - [テンプレートのサンプルを見る](http://template.tamshow.com/filelist.html)




## デザインリソース (For designers)

![StyleGuide](https://tamshow.github.io/jwps/assets/img/common/JWPS.png)

 -  [Download design files (XD)](https://github.com/tamshow/jwps/blob/master/design/JWPS.xd)
  
### アイコン部分が文字化けしてしまう方へ
このファイルでは「Google Material Icons」をアイコンフォントとして使用しています。   
以下のURLから「MaterialIcons-Regular.ttf」をダウンロードして、お使いのPCにインストールすることでアイコンが文字化けせずに表示されます。
  
[https://github.com/google/material-design-icons/blob/master/iconfont/MaterialIcons-Regular.ttf](https://github.com/google/material-design-icons/blob/master/iconfont/MaterialIcons-Regular.ttf)
  
  
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
`frontend/source`フォルダが作業場所です。   
`gulp serve`することで`frontend/source`を開発用ルートとしてファイルをwatchします。
`gulp build`することで`html/source`を公開用に調整し`html`へ書き出します。   
画像圧縮はしていません。必要に応じて圧縮してください。   
Sassのmixinは[bourbonファミリー](https://www.bourbon.io/)を参考・使用します。   
`source/assets/src/bundle/ or /vendor/`以下に配置したJSファイルは1ファイルに結合されます。    

### 環境構築

#### 必要環境
- Node 10.14.2
- npm 6.4.1
- yarn 1.12.3


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
 │   │   └── ....
 │   │
 │   ├── package.json
 │   ├── yarn.lock
 │   └── gulpfile.js
 │
 ├── html（公開用に書き出される）
 │   ├── index.html
 │   └── assets
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
