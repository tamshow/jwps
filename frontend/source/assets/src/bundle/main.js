window.addEventListener('DOMContentLoaded', function(){

  'use strict';

  /**
   * ------------------------------------------------------------------------
   * Service Worker
   * ------------------------------------------------------------------------
   */


  // var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
  //     window.location.hostname === '[::1]' ||
  //     window.location.hostname.match(
  //         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  //     )
  // );
  //
  // if ('serviceWorker' in navigator &&
  //     (window.location.protocol === 'https:' || isLocalhost)) {
  //   navigator.serviceWorker.register('/service-worker.js')
  //       .then(function (registration) {
  //
  //         registration.onupdatefound = function () {
  //           if (navigator.serviceWorker.controller) {
  //             var installingWorker = registration.installing;
  //             installingWorker.onstatechange = function () {
  //               switch (installingWorker.state) {
  //                 case 'installed':
  //                   break;
  //                 case 'redundant':
  //                   throw new Error('The installing ' +
  //                       'service worker became redundant.');
  //                 default:
  //               }
  //             };
  //           }
  //         };
  //
  //
  //       }).catch(function (e) {
  //     console.error('Error during service worker registration:', e);
  //   });
  // }



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
  //       $('.js-fixed-start').css({'margin-top': headerH})
  //     }
  //   } else {
  //     $header.removeClass('is-fixed');
  //     $('.js-fixed-start').css({'margin-top': 'auto'})
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



