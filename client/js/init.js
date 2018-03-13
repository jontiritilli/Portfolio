(function($){
  $(function () {
    window.addEventListener('scroll', () => {
      addTopBtn();
    })
    $('#topBtn').on('click', () => {
      topFunction();
    })
    $('.mobile-close-nav').on('click', () => {
      event.preventDefault();
      closeSideNav();
    })
    $('.button-collapse').sideNav({
      draggable: true
    });
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.navBtn').on('click', ()=>{
      scrollAndHide(event.target.id);
    });
    $('.sendBtn').on('click', () => {
      sendTrying();
      sendMail();
    });
    validate();

  }); // end of document ready
})(jQuery); // end of jQuery name space
  function addTopBtn(){
    if (window.scrollY > 65) {
      return document.getElementById('topBtn').style.display = "block";
    }
    document.getElementById('topBtn').style.display = "none";
  }
  function topFunction() {
    $('html, body').animate({
      scrollTop: $(`body`).offset().top
    }, 750);
  }
  function scrollAndHide(targetId){
    closeSideNav();
    if(targetId){
      $('html, body').animate({
        scrollTop: $(`${targetId}`).offset().top
      }, 750);
    }
  }
  function closeSideNav(){
    $('.button-collapse').sideNav('hide');
  }
  function sendMail(){
    if (!$(".contactForm").valid()){
      sendFailed();
      return
    }
    $.ajax({
      url: '/send',
      data: $('.contactForm').serialize(),
      method: 'post',
      success: function(res){
        $('input').val('');
        $('textarea').val('Thank you for your email! I\'ll get back to you as soon as possible');
        sendComplete()
      },
      error: function(err){
        $('input').val('');
        $('message').val('There was an issue sending the email')
        sendFailed();
      }
    })
  }
  function validate (){
    $(".contactForm").validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true,
          minlength: 15
        },
      },
      //For custom messages
      messages: {
        name: {
          required: "Please provide your name",
          minlength: "Enter at least 5 characters"
        },
        message: {
          required: "Please enter a message",
          minlength: "Enter at least 15 characters"
        }
      },
      errorElement: 'div',
      errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
          $(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      }
    });
  }

  function sendTrying(){
    let btn = $('.sendBtn');
    btn.addClass('sending');
    btn.empty();
    let spinner = $('<div>');
    spinner.append('Sending<i class="fas fa-spinner fa-pulse"></i>');
    btn.append(spinner);
  }

  function sendFailed(){
    let btn = $('.sendBtn')
    btn.removeClass('sending');
    btn.empty();
    btn.append('Send<i class="material-icons right">send</i>');
  }

  function sendComplete(){
    let btn = $('.sendBtn')
    btn.addClass('disabled')
    btn.removeClass('sending');
    btn.empty();
    btn.append('Sent<i class="material-icons right">send</i>');
  }