window.addEventListener('DOMContentLoaded', function(){

  'use strict';

  /**
   * ------------------------------------------------------------------------
   * Service Worker
   * ------------------------------------------------------------------------
   */
  
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {

          registration.onupdatefound = function () {
            if (navigator.serviceWorker.controller) {
              var installingWorker = registration.installing;
              installingWorker.onstatechange = function () {
                switch (installingWorker.state) {
                  case 'installed':
                    break;
                  case 'redundant':
                    throw new Error('The installing ' +
                        'service worker became redundant.');
                  default:
                }
              };
            }
          };


        }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }



  /**
   * ------------------------------------------------------------------------
   * Add UA
   * ------------------------------------------------------------------------
   */


  var uaOS = window.navigator.userAgent;
  var ua = uaOS.toLowerCase();
  var bodyElem = document.body;

  /**
   * ------------------------------------------------------------------------
   * Add Device
   * ------------------------------------------------------------------------
   */

  var ipad = ua.indexOf('ipad') !== -1,
      androidTab = ua.indexOf('android') !== -1 && ua.indexOf('mobile') === -1,
      iphone = ua.indexOf('iphone') !== -1,
      androidMobile = ua.indexOf('android') !== -1 && ua.indexOf('mobile') !== -1;

  if (ipad || androidTab) {
    //viewport変更
    // document.getElementById('viewport').setAttribute('content', 'width=1200');
    bodyElem.setAttribute("data-device", "tablet");
  } else if (iphone || androidMobile) {
    bodyElem.setAttribute("data-device", "mobile");
  } else {
    bodyElem.setAttribute("data-device", "desktop");
  }

  //touch-device
  if ('ontouchstart' in window) {
    bodyElem.setAttribute("data-touch-device", "true");
  } else {
    bodyElem.setAttribute("data-touch-device", "false");
  }


  /**
   * ------------------------------------------------------------------------
   * Add Scroll
   * ------------------------------------------------------------------------
   */

  var startPos = 0;
  var scrollTop = 0;
  var scrollStop = false;

  window.onscroll = function() {
    scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= startPos) {
      bodyElem.setAttribute("data-scroll-pos", "is-down");
    } else {
      bodyElem.setAttribute("data-scroll-pos", "is-up");
    }
    startPos = scrollTop;

    clearTimeout(scrollStop);
    scrollStop = setTimeout(function () {
      bodyElem.setAttribute("data-scroll-pos", "is-stay");
    }, 600);
  };


  /**
   * ------------------------------------------------------------------------
   * Add Fixed
   * ------------------------------------------------------------------------
   */
  
  // var $header = $('header'),
  //     scrollStart = $('.js-fixed-start'),
  //     headerH = $header.height(),
  //     scrollStartH = scrollStart.height(),
  //     position = scrollStartH;
  //
  // $(window).scroll(function () {
  //   var scrollPos = $(this).scrollTop();
  //
  //   if (scrollPos > headerH) {
  //     $header.addClass('is-start');
  //   } else {
  //     $header.removeClass('is-start');
  //   }
  //
  //   if (scrollPos > position) {
  //     if (!$header.hasClass('is-fixed')) {
  //       $header.addClass('is-fixed');
  //
  //       $('.js-fixed-start').css({'margin-top': headerH});
  //     }
  //   } else {
  //     $header.removeClass('is-fixed');
  //     $('.js-fixed-start').css({'margin-top': 'auto'});
  //   }
  // });


  /**
   * ------------------------------------------------------------------------
   * Off Line
   * ------------------------------------------------------------------------
   */

  if (navigator.onLine === false) {

   var offlineElem = document.createElement('div');
       offlineElem.innerHTML =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>現在オフラインで表示しています。</p></div>';
    bodyElem.insertBefore(offlineElem,bodyElem.firstChild);

  }


  /**
   * ------------------------------------------------------------------------
   * 旧ブラウザ対策
   * ------------------------------------------------------------------------
   */
  
  //IE10対応
  if (ua.indexOf("msie") !== -1) {
    var noScriptElem = document.createElement('div');
        noScriptElem.innerHTML =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>お使いのブラウザはバージョンが古いため、サイトを快適にご利用いただけないかもしれません。<br>' +
        '<a href="https://www.whatbrowser.org/intl/ja/">新しいブラウザをお試しできます。ブラウザは無料、インストールも簡単です。</a>' +
        '</div>';
    bodyElem.insertBefore(noScriptElem,bodyElem.firstChild);

  }

  //android標準ブラウザ対策
  var hostname = window.location.hostname;
  if ((/Android/.test(uaOS) && /Linux; U;/.test(uaOS) && !/Chrome/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /Version/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /SamsungBrowser/.test(uaOS))) {

    var noAndroidElem = document.createElement('div');
        noAndroidElem.innerHTML =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>ご利用のAndroid端末のバージョンでは閲覧できません。<br>' +
        '<a href="intent://' + hostname + '#Intent;scheme=https;action=android.intent.action.VIEW;package=com.android.chrome;end">Chromeブラウザをご利用頂くかOSのバージョンアップをお願い致します。</a>' +
        '</div>';
    bodyElem.insertBefore(noAndroidElem,bodyElem.firstChild);
  }


  //-------------------------------------------
  //.visual-editorのアイコンが画像を含んだ場合に消す
  //-------------------------------------------
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

function escapeSelector (val) {
  return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&')
}




$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'accordion';
  var VERSION = '0.5.0';

  var Selector = {
    ACCORDION     : '[data-accordion]',
    TARGET        : '[data-toggle-accordion]',
    BODY          : '[data-body-accordion]',
    DEVICE        : '[data-device-accordion]',//all, pc, tab, sp
    ANKER         : '[anker-accordion]'
  };


  var Default = {
    TAB_W  : '960px',
    SP_W   : '600px'
  };


  $.Event('E_ENTER_KYE_CODE', {keyCode: 13, which: 13});


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  $(Selector.TARGET).on('click touchend E_ENTER_KYE_CODE', function (e) {

    var media = $(e.currentTarget).parents(Selector.DEVICE).data('device-accordion') || 'all';
    var isMobile = window.matchMedia('(max-width:' + Default.SP_W + ')').matches || false;
    var isTablet = window.matchMedia('(min-width:' + Default.SP_W + ') and (max-width:' + Default.TAB_W + ')').matches || false;

    if (media.match(/all/) ||
        (media.match(/sp/) && isMobile) ||
        (media.match(/tab/) && isTablet) ||
        (media.match(/pc/) && ( !isMobile && !isTablet))
    ) {
      toggle(e);
    }
  });



  $(Selector.ANKER).on('click touchend', function() {
    innerAnker();
  });

  $(window).on('load',function (e) {
    accessAnker(e);
  });

  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */


  
  function toggle(e) {
    e.preventDefault();
    var $current_target = $(e.currentTarget);
    var $containerAC = $current_target.parents(Selector.ACCORDION);
    var $bodyAC = $containerAC.find(Selector.BODY);

    if ($containerAC.hasClass('is-active')) {
      $containerAC.removeClass('is-active');
      $current_target.attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
      $bodyAC.attr('aria-hidden', 'true');
    } else {
      $containerAC.addClass('is-active');
      $current_target.attr({'aria-expanded': 'false', 'aria-label': '開く'});
      $bodyAC.attr('aria-hidden', 'false').focus();

      var offset = $current_target.offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate({scrollTop: offsetTop - ($('header').height())}, {
        duration: 500,
        easing: 'swing'
      });

    }
    e.stopPropagation();

  }

  function innerAnker() {
    //アコーディオン内から別アコーディオンを開く
    var targetHref = $(this).attr('href');
    if (targetHref.indexOf('#') !== -1) {
      $('[aria-controls="'+targetHref.slice(1)+'"]').click();
    }
  }
  
  
  function accessAnker() {
    //ハッシュでアコーディオン開く
    var urlHash = location.hash || false;
    if (urlHash && $(escapeSelector(urlHash)).length) {
      if ($('[aria-controls="' + escapeSelector(urlHash.slice(1)) + '"]').length) {
        $('[aria-controls="' + escapeSelector(urlHash.slice(1)) + '"]').click();
      }
    }
  }


});
window.addEventListener('DOMContentLoaded', function(){


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME    = 'current';
  var VERSION = '0.5.0';

  var ClassName = {
    LINK_TARGET   : 'js-current-nav',
    ACTIVE        : 'is-active'
  };

  
  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */




  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */




  if(location.pathname !== "/") {
    $('.js-current-nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass(ClassName.ACTIVE);
  } else{
    $('.js-current-nav a:eq(0)').addClass(ClassName.ACTIVE);

  }
  
});


$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME    = 'modal';
  var VERSION = '0.5.0';

  var Selector = {
    BODY        : '[data-modal]',
    OPEN        : '[data-open-modal]',
    CLOSE       : '[data-close-modal]',
    APPEND      : '[data-append-modal]',
    AREA_HIDDEN : 'header, footer, main',
    BG          : '.c-modal-dialog-bg'
  };

  var Default = {
    current_scrollY : null
  };



  if ($(Selector.BODY).length) {

    $('body').append('<div class="c-modal-dialog-bg" data-close-modal aria-expanded="true" aria-label="閉じる"></div>');
    $(Selector.BG).css({
      display: 'none',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .5)',
      overflow: 'hidden',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '99998'
    });

  }


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


    $(Selector.OPEN).on('click touchend', function(e) {
      show(e);
    });

    $(document).on('keyup', function(e) {
      var ESCAPE_KEY_CODE = 27;
      if (e.keyCode === ESCAPE_KEY_CODE) {
        hide(e);
      }
    });

    $(Selector.CLOSE).on('click touchend', function(e) {
      hide(e);
    });

    $(Selector.BG).on('click touchend', function(e) {
      hide(e);
    });

  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */


  function show(e) {
    e.preventDefault();
    var $openButton = $(e.currentTarget);
    var containerAttr = $openButton.attr('aria-controls');
    var $container = $('#' + containerAttr );

    $(Selector.BG).fadeIn(400);
    $container.fadeIn(400).attr({'aria-hidden': 'false', 'tabindex': '1'}).focus();
    $(Selector.AREA_HIDDEN).attr({'aria-hidden': 'true'});
    Default.current_scrollY = $(window).scrollTop();

    $('body').css({
      position: 'fixed',
      width: '100%',
      top: -1 * Default.current_scrollY
    });

    var $clone = $('[data-clone-modal="' + containerAttr + '"]');

    if ($clone.length && !$(Selector.APPEND).children().attr('data-clone-modal')) {
      var elem = $clone.clone(true);

      elem.find('.c-modal-dialog-none').remove();
      elem.removeAttr('style class').find('*').removeAttr('style class');
      $(Selector.APPEND).append(elem);
    }
  }


  function hide() {
    $(Selector.BG).fadeOut(0);
    $(Selector.BODY).fadeOut(0).attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $(Selector.AREA_HIDDEN).removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: Default.current_scrollY});
    $(Selector.APPEND).empty();
  }


});
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


  $(Selector.BODY).on('click', 'a', function () {
    settingClose();
  });

  $(Selector.BG).on('click', function () {
    settingClose();
  });

  $(Selector.BODY).on('click', Selector.SCROLL, function (e) {
    settingClose();
    clickScrollTo(e);
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


  function clickScrollTo(e) {
    e.preventDefault();

    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.indexOf('#') !== -1) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate(
          {scrollTop: offsetTop},
          {duration: 300, easing: 'swing'});
    }
  }

});




$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'pagescroll';
  var VERSION = '0.5.0';

  var Selector = {
    TARGET        : '[data-scroll]',
    TO_TOP        : '[data-scroll="to-top"]',
    BG            : '#js-offcanvas-bg',
    LOWER_LAYER   : 'footer,main',
    SCROLL        : '[data-scroll-offcanvas]',
    OFFSET        : '[data-scroll-offset]'
  };

  var Default = {
    MAIN_H           : $('header').height() - 20,
    BOTTOM_POSITION  : '100px'
  };


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  $(document).on('click touchend', Selector.TARGET + ' a', function (e) {
    pageScroll(e);
  });


  $(window).on('scroll',function (e) {
    topHide(e);
  });


  $(window).on('load',function (e) {

    scrollToAnker(e);

  });



  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */

  function pageScroll(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.indexOf('#') !== -1) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top - Selector.OFFSET || Default.MAIN_H;

      $('html,body').animate(
          {scrollTop: offsetTop},
          {
            duration: 300, easing: 'swing', complete: function () {
            if (targetHref !== '#skippy') {
              // window.location.hash = targetHref;
            }
          }
          });
    }
  }

  function topHide(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var scrollPos = $target.scrollTop();

    if (scrollPos < Default.MAIN_H) {
      $(Selector.TO_TOP).find('a').stop().animate({'bottom': '-' + Default.BOTTOM_POSITION}, 200, 'swing');
    } else {
      $(Selector.TO_TOP).find('a').stop().animate({'bottom': Default.BOTTOM_POSITION}, 200, 'swing');
    }
  }


  //ハッシュ付きリンク用に遅延して動作
  function scrollToAnker() {
    var urlHash = location.hash || false;
    if (urlHash && $(escapeSelector(urlHash)).length) {
      setTimeout(function () {
        var position = $(escapeSelector(urlHash)).offset().top - Default.MAIN_H -20;
        $('body,html').animate({scrollTop: position}, 100);
      }, 0);
    }

  }




});



window.addEventListener('DOMContentLoaded', function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME      = 'ripple';
  var VERSION   = '1.0.0';

  var Selector = {
    TARGETS   : document.getElementsByClassName('js-ripple')
  };

  var ClassName = {
    ACTIVE    : 'js-rp-effect'
  };

  var Default = {
    speed     : 1000
  };

  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  for (var i = 0; i < Selector.TARGETS.length; i++) {
    Selector.TARGETS[i].addEventListener('mousedown', function (e) {
      rippleButton(Selector.TARGETS[i], e);
    });
  }

  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */

  function rippleButton(button, e) {
    var dimension = Math.max(button.clientWidth, button.clientHeight);
    //var loc = button.getBoundingClientRect();
    var circle = document.createElement('span');
    circle.classList.add(ClassName.ACTIVE);
    circle.style.width = dimension + 'px';
    circle.style.height = dimension + 'px';
    circle.style.left = e.clientX - button.offsetLeft - (dimension / 2) + 'px';
    circle.style.top = e.clientY - button.offsetTop - (dimension / 2) + document.documentElement.scrollTop + 'px';
    button.appendChild(circle);
    setTimeout(function () {
      button.removeChild(circle);
    }, Default.speed);
  }

});


$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '0.5.0';

  var Selector = {
    BODY      : '[data-tab]',
    LIST      : '[data-tablist]',
    PANEL     : '[data-tabpanel]'
  };



  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */

  $(Selector.LIST).on('click touchend', function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    listSelect($target);
    panelSelect($target);
  });

  $(document).on('keyup', function (e) {
    e.preventDefault();
    tabKeyup(e);
  });


  $(window).on('load',function (e) {
    accessAnker(e);
  });


  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */


  function listSelect($target) {
    $target.focus();
    $target.parents('li').attr('aria-selected', 'true').attr('tabindex', '0').focus()
        .siblings('li').attr('aria-selected', 'false').attr('tabindex', '-1');
  }

  function panelSelect($target) {
    var panel = $target.attr('aria-controls');
    $('#' + panel).attr('aria-hidden', 'false')
        .siblings(Selector.PANEL).attr('aria-hidden', 'true');
  }

  function tabKeyup(e) {
    var $target = $(e.currentTarget);

    var leftArrow = 37;
    var rightArrow = 39;

    switch (e.keyCode) {

      case leftArrow:
        $target = $(e.target).prev().children(Selector.LIST);
        break;

      case rightArrow:

        $target = $(e.target).next().children(Selector.LIST);
        break;

      default:

        break;
    }
    listSelect($target);
    panelSelect($target);
  }


  
  //ページアクセス時にハッシュがあれば該当のタブを開く
  function accessAnker() {
    var urlHash = location.hash || false;
    if (urlHash && $(escapeSelector(urlHash)).length) {
      if ($(escapeSelector(urlHash)).length) {
        $(escapeSelector(urlHash)).find('[data-tablist]').click();
      }
    }
  }

});






$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'switch';
  var VERSION = '0.5.0';

  var Selector = {
    SWITCH        : '[data-switch]',
    TARGET        : '[data-toggle-switch]',
    BODY          : '[data-body-switch]',
    DEVICE        : '[data-device-switch]'//all, pc, tab, sp
  };


  var Default = {
    TAB_W  : '960px',
    SP_W   : '600px'
  };


  $.Event('E_ENTER_KYE_CODE', {keyCode: 13, which: 13});


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  $(Selector.TARGET).on('click touchend E_ENTER_KYE_CODE', function (e) {

    var media = $(e.currentTarget).parents(Selector.DEVICE).data('device-switch') || 'all';
    var isMobile = window.matchMedia('(max-width:' + Default.SP_W + ')').matches || false;
    var isTablet = window.matchMedia('(min-width:' + Default.SP_W + ') and (max-width:' + Default.TAB_W + ')').matches || false;

    if (media.match(/all/) ||
        (media.match(/sp/) && isMobile) ||
        (media.match(/tab/) && isTablet) ||
        (media.match(/pc/) && ( !isMobile && !isTablet))
    ) {
      toggle(e);
    }
  });
  

  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */

  
  function toggle(e) {
    e.preventDefault();
    var $current_target = $(e.currentTarget);
    var $containerSW = $current_target.parents(Selector.SWITCH);
    var $bodySW = $containerSW.find(Selector.BODY);

    if ($containerSW.hasClass('is-active')) {
      $containerSW.removeClass('is-active');
      $current_target.attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
      $bodySW.stop().attr('aria-hidden', 'true');
    } else {
      $containerSW.addClass('is-active');
      $current_target.attr({'aria-expanded': 'false', 'aria-label': '開く'});
      $bodySW.stop().attr('aria-hidden', 'false');

    }
  }





});