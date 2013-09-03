$(function () {
  manageNavigation();
  manageSlideHeight();
});

function manageNavigation () {
  if (!window.location.hash) {
    setCurrentSlide("#slide1");
  }

  $(window).on('keydown', function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.which) > -1) {
      e.preventDefault();
    } else {
      return;
    }

    if ([37, 38].indexOf(e.which) > -1 || (e.shiftKey && e.which == 32)) {
      if (getCurrentSlideNumber() === 1) return;
      decrementSlide();
    } else if ([32, 39, 40].indexOf(e.which) > -1) {
      if (getMaxSlideNumber() === getCurrentSlideNumber()) return;
      incrementSlide();
    }
  });

  function decrementSlide () {
    setCurrentSlide('#slide' + (getCurrentSlideNumber() - 1));
  }

  function getCurrentSlideNumber () {
    return +window.location.hash.split('#slide')[1];
  }

  function getMaxSlideNumber () {
    return +$('.slide').last().attr('id').split('slide')[1];
  }

  function incrementSlide () {
    setCurrentSlide('#slide' + (getCurrentSlideNumber() + 1));
  }

  function setCurrentSlide (slide) {
    window.location.hash = slide;
  }
}

function manageSlideHeight () {
  setSlideHeight();

  $(window).on('resize', function () {
    setSlideHeight();
  });

  function setSlideHeight () {
    var height = $(window).height();
    $('.slide').height(height);
  }
}
