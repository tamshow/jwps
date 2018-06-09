$(function () {
  _.each($('.js-posts'), function (elem) {
    var url = $(elem).data('url');
    var templates = _.template($(elem).find('script').html());

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      cache: false
    }).then(
        function (data) {
          $(elem).append(templates({
            'data': data
          }));
        },

        function () {
          console.log('No Data');
        });
  });
});



