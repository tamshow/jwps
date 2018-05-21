

import $ from 'jquery';

export default class Tabs {

  constructor() {
    this.initialize();
  }

  initialize() {
    this.containerSelector = '[data-tab]';
    this.tabListSelector = '[data-tablist]';
    this.tabPanelSelector = '[data-tabpanel]';
    this.handleEvents();
  }


  handleEvents() {

    $(this.tabListSelector).on('click', (e) => {
      e.preventDefault();
      let $target = $(e.currentTarget);
      this.listSelect($target);
      this.panelSelect($target);
    });

    $(document).on('keyup', (e) => {
      e.preventDefault();
      this.tabKeyup(e);
    });

  }

  listSelect($target) {
    $target.focus();
    $target.parents('li').attr('aria-selected', 'true').attr('tabindex', '0').focus()
        .siblings('li').attr('aria-selected', 'false').attr('tabindex', '-1');
  }

  panelSelect($target) {
    const panel = $target.attr('aria-controls');
    $(`#${panel}`).attr('aria-hidden', 'false')
        .siblings(this.tabPanelSelector).attr('aria-hidden', 'true');
  }

  tabKeyup(e) {
    let $target = $(e.currentTarget);

    let leftArrow = 37;
    let rightArrow = 39;

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
    this.listSelect($target);
    this.panelSelect($target);
  }
}
