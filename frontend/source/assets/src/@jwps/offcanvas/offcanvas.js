$(function () {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'offcanvas';
  var VERSION = '0.5.0';

  var Selector = {
    TARGET      : '[data-toggle-offcanvas]',
    BODY        : '[data-body-offcanvas]',
    BG          : '#js-offcanvas-bg',
    LOWER_LAYER : 'footer,main',
    SCROLL      : '[data-scroll-offcanvas]'
  };


  var Default = {
    current_scrollY: null
  };


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  $(Selector.TARGET).on('click', function (e) {
    if ($(Selector.BODY).attr('aria-hidden') === 'true') {
      settingOpen(e);
    } else {
      settingClose();
    }
  });


  $(Selector.BODY).on('click', 'a', function (e) {
    settingClose();
  });

  $(Selector.BG).on('click', function (e) {
    settingClose();
  });

  $(Selector.BODY).on('click', Selector.SCROLL, function (e) {
    settingClose();
    scrollTo(e);
  });


  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */


  function settingOpen(e) {

    e.preventDefault();

    //ナビゲーションのレイヤーを上にしてスライドイン
    $(Selector.BODY).attr({'aria-hidden': 'false', 'tabindex': '1'});
    // $('input').first().focus();
    //メニューアイコン
    $(Selector.TARGET).attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
    //背景黒
    $(Selector.BG).css({
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
    $(Selector.LOWER_LAYER).attr({'aria-hidden': 'true'});
    Default.current_scrollY = $(window).scrollTop();
    //現在地のスクロールを保持
    $('body').css({
      position: 'fixed',
      width: '100%',
      top: -1 * Default.current_scrollY
    });

  }

  function settingClose() {

    $(Selector.BODY).attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $(Selector.TARGET).attr({'aria-expanded': 'false', 'aria-label': '開く'});
    $(Selector.BG).attr({style: ''});
    $(Selector.LOWER_LAYER).removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: Default.current_scrollY});
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



