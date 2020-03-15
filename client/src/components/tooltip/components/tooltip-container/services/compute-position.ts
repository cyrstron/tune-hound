import {CSSProperties} from 'react';
import { ClassNamesFn } from 'classnames/types';

export interface Position {
  top: number;
  left: number;
}

export function computePosition(cx: ClassNamesFn, parent: HTMLElement, tooltip: HTMLDivElement | null): {
  style: CSSProperties;
  className?: string;
} {
  if (!tooltip) return {
    style: { visibility: 'hidden'}
  };

  const parentRect = parent.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  if (hasSpaceOnTop(parentRect, tooltipRect)) {
    return {
      className: cx('top'),
      style: calcTopPosition(parentRect, tooltipRect),
    }
  } else if (hasSpaceOnLeft(parentRect, tooltipRect)) {
    return {
      className: cx('left'),
      style: calcLeftPosition(parentRect, tooltipRect),
    }
  } else if (hasSpaceOnRight(parentRect, tooltipRect)) {
    return {
      className: cx('right'),
      style: calcRightPosition(parentRect, tooltipRect),
    }
  } else if (hasSpaceOnBottom(parentRect, tooltipRect)) {
    return {
      className: cx('bottom'),
      style: calcBottomPosition(parentRect, tooltipRect),
    }
  } else {
    return {
      style: { visibility: 'hidden'}
    };
  }
}

function hasSpaceOnTop(
  {top, width, right, left}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipHeight < top
  ) && (
    tooltipWidth / 2 < (width / 2) + (window.innerWidth - right)
  ) && (
    tooltipWidth / 2 < (width / 2) + left
  );
}

function calcTopPosition(
  {top, width, left}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): Position {
  return {
    top: top - tooltipHeight,
    left: (left + width / 2) - tooltipWidth / 2,
  }
}

function hasSpaceOnBottom(
  {bottom, width, right, left}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipHeight < (window.innerHeight - bottom)
  ) && (
    tooltipWidth / 2 < (width / 2) + (window.innerWidth - right)
  ) && (
    tooltipWidth / 2 < (width / 2) + left
  );
}

function calcBottomPosition(
  {bottom, width, left}: DOMRect, 
  {width: tooltipWidth}: DOMRect,
): Position {
  return {
    top: bottom,
    left: (left + width / 2) - tooltipWidth / 2,
  }
}


function hasSpaceOnLeft(
  {top, height, left, bottom}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipWidth < left
  ) && (
    tooltipHeight < (height / 2) + top
  ) && (
    tooltipHeight < (height / 2) + (window.innerHeight - bottom)
  );
}

function calcLeftPosition(
  {top, height, left}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): Position {
  return {
    left: left - tooltipWidth,
    top: (top + height / 2) - tooltipHeight / 2,
  }
}

function hasSpaceOnRight(
  {top, height, right, bottom}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipWidth < (window.innerWidth - right)
  ) && (
    tooltipHeight < (height / 2) + top
  ) && (
    tooltipHeight < (height / 2) + bottom
  );
}

function calcRightPosition(
  {top, height, right}: DOMRect, 
  {height: tooltipHeight}: DOMRect,
): Position {
  return {
    left: right,
    top: (top + height / 2) - tooltipHeight / 2,
  }
}