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