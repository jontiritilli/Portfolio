(function($){
  $(function(){

    $('.button-collapse').sideNav({
      draggable: true
    });
    $('.parallax').parallax();
    $('.carousel').carousel();
    $(".menu a").on('click', ()=>{
      scrollAndHide(event.target.id);
    });
    $(".sendBtn").on('click', () => {
      sendMail();
    });
    setInterval(()=>{ 
      slideShow()}, 
      3000
    )
  }); // end of document ready
})(jQuery); // end of jQuery name space
  function scrollAndHide(targetId){
    $('.button-collapse').sideNav('hide');
    if(targetId){
      $('html, body').animate({
        scrollTop: $(`${targetId}`).offset().top
      }, 2000);
    }
  }
  function slideShow(){
    $('.carousel').carousel('next')
  }
  function sendMail(){
    $.ajax({
      url: 'http://jonathantiritilli.com/send',
      data: $('.contactForm').serialize(),
      method: 'post',
      success: function(res){
        console.log(res)
        $('input').val('');
        $('textarea').val('Thank you for your email! I\'ll get back to you as soon as possible');
      },
      error: function(err){
        $('input[type="text"]').val('');
        $('message').val('there was an issue sending the email')
      }
    })
  }