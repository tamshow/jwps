$(function () {


  var scrollSelector = '[data-scroll]';
  var $scrollTotop = $('[data-scroll="to-top"]');
  var mainH = $('header').height();


  $(document).on('click', scrollSelector + ' a', function (e) {
    scroll(e);
  });


  $(window).on('scroll',function (e) {
    topHide(e);
  });

  $(window).on('load',function (e) {

    scrollToAnker(e);

  });


  function scroll(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var targetHref = $target.attr('href');

    if (targetHref.includes('#')) {
      $target.blur();

      var offset = $(targetHref).offset() || {};
      var offsetTop = offset.top - mainH - 20 || 0;

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

    if (scrollPos < mainH) {
      $scrollTotop.find('a').stop().animate({'bottom': '-100px'}, 200, 'swing');
    } else {
      $scrollTotop.find('a').stop().animate({'bottom': '100px'}, 200, 'swing');
    }
  }


    //ハッシュ付きリンク用に遅延して動作
  function scrollToAnker(e) {
    var urlHash = location.hash || false;
    if (urlHash && $(urlHash).length) {
      setTimeout(function () {
        var position = $(urlHash).offset().top - mainH -20;
        $('body,html').animate({scrollTop: position}, 100);
      }, 0);
    }

  }



});


