(function($){
  $(function () {
    document.body.addEventListener('scroll', () => {
      addTopBtn();
    })
    $('#top-btn').on('click', () => {
      topFunction();
    })
    $('.button-collapse').sideNav({
      draggable: true
    });
    $('.parallax').parallax();
    //deploy modals
    $('.modal').modal();
    $('a').on('click', (event)=>{
      let scrolltarget = $(event.target).parent().attr("href");
      scrollAndHide(scrolltarget);
    });
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
    appendContactInfo($);
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
    console.log("scroll and hide", "target", target);
    if(target){
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 750);
    }
  }
  function closeSideNav(){
    $('.button-collapse').sideNav('hide');
  }
  function appendContactInfo($) {
    $('#text-number').attr('href', 'sms:951-282-7630');
    $('#call-number').attr('href', 'tel:951-282-7630');
    $('#contact-email').attr('href', 'mailto:JonTiritilli@gmail.com');
  }