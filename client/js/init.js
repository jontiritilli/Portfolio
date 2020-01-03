(function($){
  $(function () {
    document.addEventListener('scroll', () => {
      addTopBtn();
    });
    $('#top-btn').on('click', () => {
      scrollToTop();
    });
    $('a').on('click', (event) => {
      let scrolltarget = $(event.target).parent().attr("href");
      scrollToTarget(scrolltarget);
    });
    addButtonListeners();
  }); // end of document ready
})(jQuery); // end of jQuery name space
function addButtonListeners() {
  $('.neumorphic').on({
    'mousedown': function(){
      let element = $(this);
      if(!element.hasClass('pressed')){
        element.addClass('pressed');
      }
    },
    'mouseup': function(){
      let element = $(this);
      if(element.hasClass('pressed')){
        element.removeClass('pressed');
      }
    }
  })
}
function addTopBtn(){
  let showPosition = 82;
  let scrollPos = $(document).scrollTop();
  console.log(scrollPos)
  if (scrollPos > showPosition) {
    $('#top-btn').removeClass('scale-out');
  } else {
    $('#top-btn').addClass('scale-out');
  }
}
function scrollToTop() {
  $('body').animate({
    scrollTop: $(`body`).offset().top
  }, 750);
}
function scrollToTarget(target){
  if(target){
    console.log('target', target.slice(1,target.length));
    let element = document.getElementById(target.slice(1,target.length))
    console.log('element', element)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // $('body').animate({
    //   scrollTop: $(target).offset().top
    // }, 750);
  }
}
