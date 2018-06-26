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
        hide(e);
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