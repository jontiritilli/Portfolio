(function($){
  $(function(){

    $('.button-collapse').sideNav({
      draggable: true
    });
    $('.parallax').parallax();
    $('.carousel').carousel();
    $(".menu > li").on('click', ()=>{
      scrollAndHide(event.target.id);
    });
    setInterval(()=>{ 
      slideShow()}, 
      3000
    )
  }); // end of document ready
})(jQuery); // end of jQuery name space
  function scrollAndHide(link){
    $('.button-collapse').sideNav('hide');
    if(link){
      $('html, body').animate({
        scrollTop: $(`${link}`).offset().top
      }, 2000);
    }
  }
  function slideShow(){
    $('.carousel').carousel('next')
  }