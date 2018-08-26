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
    SCROLL        : '[data-scroll-offcanvas]'
  };

  var Default = {
    MAIN_H           : $('header').height(),
    BOTTOM_POSITION  : '100px'
  };


  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  $(document).on('click', Selector.TARGET + ' a', function (e) {
    scroll(e);
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

  function scroll(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.includes('#')) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top - Default.MAIN_H - 20 || 0;

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
  function scrollToAnker(e) {
    var urlHash = location.hash || false;
    if (urlHash && $(urlHash).length) {
      setTimeout(function () {
        var position = $(urlHash).offset().top - Default.MAIN_H -20;
        $('body,html').animate({scrollTop: position}, 100);
      }, 0);
    }

  }



});


