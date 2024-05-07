const isHTMLElement = (element: Element | null): element is HTMLElement => {
  return Boolean(element && element instanceof HTMLElement);
};

/**
 * The default scroll options used in the app.
 */
export const scrollOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
  inline: 'center',
};

/**
 * Gets the distance from the element to the top of the viewport.
 */
export const getDistanceToTop = (element: HTMLElement): number => {
  let elem: HTMLElement | null = element;
  let distanceToTop = 0;

  while (elem !== null) {
    distanceToTop += elem.offsetTop;
    if (isHTMLElement(elem.offsetParent)) {
      elem = elem.offsetParent;
    } else {
      elem = null;
    }
  }

  return distanceToTop;
};

/**
 * Figures out whether the element is currently visible in the viewport.
 */
const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scrolls and element into view then calls the supplied callback. If the element is already in view it just calls the
 * callback.
 *
 * The intent of this function is so we can scroll a planet into view and then set an interval to follow it. It can take
 * a second or two to scroll an far away element into view.
 */
export const doCallbackAfterElementIsVisible = (element: HTMLElement, callback: () => void): void => {
  if (!isElementInViewport(element)) {
    setTimeout(() => {
      doCallbackAfterElementIsVisible(element, callback);
    }, 100);
  } else {
    callback();
  }
};

/**
 * Scrolls to the element if its not in the viewport.
 *
 * This is used for scrolling to a point of interest when it moves outside of the viewport. If we were to continually
 * scroll to the element the UI feels quite janky.
 */
export const scrollToElementIfNotVisible = (element?: HTMLDivElement | null): void => {
  if (element && !isElementInViewport(element)) {
    element.scrollIntoView(scrollOptions);
  }
};
