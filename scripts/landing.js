function revealPoint(index) {
    "use strict";
    
    var i = index + 1,
        point = document.querySelector(".point:nth-child(" + i + ")");
    
    // Create a "staggered" animation effect
    point.style.transitionDelay = 0.2 * i + "s";
    point.style.msTransitionDelay = 0.2 * i + "s";
    point.style.WebkitTransitionDelay = 0.2 * i + "s";

    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
}

window.onload = function () {
    "use strict";
    
    for (let i = 0; i < 3; ++i) {
        revealPoint(i);
    }
};
