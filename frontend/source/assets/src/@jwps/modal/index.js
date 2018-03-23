import $ from 'jquery';

export default class Modal {
  constructor() {
    this.initialize();

  }

  initialize() {

    this.$modalSelector = $('[data-modal]');
    this.$openModalSelector = $('[data-open-modal]');
    this.$closeModalSelector = $('[data-close-modal]');
    this.$appendSelector = $('[data-append-modal]');

    if ($(this.$modalSelector).length) {

      this.$areaHidden = $('header, footer, main');
      this.currentScrollY = null;

      $('body').append('<div class="c-modal-dialog-bg" data-close-modal aria-expanded="true" aria-label="閉じる"></div>');
      this.$modalBg = $('.c-modal-dialog-bg');
      this.$modalBg.css({
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

      this.handleEvents();

    }
  }

  handleEvents() {
    this.$openModalSelector.on('click', (e) => {
      this.show(e);
    });

    $(document).on('keyup', (e) => {
      const ESCAPE_KEY_CODE = 27;
      if (e.keyCode === ESCAPE_KEY_CODE) {
        this.hide(e);
      }
    });

    this.$closeModalSelector.on('click', (e) => {
      this.hide(e);
    });

    this.$modalBg.on('click', (e) => {
      this.hide(e);
    });

  }

  show(e) {
    e.preventDefault();
    const $openButton = $(e.currentTarget);
    const containerAttr = $openButton.attr('aria-controls');
    const $container = $(`#${containerAttr}`);

    this.$modalBg.fadeIn(400);
    $container.fadeIn(400).attr({'aria-hidden': 'false', 'tabindex': '1'}).focus();
    this.$areaHidden.attr({'aria-hidden': 'true'});
    this.currentScrollY = $(window).scrollTop();

    $('body').css({
      position: 'fixed',
      width: '100%',
      top: -1 * this.currentScrollY
    });

    const $clone = $(`[data-clone-modal="${containerAttr}"]`);

    if ($clone.length && !this.$appendSelector.children().attr('data-clone-modal')) {
      const elem = $clone.clone(true);

      elem.find('.c-modal-dialog-none').remove();
      elem.removeAttr('style class').find('*').removeAttr('style class');
      this.$appendSelector.append(elem);
    }
  }

  hide(e) {

    this.$modalBg.fadeOut(0);
    this.$modalSelector.fadeOut(0).attr({'aria-hidden': 'true', 'tabindex': '-1'});
    this.$areaHidden.removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: this.currentScrollY});
    this.$appendSelector.empty();
  }
}

