import $ from 'jquery';

export default class AllCheck {

  constructor(opts) {
    const defaults = {
      trigger: '[data-allcheck="trigger"]',
      container: '[data-allcheck="container"]'
    };
    this.conf = $.extend({}, defaults, opts);
    this.initialize();

  }

  initialize() {
    const {trigger, container} = this.conf;
    const $trigger = $(trigger);
    const $container = $(container);
    const $input = $container.find('input');
    $trigger.on('click', function () {
      if ($(this).prop('checked') == true) {
        $input.prop('checked', true);
      } else {
        $input.prop('checked', false);
      }
    });

  }
}


