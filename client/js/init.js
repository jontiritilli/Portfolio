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
    //deploy modals
    $('.modal').modal();
    $('.navBtn').on('click', ()=>{
      scrollAndHide(event.target.id);
    });
    $('.sendBtn').on('click', () => {
      sendTrying();
      sendMail();
    });
    validate();
    $.validator.methods.email = function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(value);
    }
    $.validator.addMethod("lettersOnly", function (value, element) {
      return this.optional(element) || /^([a-zA-Z0-9]+\s?[a-zA-Z0-9])*$/.test(value)
    }, "Alpha only");
    $('img.svg').each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Check if the viewport is set, else we gonna set it if we can.
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }

          // Replace image with new SVG
          $img.replaceWith($svg);

      }, 'xml');
    });
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
        scrollTop: $(targetId).offset().top
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
        $('input, textarea').prop({
          disabled: true
        });
        sendComplete();
      },
      error: function(err){
        $('.modalHeader').text('Error');
        $('.modalMessage').text('There was an issue sending your message, please try again');
        $('.modal').modal('open')
        sendFailed();
      }
    })
  }

  function validate (){
    $(".contactForm").validate({
      rules: {
        name: {
          required: true,
          lettersOnly: true,
          minlength: 2
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
          lettersOnly: 'Use only text characters',
          minlength: "Enter at least 2 characters"
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