$(function () {
  var ripples = document.querySelectorAll('.js-ripple');
  _.each(ripples, function(elem) {
    rippleButton(elem);

  });

  function rippleButton(button) {
    button.addEventListener('mousedown', function(e) {
      var dimension = Math.max(button.clientWidth, button.clientHeight);
      var loc = button.getBoundingClientRect();
      var circle = document.createElement('span');
      circle.classList.add('js-rp-effect');
      circle.style.width = dimension + 'px';
      circle.style.height = dimension + 'px';
      circle.style.left = e.clientX - button.offsetLeft - (dimension / 2) + 'px';
      circle.style.top = e.clientY - button.offsetTop - (dimension / 2) + document.documentElement.scrollTop + 'px';
      button.appendChild(circle);
      setTimeout(function () {
        button.removeChild(circle);
      }, 1000);
    })
  }

});

