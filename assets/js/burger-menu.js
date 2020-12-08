var $ = require('jquery');

window.$ = $;
window.jQuery = $;

$(function() {
  $(".burger").on('click', function() {
    $('#burgerMenu').css('height','100%');
  });
  
  $(".closebtn").on('click', function() {
    $('#burgerMenu').css('height','0%');
  });
});