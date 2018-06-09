$(function () {

  var selector = '[data-toggle-offcanvas]';
  var bodyContents = '[data-body-offcanvas]';
  var bgSelector = '#js-offcanvas-bg';
  var lowerLayerSelector = '';//.l-footer, .main
  var iconOpen = 'menu';
  var iconClose = 'close';
  var focusSelector = '';//.l-header-search-sp__input

  var currentScrollY = null;

  
  var $selector = $(selector);
  var $bodyContents = $(bodyContents);
  var $bgSelector = $(bgSelector);
  var $lowerLayerSelector = $(lowerLayerSelector);
  var $focusSelector = $(focusSelector);


  $selector.on('click', function(e) {

    toggle(e, $selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, iconClose, $focusSelector);

  });

  $bgSelector.on('click', function(e) {
    settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, iconClose, $focusSelector);
  });



  function toggle(e, $selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, iconClose, $focusSelector) {

    e.preventDefault();

    if ($bodyContents.attr('aria-hidden') === 'true') {
      //ナビゲーションのレイヤーを上にしてスライドイン
      $bodyContents.attr({'aria-hidden': 'false', 'tabindex': '1'});
      $('input').first().focus();
      //メニューアイコン
      $selector.attr({'aria-expanded': 'true', 'aria-label': '閉じる'}).find('i').text(iconClose);
      //背景黒
      $bgSelector.css({
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        overflow: 'hidden',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '998'
      });

      //下のレイヤーをhidden
      $lowerLayerSelector.attr({'aria-hidden': 'true'});
      currentScrollY = $(window).scrollTop();
      //現在地のスクロールを保持
      $('body').css({
        position: 'fixed',
        width: '100%',
        top: -1 * currentScrollY
      });

    } else {
     settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, iconClose, $focusSelector);
    }
  }

  function settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, $focusSelector) {

    $bodyContents.attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $selector.attr({'aria-expanded': 'false', 'aria-label': '開く'}).find('i').text(iconOpen);
    $bgSelector.attr({style: ''});
    $lowerLayerSelector.removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: currentScrollY});
  }


});



