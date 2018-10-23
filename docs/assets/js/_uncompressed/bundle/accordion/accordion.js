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


  $(Selector.TARGET).on('click E_ENTER_KYE_CODE', function (e) {

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



  $(Selector.ANKER).on('click', function() {
    innerAnker()
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
      $bodyAC.stop().slideUp(150).attr('aria-hidden', 'true');
    } else {
      $containerAC.addClass('is-active');
      $current_target.attr({'aria-expanded': 'false', 'aria-label': '開く'});
      $bodyAC.stop().slideDown(200).attr('aria-hidden', 'false').focus();

      var offset = $current_target.offset() || {};
      var offsetTop = offset.top || 0;

      $('html,body').animate({scrollTop: offsetTop - ($('header').height())}, {
        duration: 500,
        easing: 'swing'
      });

    }
  }

  function innerAnker() {
    //アコーディオン内から別アコーディオンを開く
    var targetHref = $(this).attr('href');
    if (targetHref.indexOf('#') != -1) {
      $('[aria-controls="'+targetHref.slice(1)+'"]').click();
    }
  }
  
  function accessAnker() {
    //ハッシュでアコーディオン開く
    var urlHash = location.hash || false;
    if (urlHash && $(urlHash).length) {
      if ($('[aria-controls="' + urlHash.slice(1) + '"]').length) {
        $('[aria-controls="' + urlHash.slice(1) + '"]').click();
      }
    }
  }



});