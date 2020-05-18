export interface Position {
  top: number;
  left: number;
}

export interface PositionStyle {
  top: string;
  left: string;
}

export interface MousePosition {
  clientX: number;
  clientY: number;
}

function hasSpaceOnTop(
  {top}: DOMRect,
  {height: tooltipHeight}: DOMRect,
): boolean {
  return (
    tooltipHeight < top
  );
}

function calcTopPosition(
  {clientX}: MousePosition,
  {top}: DOMRect,
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): PositionStyle {
  return {
    top: `${top - tooltipHeight}px`,
    left: `${Math.max((clientX - tooltipWidth / 2), 0)}px`,
  };
}

function calcBottomPosition(
  {bottom, width, left}: DOMRect,
  {width: tooltipWidth}: DOMRect,
): PositionStyle {
  return {
    top: `${bottom}px`,
    left: `${(left + width / 2) - tooltipWidth / 2}px`,
  };
}

function hasSpaceOnLeft(
  {left}: DOMRect,
  {width: tooltipWidth}: DOMRect,
): boolean {
  return (
    tooltipWidth < left
  );
}

function calcLeftPosition(
  {top, height, left}: DOMRect,
  {width: tooltipWidth, height: tooltipHeight}: DOMRect,
): PositionStyle {
  return {
    left: `${left - tooltipWidth}px`,
    top: `${(top + height / 2) - tooltipHeight / 2}px`,
  };
}

function hasSpaceOnRight(
  {right}: DOMRect,
  {width: tooltipWidth}: DOMRect,
): boolean {
  return (
    tooltipWidth < (window.innerWidth - right)
  );
}

function calcRightPosition(
  {top, height, right}: DOMRect,
  {height: tooltipHeight}: DOMRect,
): PositionStyle {
  return {
    left: `${right}px`,
    top: `${(top + height / 2) - tooltipHeight / 2}px`,
  };
}


export function computePosition(
  mousePosition: MousePosition,
  parent: HTMLElement,
  tooltip: HTMLDivElement,
): {
  style: PositionStyle;
  className: string;
} {
  const parentRect = parent.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  if (hasSpaceOnTop(parentRect, tooltipRect)) {
    return {
      className: 'top',
      style: calcTopPosition(mousePosition, parentRect, tooltipRect),
    };
  } else if (hasSpaceOnLeft(parentRect, tooltipRect)) {
    return {
      className: 'left',
      style: calcLeftPosition(parentRect, tooltipRect),
    };
  } else if (hasSpaceOnRight(parentRect, tooltipRect)) {
    return {
      className: 'right',
      style: calcRightPosition(parentRect, tooltipRect),
    };
  } else {
    return {
      className: 'bottom',
      style: calcBottomPosition(parentRect, tooltipRect),
    };
  }
}
