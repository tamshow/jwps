window.addEventListener('DOMContentLoaded', function(){

/*
 * @jwps以下は1ファイルに結合して書き出されます。
 * ここは@jwpsの最後に追加されます。
 * 
 */

  //.visual-editorのアイコンが画像を含んだ場合に消す
  var IconClassName = [
    '.visual-editor a[target="_blank"] > img',
    '.visual-editor a[href$=".pdf"] > img',
    '.visual-editor a[href$=".doc"] > img',
    '.visual-editor a[href$=".docx"] > img',
    '.visual-editor a[href$=".ppt"] > img',
    '.visual-editor a[href$=".pptx"] > img',
    '.visual-editor a[href$=".xls"] > img',
    '.visual-editor a[href$=".xlsx"] > img'
  ];

  for (var i = 0; i < IconClassName.length; i++) {
    $(IconClassName[i]).parents('a').addClass('is-iconless')
  }

});


