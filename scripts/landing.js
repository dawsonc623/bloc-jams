function animatePoints(points) {
    function revealPoint(point, delay) {
        "use strict";

        // Create a "staggered" animation effect
        point.style.transitionDelay = delay + "s";
        point.style.msTransitionDelay = delay + "s";
        point.style.WebkitTransitionDelay = delay + "s";

        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
    forEach(points, function(point, index) {
        revealPoint(point, 0.2 * (index + 1));
    });
}

window.onload = function () {
    "use strict";
    
    var points = document.getElementsByClassName("point"),
        pointsContainer = document.querySelector(".selling-points"),
        scrollThreshold = pointsContainer.getBoundingClientRect().top - window.innerHeight + 200;
    
    // In case the points are within visible range already
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollThreshold) {
        animatePoints(points);
    }
    else {
        window.addEventListener("scroll", function(event) {
            if (document.documentElement.scrollTop || document.body.scrollTop >= scrollThreshold) {
                animatePoints(points);
            }
        });
    }
};
