import _ from 'lodash';

export default class Ripple {

  constructor(opts) {
    this.initialize();
  }

  initialize() {
    this.handleEvents();
  }

  handleEvents() {
    this.ripples = document.querySelectorAll('.js-ripple');
    _.each(this.ripples, (elem) => {
      this.rippleButton(elem);
    })
  }
  
  rippleButton(btn) {
    btn.addEventListener('mousedown', (e) => {
      const dimension = Math.max(btn.clientWidth, btn.clientHeight);
      const loc = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.classList.add('js-rp-effect');
      circle.style.width = dimension + 'px';
      circle.style.height = dimension + 'px';
      circle.style.left = e.clientX - btn.offsetLeft - (dimension / 2) + 'px';
      circle.style.top = e.clientY - btn.offsetTop - (dimension / 2) + document.documentElement.scrollTop + 'px';
      btn.appendChild(circle);
      setTimeout(function () {
        btn.removeChild(circle);
      }, 1000);
    })
  }

}



/*

 <button class="js-ripple e-btn" type="button">もっと見る</button>


 .js-ripple {
   overflow: hidden;
   position: relative;
 }

 .js-rp-effect {
   width: 100%;
   height: 100%;
   border-radius: 50%;
   background-color: rgba(255, 255, 255, .5);
   position: absolute;
   opacity: 0;
   transform: scale(0);
   animation: 500ms ripple-fg forwards, 500ms ripple-fg-opacity-out forwards;
 }

 @keyframes ripple-fg {
   to {
     transform: scale(2.5);
   }
 }

 @keyframes ripple-fg-opacity-out {
   from {
     animation-timing-function: $animation-sharp-curve-timing-function;
     opacity: 1;
   }
   to {
     opacity: 0;
   }
 }
 * */