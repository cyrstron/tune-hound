import {CSSProperties} from 'react';
import { ClassNamesFn } from 'classnames/types';

export interface Position {
  top: number;
  left: number;
}

export interface MousePosition {
  clientX: number;
  clientY: number;
}

export function computePosition(
  mousePosition: MousePosition,
  cx: ClassNamesFn, 
  parent: HTMLElement, 
  tooltip: HTMLDivElement | null
): {
  style: CSSProperties;
  className: string;
} | undefined {
  if (!tooltip) return;

  const parentRect = parent.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  if (hasSpaceOnTop(parentRect, tooltipRect)) {
    return {
      className: cx('top'),
      style: calcTopPosition(mousePosition, parentRect, tooltipRect),
    }
  } else if (hasSpaceOnLeft(parentRect, tooltipRect)) {
    return {
      className: cx('left'),
      style: calcLeftPosition(mousePosition, parentRect, tooltipRect),
    }
  } else if (hasSpaceOnRight(parentRect, tooltipRect)) {
    return {
      className: cx('right'),
      style: calcRightPosition(mousePosition, parentRect, tooltipRect),
    }
  } else if (hasSpaceOnBottom(parentRect, tooltipRect)) {
    return {
      className: cx('bottom'),
      style: calcBottomPosition(mousePosition, parentRect, tooltipRect),
    }
  }
}

function hasSpaceOnTop(
  {top}: DOMRect, 
  {height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipHeight < top
  );
}

function calcTopPosition(
  {clientX}: MousePosition,
  {top}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): Position {
  return {
    top: top - tooltipHeight,
    left: Math.max((clientX - tooltipWidth / 2), 0),
  }
}

function hasSpaceOnBottom(
  {bottom}: DOMRect, 
  {height: tooltipHeight}: DOMRect,
) {
  return (
    tooltipHeight < (window.innerHeight - bottom)
  );
}

function calcBottomPosition(
  {}: MousePosition,
  {bottom, width, left}: DOMRect, 
  {width: tooltipWidth}: DOMRect,
): Position {
  return {
    top: bottom,
    left: (left + width / 2) - tooltipWidth / 2,
  }
}

function hasSpaceOnLeft(
  {left}: DOMRect, 
  {width: tooltipWidth}: DOMRect,
) {
  return (
    tooltipWidth < left
  );
}

function calcLeftPosition(
  {}: MousePosition,
  {top, height, left}: DOMRect, 
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): Position {
  return {
    left: left - tooltipWidth,
    top: (top + height / 2) - tooltipHeight / 2,
  }
}

function hasSpaceOnRight(
  {right}: DOMRect, 
  {width: tooltipWidth}: DOMRect,
) {
  return (
    tooltipWidth < (window.innerWidth - right)
  );
}

function calcRightPosition(
  {}: MousePosition,
  {top, height, right}: DOMRect, 
  {height: tooltipHeight}: DOMRect,
): Position {
  return {
    left: right,
    top: (top + height / 2) - tooltipHeight / 2,
  }
}