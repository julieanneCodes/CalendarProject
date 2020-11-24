var $ = require('jquery');

window.$ = $;
window.jQuery = $;

$(function() {
  var searchRequest = null;

  $("#sButton").on('click', function() {
    var inputValue = $("#search").val();
    if (searchRequest !=null)
    searchRequest.abort();

    searchRequest = $.ajax({
      type: "GET",
      url: "/search",
      data: {
        query: inputValue.toLowerCase(),
      },
      dataType: "text",
      success: function(data) {
       // if(inputValue == $(that).val()) {
          var result = JSON.parse(data);
          /*$.each(result, function(key, arr) {
            $.each(arr, function(id, value) {
              if(key == 'entity') {
                if(id != 'error') {
                  console.log(result);
                }
              }
            });
          });*/
         console.log(result);
        //}
      }
    });
  });
});