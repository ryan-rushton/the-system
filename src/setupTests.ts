import '@testing-library/jest-dom';
import './i18nForTests';

// JSDOM isn't providing the right methods for svg elements, see https://github.com/framer/motion/issues/204
if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}
