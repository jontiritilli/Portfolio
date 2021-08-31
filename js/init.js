$(document).ready(function() {
  document.addEventListener("scroll", () => {
    addTopBtn();
  });
  addClickHandlers();
  setFooterDate();
});

function setFooterDate() {
  var date = new Date();
  var year = date.getFullYear();
  $("#footer-year").text(year);
}
function addClickHandlers() {
  $("#top-btn").on("click", () => {
    scrollToTop();
  });
  $("a").on("click", event => {
    let scrolltarget = $(event.currentTarget).attr("href");
    scrollToTarget(scrolltarget);
  });
  $(".neumorphic").on({
    mousedown: function() {
      let element = $(this);
      if (!element.hasClass("pressed")) {
        element.addClass("pressed");
      }
    },
    mouseup: function() {
      let element = $(this);
      if (element.hasClass("pressed")) {
        element.removeClass("pressed");
      }
    }
  });
}
function addTopBtn() {
  let showPosition = 150;
  let scrollPos = $(document).scrollTop();
  if (scrollPos > showPosition) {
    $("#top-btn").removeClass("scale-out");
  } else {
    $("#top-btn").addClass("scale-out");
  }
}
function scrollToTop() {
  $("html, body").animate(
    {
      scrollTop: $("body").offset().top
    },
    500
  );
}
function scrollToTarget(target) {
  if (target) {
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top
      },
      500
    );
  }
}
