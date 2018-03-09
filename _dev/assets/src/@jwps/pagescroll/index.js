import $ from 'jquery';

export default class Pagescroll {
  constructor() {
    this.initialize();
  }

  initialize() {

    this.scrollSelector = '[data-scroll]';
    this.$scrollTotop = $('[data-scroll="to-top"]');
    this.mainH = $('header').height();

    this.handleEvents();
  }

  handleEvents() {

    $(document).on('click', `${this.scrollSelector} a`, (e) => {
      this.scroll(e);
    });


    $(window).scroll((e) => {
      this.topHide(e);
    });
  }

  scroll(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    const targetHref = $target.attr('href');

    if (targetHref.includes('#')) {
      $target.blur();
      $('html,body').animate(
          {scrollTop: $(targetHref).offset().top},
          {
            duration: 300, easing: 'swing', complete: function () {
            if (targetHref !== '#skippy') {
              window.location.hash = targetHref;
            }
          }
          });
    }
  }

  topHide(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    const scrollPos = $target.scrollTop();

    if (scrollPos < this.mainH) {
      this.$scrollTotop.find('a').stop().animate({'bottom': '-100px'}, 200, 'swing');
    } else {
      this.$scrollTotop.find('a').stop().animate({'bottom': '15px'}, 200, 'swing');
    }
  }
}
