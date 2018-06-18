$(function () {

  var selector = '[data-toggle-offcanvas]';
  var bodyContents = '[data-body-offcanvas]';
  var bgSelector = '#js-offcanvas-bg';
  var scrollSelector = '[data-scroll-offcanvas]';
  var lowerLayerSelector = '';//.l-footer, .main
  var focusSelector = '';//.l-header-search-sp__input

  var currentScrollY = null;


  var $selector = $(selector);
  var $bodyContents = $(bodyContents);
  var $bgSelector = $(bgSelector);
  var $lowerLayerSelector = $(lowerLayerSelector);
  var $focusSelector = $(focusSelector);
  var $scrollSelector = $(scrollSelector);


  $selector.on('click', function (e) {
    toggle(e);
  });

  $bgSelector.on('click', function (e) {
    settingInitialization();
  });


  $bodyContents.on('click', scrollSelector, function (e) {
    settingInitialization();
    scrollTo(e);

  });


  function toggle(e) {

    e.preventDefault();

    if ($bodyContents.attr('aria-hidden') === 'true') {
      //ナビゲーションのレイヤーを上にしてスライドイン
      $bodyContents.attr({'aria-hidden': 'false', 'tabindex': '1'});
     // $('input').first().focus();
      //メニューアイコン
      $selector.attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
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
      settingInitialization();
    }
  }

  function settingInitialization() {

    $bodyContents.attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $selector.attr({'aria-expanded': 'false', 'aria-label': '開く'});
    $bgSelector.attr({style: ''});
    $lowerLayerSelector.removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: currentScrollY});
  }


  function scrollTo(e) {
    e.preventDefault();

    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.includes('#')) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate(
          {scrollTop: offsetTop},
          {duration: 300, easing: 'swing'});
    }
  }
  
});



