import Base       from './@jwps/base';
import Accordion  from './@jwps/accordion';
import Modal      from './@jwps/modal';
import Tabs       from './@jwps/tabs';
import Pagescroll from './@jwps/pagescroll';
import OpenNav    from './@jwps/opennav';
import AllCheck   from './@jwps/allcheck';
import Repple     from './@jwps/ripple';


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




