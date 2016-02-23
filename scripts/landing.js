function animatePoints(points) {
    $.each(points, function(index, point) {
        $(point).css({
            "opacity": 1,
            "transform": "scaleX(1) translateY(0)",
            // "stagger" the transitions
            "transitionDelay": 0.2 * (index + 1) + "s"
        });
    });
}

$(window).load(function () {
    "use strict";

    var points = document.getElementsByClassName("point"),
        scrollThreshold,
        $window = $(window);
    
    scrollThreshold = $(".selling-points").offset().top - $window.height() + 200;

    // In case the points are within visible range already
    if ($window.scrollTop() >= scrollThreshold) {
        animatePoints(points);
    }
    else {
        $(window).scroll(function(event) {
            if ($window.scrollTop() >= scrollThreshold) {
                animatePoints(points);
            }
        });
    }
});
