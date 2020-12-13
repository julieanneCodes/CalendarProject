var $ = require('jquery');

window.$ = $;
window.jQuery = $;

$(function() {
  $("#sbtn").on('click', function() {
    window.location.href="http://localhost:8000/login"
  });
});