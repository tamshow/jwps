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