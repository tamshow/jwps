$(function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '0.5.0';

  var Selector = {
    BODY      : '[data-tab]',
    LIST      : '[data-tablist]',
    PANEL     : '[data-tabpanel]'
  };



  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */

  $(Selector.LIST).on('click touchend', function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    listSelect($target);
    panelSelect($target);
  });

  $(document).on('keyup', function (e) {
    e.preventDefault();
    tabKeyup(e);
  });


  $(window).on('load',function (e) {
    accessAnker(e);
  });


  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */


  function listSelect($target) {
    $target.focus();
    $target.parents('li').attr('aria-selected', 'true').attr('tabindex', '0').focus()
        .siblings('li').attr('aria-selected', 'false').attr('tabindex', '-1');
  }

  function panelSelect($target) {
    var panel = $target.attr('aria-controls');
    $('#' + panel).attr('aria-hidden', 'false')
        .siblings(Selector.PANEL).attr('aria-hidden', 'true');
  }

  function tabKeyup(e) {
    var $target = $(e.currentTarget);

    var leftArrow = 37;
    var rightArrow = 39;

    switch (e.keyCode) {

      case leftArrow:
        $target = $(e.target).prev().children(Selector.LIST);
        break;

      case rightArrow:

        $target = $(e.target).next().children(Selector.LIST);
        break;

      default:

        break;
    }
    listSelect($target);
    panelSelect($target);
  }



//ページアクセス時にハッシュがあれば該当のタブを開く
  function accessAnker() {
    var urlHash = location.hash || false;
    if (urlHash && $(urlHash).length) {
      if ($(urlHash).length) {
        $(urlHash).find('[data-tablist]').click();
      }
    }
  }

});





