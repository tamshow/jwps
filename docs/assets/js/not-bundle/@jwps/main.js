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


  /*
   ##uaの判定

   ###OS、ブラウザ、 デバイスを判定してbodyタグに出力します。
   （例
   <body data-os="Mac OS 10.11" data-browser="safari" data-device="desktop" data-touch-device="true">

   */



  /**
   * ------------------------------------------------------------------------
   * Add UA
   * ------------------------------------------------------------------------
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


  /**
   * ------------------------------------------------------------------------
   * Add Browser
   * ------------------------------------------------------------------------
   */


  var BrowserSafari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1,
      BrowserChrome = ua.indexOf("chrome") > -1 && ua.indexOf("edge") == -1,
      BrowserFireFox = ua.indexOf("firefox") != -1,
      BrowserIE = ua.indexOf("msie") != -1,
      BrowserIE11 = ua.indexOf('trident/7') != -1,
      BrowserEdge = ua.indexOf("edge") != -1;


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

  window.onscroll = function(e) {
    scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= startPos) {
      bodyElem.setAttribute("data-scroll-pos", "down");
    } else {
      bodyElem.setAttribute("data-scroll-pos", "up");
    }
    startPos = scrollTop;

    clearTimeout(scrollStop);
    scrollStop = setTimeout(function () {
      bodyElem.setAttribute("data-scroll-pos", "stay");
    }, 1000);
  };



  /**
   * ------------------------------------------------------------------------
   * Off Line
   * ------------------------------------------------------------------------
   */
  if (navigator.onLine === false) {
    var offLineText =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>現在オフラインで表示しています。</p></div>';
    bodyElem.parentNode.insertBefore(offLineText);

  }


  /**
   * ------------------------------------------------------------------------
   * 旧ブラウザ対策
   * ------------------------------------------------------------------------
   */
  
  //IE10対応
  if (ua.indexOf("msie") != -1) {
    var noScriptText =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>お使いのブラウザはバージョンが古いため、サイトを快適にご利用いただけないかもしれません。<br>' +
        '<a href="https://www.whatbrowser.org/intl/ja/">新しいブラウザをお試しできます。ブラウザは無料、インストールも簡単です。</a>' +
        '</div>';
    bodyElem.parentNode.insertBefore(noScriptText);

  }

  //android標準ブラウザ対策
  var hostname = window.location.hostname;
  if ((/Android/.test(uaOS) && /Linux; U;/.test(uaOS) && !/Chrome/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /Version/.test(uaOS)) ||
      (/Android/.test(uaOS) && /Chrome/.test(uaOS) && /SamsungBrowser/.test(uaOS))) {

    var noAndroidText =
        '<div class="is-prompt" data-elements="add-js">' +
        '<p>ご利用のAndroid端末のバージョンでは閲覧できません。<br>' +
        '<a href="intent://${hostname}#Intent;scheme=https;action=android.intent.action.VIEW;package=com.android.chrome;end">Chromeブラウザをご利用頂くかOSのバージョンアップをお願い致します。</a>' +
        '</div>';

    bodyElem.parentNode.insertBefore(noAndroidText);
  }


});



