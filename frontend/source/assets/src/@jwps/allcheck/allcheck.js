$(function () {

  var trigger = '[data-allcheck="trigger"]';
  var container = '[data-allcheck="container"]';

  var $trigger = $(rigger);
  var $container = $(container);
  var $input = $container.find('input');
  $trigger.on('click', function () {
    if ($(this).prop('checked') == true) {
      $input.prop('checked', true);
    } else {
      $input.prop('checked', false);
    }
  });
  
});




