import $ from 'jquery';

export default class Accordion {

  constructor(opts = {}) {

    const defaults = {
      tabWidth: '960px',
      spWidth: '600px'
    };

    this.tabWidth = opts.tabWidth || defaults.tabWidth;
    this.spWidth = opts.spWidth || defaults.spWidth;

    this.initialize();
  }

  initialize() {

    this.$selectorAC = $('[data-toggle-accordion]');
    this.containerAC = '[data-accordion]';
    this.deviceAC = '[data-device-accordion]';//all, pc, tab, sp
    this.bodyAC = '[data-body-accordion]';
    $.Event('E_ENTER_KYE_CODE', {keyCode: 13, which: 13});

    this.handleEvents();
  }

  handleEvents() {

    this.$selectorAC.on('click E_ENTER_KYE_CODE', (e) => {

      const media = $(e.currentTarget).parents(this.deviceAC).data('device-accordion') || 'all';
      const isMobile =  window.matchMedia(`(max-width:${this.spWidth})`).matches || false;
      const isTablet =  window.matchMedia(`(min-width:${this.spWidth}) and (max-width:${this.tabWidth})`).matches || false;

      if (media.match(/all/) ||
          (media.match(/sp/) && isMobile) ||
          (media.match(/tab/) && isTablet) ||
          (media.match(/pc/) && ( !isMobile && !isTablet))
      ) {
        this.toggle(e);
      }
    });
  }

  toggle(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    const $containerAC = $target.parents(this.containerAC);
    const $bodyAC = $containerAC.find(this.bodyAC);

    if ($containerAC.hasClass('is-active')) {
      $containerAC.removeClass('is-active');
      $target.attr({'aria-expanded': 'true', 'aria-label': '閉じる'});
      $bodyAC.stop().slideUp(150).attr('aria-hidden', 'true');
    } else {

      $containerAC.addClass('is-active');
      $target.attr({'aria-expanded': 'false', 'aria-label': '開く'});
      $bodyAC.stop().slideDown(200).attr('aria-hidden', 'false').focus();


      const offset = $target.offset() || {};
      const offsetTop = offset.top || 0;

      $('html,body').animate({scrollTop: offsetTop - ($('header').height())}, {
        duration: 500,
        easing: 'swing'
      });

    }
  }
}

