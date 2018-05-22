$(function () {
  var template =
      '<ul class="l-grids-4to2to2">'+
        '<% _.each(data, function(result) { %>'+
        '<li class="l-grid c-card">'+
          '<a href="<%-result.url %>">'+
            '<div class="c-card__img"><img src="<%- result.image_path %>" alt=""></div>'+
            '<div class="c-card__body">'+
              '<p class="c-card__text is-text-week"> <%- result.date %></p>'+
              '<div class="c-card__label">'+
              '<% _.each(result.tags, function(key, tag) { %>'+
               '<span class="e-label <%-key %>"> <%-tag %></span>'+
              '<% }); %>'+
            '</div>'+
              '<p class="c-card__title"><%- result.title %></p>'+
            '</div>'+
          '</a>'+
        '</li>'+
        '<% }); %>'+
      '</ul>';

  var templates = _.template(template);

  _.each($('.js-news-post'), function(ele) {
    var url = $(ele).data('url');
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      cache: false
    }).then(
        function(data) {
          $(ele).append(templates({'data': data}));
        },
        function() {
          console.log('No Data');
        }
    );
  });
});


