import { CallbackFunction } from '../types';

type ParentElement = HTMLElement | null;

const isParentElement = (element: Element | null): element is ParentElement => {
  return element === null || element instanceof HTMLElement;
};

export const scrollOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
  inline: 'center',
};

export const getDistanceToTop = (element: HTMLElement): number => {
  let elem: HTMLElement | null = element;
  let distanceToTop = 0;

  while (elem) {
    distanceToTop += elem.offsetTop;
    if (isParentElement(elem.offsetParent)) {
      elem = elem.offsetParent;
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

export const doCallbackAfterElementIsVisible = (element: HTMLElement, callback: CallbackFunction): void => {
  if (!isElementInViewport(element)) {
    setTimeout(() => doCallbackAfterElementIsVisible(element, callback), 100);
  } else {
    callback();
  }
};

export const scrollToElementIfNotVisible = (element: HTMLDivElement | null): void => {
  const scrollOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  };

  if (element && !isElementInViewport(element)) {
    element?.scrollIntoView(scrollOptions);
  }
};
