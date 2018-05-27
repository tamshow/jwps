$(function () {

  var containerSelector = '[data-tab]';
  var tabListSelector = '[data-tablist]';
  var tabPanelSelector = '[data-tabpanel]';


  $(tabListSelector).on('click', function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    listSelect($target);
    panelSelect($target);
  });

  $(document).on('keyup', function(e) {
    e.preventDefault();
    tabKeyup(e);
  });



  function listSelect($target) {
    $target.focus();
    $target.parents('li').attr('aria-selected', 'true').attr('tabindex', '0').focus()
        .siblings('li').attr('aria-selected', 'false').attr('tabindex', '-1');
  }

  function panelSelect($target) {
    var panel = $target.attr('aria-controls');
    $('#' + panel).attr('aria-hidden', 'false')
        .siblings(this.tabPanelSelector).attr('aria-hidden', 'true');
  }


  function tabKeyup(e) {
    var $target = $(e.currentTarget);

    var leftArrow = 37;
    var rightArrow = 39;

    switch (e.keyCode) {

      case leftArrow:
        $target = $(e.target).prev().children(this.tabListSelector);
        break;

      case rightArrow:

        $target = $(e.target).next().children(this.tabListSelector);
        break;

      default:

        break;
    }
    listSelect($target);
    panelSelect($target);
  }



});
