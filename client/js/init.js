(function($){
  $(function () {
    document.body.addEventListener('scroll', () => {
      addTopBtn();
    });
    $('#top-btn').on('click', () => {
      topFunction();
    });
    $('a').on('click', (event) => {
      let scrolltarget = $(event.target).parent().attr("href");
      scrollAndHide(scrolltarget);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space

function addTopBtn(){
  let showPosition = 82;
  let scrollPos = $(document.body).scrollTop();
  if (scrollPos > showPosition) {
    $('#top-btn').removeClass('scale-out');
  } else {
    $('#top-btn').addClass('scale-out');
  }
}
function topFunction() {
  $('html, body').animate({
    scrollTop: $(`body`).offset().top
  }, 750);
}
function scrollAndHide(target){
  if(target){
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 750);
  }
}
