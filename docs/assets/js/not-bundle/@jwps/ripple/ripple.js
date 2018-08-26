window.addEventListener('DOMContentLoaded', function () {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME      = 'ripple';
  var VERSION   = '1.0.0';

  var Selector = {
    TARGETS   : document.getElementsByClassName('js-ripple')
  };

  var ClassName = {
    ACTIVE    : 'js-rp-effect'
  };

  const Default = {
    speed     : 1000
  };

  /**
   * ------------------------------------------------------------------------
   * Event
   * ------------------------------------------------------------------------
   */


  for (let i = 0; i < Selector.TARGETS.length; i++) {
    Selector.TARGETS[i].addEventListener('mousedown', function (e) {
      rippleButton(Selector.TARGETS[i], e);
    })
  }

  /**
   * ------------------------------------------------------------------------
   * Function
   * ------------------------------------------------------------------------
   */

  function rippleButton(button, e) {
    var dimension = Math.max(button.clientWidth, button.clientHeight);
    var loc = button.getBoundingClientRect();
    var circle = document.createElement('span');
    circle.classList.add(ClassName.ACTIVE);
    circle.style.width = dimension + 'px';
    circle.style.height = dimension + 'px';
    circle.style.left = e.clientX - button.offsetLeft - (dimension / 2) + 'px';
    circle.style.top = e.clientY - button.offsetTop - (dimension / 2) + document.documentElement.scrollTop + 'px';
    button.appendChild(circle);
    setTimeout(function () {
      button.removeChild(circle);
    }, Default.speed);
  }

});

