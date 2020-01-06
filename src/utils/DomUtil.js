export function getDistanceToTop(element) {
    let elem = element;
    let distanceToTop = 0;

    while (elem) {
        distanceToTop += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return distanceToTop;
}

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function doCallbackAfterElementIsVisible(element, callback) {
    if (!isElementInViewport(element)) {
        setTimeout(() => doCallbackAfterElementIsVisible(element, callback), 100);
    } else {
        callback();
    }
}

export function scrollToElementIfNotVisible(element) {
    const scrollOptions = {
        behavior: "smooth",
        block: "center",
        inline: "center"
    };

    if (!isElementInViewport(element)) {
        element.scrollIntoView(scrollOptions);
    }
}
