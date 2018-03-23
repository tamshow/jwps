import $ from 'jquery';

export default class AllCheck {

  constructor(opts = {}) {

    const defaults = {
      trigger: '[data-allcheck="trigger"]',
      container: '[data-allcheck="container"]'
    };

    this.trigger = opts.trigger || defaults.trigger;
    this.container = opts.container || defaults.container;

    this.initialize();

  }

  initialize() {
    const $trigger = $(this.trigger);
    const $container = $(this.container);
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


