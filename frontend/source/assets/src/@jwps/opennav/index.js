import $ from 'jquery';


export default class OpenNav {


  constructor(opts = {}) {


    const defaults = {
      selector: '[data-toggle-nav-sp]',
      bodyContents: '[data-body-nav-sp]',
      bgSelector: '#js-header-nav-bg-sp',
      lowerLayerSelector: '.l-footer, .main',
      iconOpen: 'menu',
      iconClose: 'close',
      focusSelector: '.l-header-search-sp__input'
    };

    this.selector = opts.selector || defaults.selector;
    this.bodyContents = opts.bodyContents || defaults.bodyContents;
    this.bgSelector = opts.bgSelector || defaults.bgSelector;
    this.lowerLayerSelector = opts.lowerLayerSelector || defaults.lowerLayerSelector;
    this.iconOpen = opts.iconOpen || defaults.iconOpen;
    this.iconClose = opts.iconClose || defaults.iconClose;
    this.focusSelector = opts.focusSelector || defaults.focusSelector;

    this.currentScrollY = null;
    this.initialize();

  }


  initialize() {

    this.handleEvents();
  }

  handleEvents() {

    //const $container = $(this.container);
    const $selector = $(this.selector);
    const $bodyContents = $(this.bodyContents);
    const $bgSelector = $(this.bgSelector);
    const $lowerLayerSelector = $(this.lowerLayerSelector);
    const $focusSelector = $(this.focusSelector);


    $selector.on('click', (e) => {

      this.toggle(e, $selector, $bodyContents, $bgSelector, $lowerLayerSelector, this.iconOpen, this.iconClose, $focusSelector);

    });

    $bgSelector.on('click', (e) => {
      this.settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, this.iconOpen, this.iconClose, $focusSelector);
    });

  }

  toggle(e, $selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, iconClose, $focusSelector) {

    e.preventDefault();

    if ($bodyContents.attr('aria-hidden') === 'true') {
      //ナビゲーションのレイヤーを上にしてスライドイン
      $bodyContents.attr({'aria-hidden': 'false', 'tabindex': '1'});
      $('input').first().focus();
      //メニューアイコン
      $selector.attr({'aria-expanded': 'true', 'aria-label': '閉じる'}).find('i').text(iconClose);
      //背景黒
      $bgSelector.css({
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        overflow: 'hidden',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '998'
      });

      //下のレイヤーをhidden
      $lowerLayerSelector.attr({'aria-hidden': 'true'});
      this.currentScrollY = $(window).scrollTop();
      //現在地のスクロールを保持
      $('body').css({
        position: 'fixed',
        width: '100%',
        top: -1 * this.currentScrollY
      });

    } else {
      this.settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, this.iconOpen, this.iconClose, $focusSelector);
    }
  }

  settingInitialization($selector, $bodyContents, $bgSelector, $lowerLayerSelector, iconOpen, $focusSelector) {

    $bodyContents.attr({'aria-hidden': 'true', 'tabindex': '-1'});
    $selector.attr({'aria-expanded': 'false', 'aria-label': '開く'}).find('i').text(iconOpen);
    $bgSelector.attr({style: ''});
    $lowerLayerSelector.removeAttr('aria-hidden');
    $('body').attr({style: ''});
    $('html, body').prop({scrollTop: this.currentScrollY});
  }

}
