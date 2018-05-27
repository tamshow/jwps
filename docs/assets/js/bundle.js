$(function () {


  /*
   ##uaの判定

   ###OS、ブラウザ、 デバイスを判定してbodyタグに出力します。
   （例
   <body data-os="Mac OS 10.11" data-browser="safari" data-device="desktop" data-touch-device="true">

   */


  //ua
  var uaOS = window.navigator.userAgent;
  var ua = uaOS.toLowerCase();
  var bodyElem = document.body;

  //os
  var Windows = uaOS.match(/Windows NT (\d+\.\d+)/),
      MacOS = uaOS.match(/Mac OS X (\d+[_.]\d+)/),
      iOS = uaOS.match(/iPhone OS (\d_\d)/) || uaOS.match(/iPad; CPU OS (\d_\d)/),
      Android = uaOS.match(/Android (\d\.\d)/);

  var os = '', version = '';

  if (Windows) {
    switch (os = "Windows", Windows[1]) {
      case "5.1":
      case "5.2":
        version = "XP";
        break;
      case "6.0":
        version = "Vista";
        break;
      case "6.1":
        version = "7";
        break;
      case "6.2":
        version = "8";
        break;
      case "6.3":
        version = "8.1";
        break;
      case "10.0":
        version = "10"
    }
  } else if (MacOS) {
    os = "Mac OS";
    version = MacOS[1].replace(/_/g, ".");
  } else if (iOS) {
    os = "iOS";
    version = iOS[1].replace(/_/g, ".");
  } else if (Android) {
    os = "Android";
    version = Android[1];
  }

  bodyElem.setAttribute("data-os", os + " " + version);


  //browser
  var BrowserSafari  = ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1,
      BrowserChrome  = ua.indexOf("chrome") > -1 && ua.indexOf("edge") == -1,
      BrowserFireFox = ua.indexOf("firefox") != -1,
      BrowserIE      = ua.indexOf("msie") != -1,
      BrowserIE11    = ua.indexOf('trident/7') != -1,
      BrowserEdge    = ua.indexOf("edge") != -1;


  if (BrowserSafari) {
    bodyElem.setAttribute("data-browser", "safari");
  } else if (BrowserChrome) {
    bodyElem.setAttribute("data-browser", "chrome");
  } else if (BrowserFireFox) {
    bodyElem.setAttribute("data-browser", "firefox");
  } else if (BrowserIE || BrowserIE11) {
    bodyElem.setAttribute("data-browser", "ie");
  } else if (BrowserEdge) {
    bodyElem.setAttribute("data-browser", "edge");
  }

  //device
  var ipad          = ua.indexOf('ipad') !== -1,
      androidTab    = ua.indexOf('android') !== -1 && ua.indexOf('mobile') === -1,
      iphone        = ua.indexOf('iphone') !== -1,
      androidMobile = ua.indexOf('android') !== -1 && ua.indexOf('mobile') !== -1;

  if (ipad || androidTab) {
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




  /*
   ##旧ブラウザ対策

   */



  //IE10対応
  if(ua.indexOf("msie") != -1) {
    var noScriptText =
        '<div class="is-prompt" data-elements="add-js">'+
          '<p>お使いのブラウザはバージョンが古いため、サイトを快適にご利用いただけないかもしれません。<br>'+
          '<a href="https://www.whatbrowser.org/intl/ja/">新しいブラウザをお試しできます。ブラウザは無料、インストールも簡単です。</a>'+
        '</div>';
    $('body').prepend(noScriptText);
  }

  //android標準ブラウザ対策
  var hostname = window.location.hostname;
  if ((/Android/.test(uaOS) && /Linux; U;/.test(uaOS) && !/Chrome/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /Version/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /SamsungBrowser/.test(uaOS))) {

    var noAndroidText =
        '<div class="is-prompt" data-elements="add-js">'+
          '<p>ご利用のAndroid端末のバージョンでは閲覧できません。<br>'+
          '<a href="intent://${hostname}#Intent;scheme=https;action=android.intent.action.VIEW;package=com.android.chrome;end">Chromeブラウザをご利用頂くかOSのバージョンアップをお願い致します。</a>'+
        '</div>';

    bodyElem.parentNode.insertBefore(noAndroidText);
  }
  
  
});




$(function () {


  //initialize
  var $modalSelector = $('[data-modal]');
  var $openModalSelector = $('[data-open-modal]');
  var $closeModalSelector = $('[data-close-modal]');
  var $appendSelector = $('[data-append-modal]');
  var $currentScrollY = 0;

  if ($modalSelector.length) {

    $areaHidden = $('header, footer, main');
    $currentScrollY = null;

    $('body').append('<div class="c-modal-dialog-bg" data-close-modal aria-expanded="true" aria-label="閉じる"></div>');
    $modalBg = $('.c-modal-dialog-bg');
    $modalBg.css({
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



    //handleEvents
    $openModalSelector.on('click', function(e) {
      show(e);
    });

    $(document).on('keyup', function(e) {
      var ESCAPE_KEY_CODE = 27;
      if (e.keyCode === ESCAPE_KEY_CODE) {
        this.hide(e);
      }
    });

    $closeModalSelector.on('click', function(e) {
      hide(e);
    });

    $modalBg.on('click', function(e) {
      hide(e);
    });

  }

  //function
  function show(e) {
    e.preventDefault();
    var $openButton = $(e.currentTarget);
    var containerAttr = $openButton.attr('aria-controls');
    var $container = $('#' + containerAttr );

    this.$modalBg.fadeIn(400);
    $container.fadeIn(400).attr({'aria-hidden': 'false', 'tabindex': '1'}).focus();
    this.$areaHidden.attr({'aria-hidden': 'true'});
    $currentScrollY = $(window).scrollTop();

    $('body').css({
      position: 'fixed',
      width: '100%',
      top: -1 * $currentScrollY
    });

    var $clone = $('[data-clone-modal="' + containerAttr + '"]');

    if ($clone.length && !$appendSelector.children().attr('data-clone-modal')) {
      var elem = $clone.clone(true);

      elem.find('.c-modal-dialog-none').remove();
      elem.removeAttr('style class').find('*').removeAttr('style class');
      $appendSelector.append(elem);
    }
  }


  function hide(e) {

    $modalBg.fadeOut(0);
    $modalSelector.fadeOut(0).attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $areaHidden.removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: $currentScrollY});
    $appendSelector.empty();
  }


});
$(function () {

  var $selectorAC = $('[data-toggle-accordion]');
  var containerAC = '[data-accordion]';
  var deviceAC = '[data-device-accordion]';//all, pc, tab, sp
  var bodyAC = '[data-body-accordion]';
  var tabWidth = '960px';
  var spWidth = '600px';

  $.Event('E_ENTER_KYE_CODE', {keyCode: 13, which: 13});

  $selectorAC.on('click E_ENTER_KYE_CODE', function (e) {

    var media = $(e.currentTarget).parents(deviceAC).data('device-accordion') || 'all';
    var isMobile = window.matchMedia('(max-width:' + spWidth + ')').matches || false;
    var isTablet = window.matchMedia('(min-width:' + spWidth + ') and (max-width:' + tabWidth + ')').matches || false;

    if (media.match(/all/) ||
        (media.match(/sp/) && isMobile) ||
        (media.match(/tab/) && isTablet) ||
        (media.match(/pc/) && ( !isMobile && !isTablet))
    ) {
      toggle(e);
    }
  });

  function toggle(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var $containerAC = $target.parents(containerAC);
    var $bodyAC = $containerAC.find(bodyAC);

    if ($containerAC.hasClass('is-active')) {
      $containerAC.removeClass('is-active');
      $target.attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
      $bodyAC.stop().slideUp(150).attr('aria-hidden', 'true');
    } else {
      $containerAC.addClass('is-active');
      $target.attr({'aria-expanded': 'false', 'aria-label': '開く'});
      $bodyAC.stop().slideDown(200).attr('aria-hidden', 'false').focus();

      var offset = $target.offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate({scrollTop: offsetTop - ($('header').height())}, {
        duration: 500,
        easing: 'swing'
      });

    }
  }


});
$(function () {

  var selector = '[data-toggle-nav-sp]';
  var bodyContents = '[data-body-nav-sp]';
  var bgSelector = '#js-header-nav-bg-sp';
  var lowerLayerSelector = '.l-footer, .main';
  var iconOpen = 'menu';
  var iconClose = 'close';
  var focusSelector = '.l-header-search-sp__input';

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




$(function () {

  /*  sample

   <div class="js-posts" data-url="hoge.json">
   <script type="text/html">
   <ul class="l-grids-4to2to2">
   <% _.each(data, function(result) { %>
   <li class="l-grid c-card">
   <a href="<%-result.url %>">
   <div class="c-card__img"><img src="<%- result.image_path %>" alt=""></div>
   <div class="c-card__body">
   <p class="c-card__text is-text-week"> <%- result.date %></p>
   <div class="c-card__label">
   <% _.each(result.tags, function(key, tag) { %>
   <span class="e-label <%-key %>"> <%-tag %></span>
   <% }); %>
   </div>
   <p class="c-card__title"><%- result.title %></p>
   </div>
   </a>
   </li>
   <% }); %>
   </ul>;
   </script>
   </div>

   */


  _.each($('.js-posts'), function (elem) {
    var url = $(elem).data('url');
    var templates = _.template($(elem).find('script').html());

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      cache: false
    }).then(
        function (data) {
          $(elem).append(templates({
            'data': data
          }));
        },

        function () {
          console.log('No Data');
        });
  });
});




$(function () {


  var scrollSelector = '[data-scroll]';
  var $scrollTotop = $('[data-scroll="to-top"]');
  var mainH = $('header').height();


  $(document).on('click', scrollSelector+'a' , function(e) {
    scroll(e);
  });


  $(window).scroll(function(e) {
    topHide(e);
  });



  function scroll(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.includes('#')) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate(
          {scrollTop: offsetTop},
          {
            duration: 300, easing: 'swing', complete: function () {
            if (targetHref !== '#skippy') {
              window.location.hash = targetHref;
            }
          }
          });
    }
  }

  function topHide(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var scrollPos = $target.scrollTop();

    if (scrollPos < mainH) {
      $scrollTotop.find('a').stop().animate({'bottom': '-100px'}, 200, 'swing');
    } else {
      $scrollTotop.find('a').stop().animate({'bottom': '15px'}, 200, 'swing');
    }
  }
  
});



$(function () {
  var ripples = document.querySelectorAll('.js-ripple');
  _.each(this.ripples, function(elem) {
    rippleButton(elem);
  });
  
  function rippleButton(btn) {
    btn.addEventListener('mousedown', function(e) {
      var dimension = Math.max(btn.clientWidth, btn.clientHeight);
      var loc = btn.getBoundingClientRect();
      var circle = document.createElement('span');
      circle.classList.add('js-rp-effect');
      circle.style.width = dimension + 'px';
      circle.style.height = dimension + 'px';
      circle.style.left = e.clientX - btn.offsetLeft - (dimension / 2) + 'px';
      circle.style.top = e.clientY - btn.offsetTop - (dimension / 2) + document.documentElement.scrollTop + 'px';
      btn.appendChild(circle);
      setTimeout(function () {
        btn.removeChild(circle);
      }, 1000);
    })
  }

});


/*

 <button class="js-ripple e-btn" type="button">もっと見る</button>


 .js-ripple {
   overflow: hidden;
   position: relative;
 }

 .js-rp-effect {
   width: 100%;
   height: 100%;
   border-radius: 50%;
   background-color: rgba(255, 255, 255, .5);
   position: absolute;
   opacity: 0;
   transform: scale(0);
   animation: 500ms ripple-fg forwards, 500ms ripple-fg-opacity-out forwards;
 }

 @keyframes ripple-fg {
   to {
     transform: scale(2.5);
   }
 }

 @keyframes ripple-fg-opacity-out {
   from {
     animation-timing-function: $animation-sharp-curve-timing-function;
     opacity: 1;
   }
   to {
     opacity: 0;
   }
 }
 * */
$(function () {

  var containerSelector = '[data-tab]';
  var tabListSelector = '[data-tablist]';
  var tabPanelSelector = '[data-tabpanel]';


  $(tabListSelector).on('click', function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    listSelect($target);
    panelSelect($target);
  });

  $(document).on('keyup', function(e) {
    e.preventDefault();
    tabKeyup(e);
  });



  function listSelect($target) {
    $target.focus();
    $target.parents('li').attr('aria-selected', 'true').attr('tabindex', '0').focus()
        .siblings('li').attr('aria-selected', 'false').attr('tabindex', '-1');
  }

  function panelSelect($target) {
    var panel = $target.attr('aria-controls');
    $('#' + panel).attr('aria-hidden', 'false')
        .siblings(this.tabPanelSelector).attr('aria-hidden', 'true');
  }


  function tabKeyup(e) {
    var $target = $(e.currentTarget);

    var leftArrow = 37;
    var rightArrow = 39;

    switch (e.keyCode) {

      case leftArrow:
        $target = $(e.target).prev().children(this.tabListSelector);
        break;

      case rightArrow:

        $target = $(e.target).next().children(this.tabListSelector);
        break;

      default:

        break;
    }
    listSelect($target);
    panelSelect($target);
  }



});

$(function () {

/*
 * 当ファイルと@jwps/以下は1ファイルに結合して書き出されます。
 * 当ファイルは@jwps/の最後に追加されます。
 * 
 */

});
