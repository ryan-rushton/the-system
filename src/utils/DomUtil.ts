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

export const getDistanceToTop = (element: HTMLElement): number => {
  let elem: HTMLElement = element;
  let distanceToTop = 0;

  while (elem) {
    distanceToTop += elem.offsetTop;
    if (isHTMLElement(elem.offsetParent)) {
      elem = elem.offsetParent;
    } else {
      break;
    }
  }

  return distanceToTop;
};

const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const doCallbackAfterElementIsVisible = (element: HTMLElement, callback: () => void): void => {
  if (!isElementInViewport(element)) {
    setTimeout(() => doCallbackAfterElementIsVisible(element, callback), 100);
  } else {
    callback();
  }
};

export const scrollToElementIfNotVisible = (element?: HTMLDivElement | null): void => {
  const scrollOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  };

  if (element && !isElementInViewport(element)) {
    element?.scrollIntoView(scrollOptions);
  }
};
