import Base       from './@JWPS/base';
import Accordion  from './@JWPS/accordion';
import Modal      from './@JWPS/modal';
import Tabs       from './@JWPS/tabs';
import Pagescroll from './@JWPS/pagescroll';
import OpenNav    from './@JWPS/opennav';
import AllCheck   from './@JWPS/allcheck';
import Repple     from './@JWPS/ripple';


document.addEventListener("DOMContentLoaded",  (e) => {
  // ------------------------------------------------------------
  const base = new Base();
  const accordion = new Accordion();
  const modal = new Modal();
  const tabs = new Tabs();
  const pagescroll = new Pagescroll();
  const repple = new Repple();

  const navSp = new OpenNav();
  const searchSp = new OpenNav({
    container: '[data-search-sp]',
    selector: '[data-toggle-search-sp]',
    bodyContents: '[data-body-search-sp]',
    bgSelector: '#js-header-search-bg-sp',
    iconOpen: 'search',
    iconClose: 'close'
  });

  const allCheck = new AllCheck({
    trigger: '[data-allcheck="trigger"]',
    container: '[data-allcheck="container"]'
  });


});




