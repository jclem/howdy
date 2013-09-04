$(function () {
  manageNavigation();
  manageSlideHeight();
});

function manageNavigation () {
  if (!window.location.hash) {
    setCurrentSlide("#slide1");
  }

  var incrementKeys = [39, 40, 74, 76],
      decrementKeys = [37, 38, 72, 75],
      allKeys = incrementKeys.concat(decrementKeys);

  $(window).on('keydown', function (e) {
    if (allKeys.concat(32).indexOf(e.which) > -1) {
      e.preventDefault();
    } else {
      return;
    }

    if (e.shiftKey && allKeys.indexOf(e.which) > -1) {
      if (decrementKeys.indexOf(e.which) > -1) {
        return setCurrentSlide('#slide' + 1);
      } else {
        return setCurrentSlide('#slide' + getMaxSlideNumber());
      }
    }

    if (decrementKeys.indexOf(e.which) > -1 || (e.shiftKey && e.which == 32)) {
      if (getCurrentSlideNumber() === 1) return;
      decrementSlide();
    } else if (incrementKeys.concat(32).indexOf(e.which) > -1) {
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
