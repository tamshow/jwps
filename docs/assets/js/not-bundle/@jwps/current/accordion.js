$(function () {

  if(location.pathname != "/") {
    $('.js-current-nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('is-active');
  } else{
    $('.js-current-nav a:eq(0)').addClass('is-active');
  }
  
});