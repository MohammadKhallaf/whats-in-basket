$(window).resize(function () {
  const horizontalScale = ($(window).width() / $(document).width()).toFixed(4);
  const verticalScale = ($(window).height() / $(document).height()).toFixed(4);
  const smallestScale =
    horizontalScale < verticalScale ? horizontalScale : verticalScale;
  $("body").css({
    transform: `scale(${smallestScale})`,
    "-ms-transform": `scale(${smallestScale})`,
    "-webkit-transform": `scale(${smallestScale})`,
  });
});
