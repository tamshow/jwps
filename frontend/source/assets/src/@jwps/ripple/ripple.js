$(function () {
  var ripples = document.querySelectorAll('.js-ripple');
  _.each(ripples, function(elem) {
    rippleButton(elem);

  });

  function rippleButton(btn) {
    btn.addEventListener('mousedown', function(e) {
      var dimension = Math.max(btn.clientWidth, btn.clientHeight);
      var loc = btn.getBoundingClientRect();
      var circle = document.createElement('span');
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

});

