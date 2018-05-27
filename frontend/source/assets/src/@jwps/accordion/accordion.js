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