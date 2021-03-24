import React, { Component, RefObject, createRef } from "react";
import classNames from "classnames/bind";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { computePosition, MousePosition } from "./services/compute-position";
import { observeScroll } from "./services/observe-scroll";

import styles from "./tooltip-container.scss";

const cx = classNames.bind(styles);

export interface TooltipState {
  isMouseOnParent: boolean;
  isMouseOnTooltip: boolean;
  isShown: boolean;
}

export interface TooltipProps {
  className?: string;
  parent: HTMLElement;
}

class TooltipContainerComponent extends Component<TooltipProps, TooltipState> {
  tooltipRef: RefObject<HTMLDivElement> = createRef();
  tooltipClassName = cx("tooltip-container");

  mousePosition?: MousePosition;

  state: TooltipState = {
    isMouseOnParent: false,
    isMouseOnTooltip: false,
    isShown: false,
  };

  unobserveScroll?: () => void;

  hideTooltip = debounce(() => {
    this.showTooltip.cancel();

    this.unobserveScroll && this.unobserveScroll();

    this.setState({
      isShown: false,
    });
  }, 20);

  showTooltip = debounce(() => {
    const { parent } = this.props;

    this.hideTooltip.cancel();

    this.unobserveScroll = observeScroll(parent, this.onParentScroll);

    this.setState({
      isShown: true,
    });
  }, 500);

  onParentMouseMove = throttle(
    ({ clientX, clientY }: MouseEvent) => {
      const tooltipElem = this.tooltipRef.current;

      this.mousePosition = {
        clientX,
        clientY,
      };

      if (!tooltipElem) return;

      this.setTooltipPosition(tooltipElem);
    },
    50,
    { leading: true }
  );

  setTooltipPosition(tooltip: HTMLDivElement) {
    if (!this.mousePosition) return;

    const { parent } = this.props;

    const {
      className,
      style: { top, left },
    } = computePosition(this.mousePosition, parent, tooltip);

    tooltip.className = cx(this.tooltipClassName, className);

    tooltip.style.top = top;
    tooltip.style.left = left;
  }

  onParentMouseEnter = ({ clientX, clientY }: MouseEvent) => {
    const { parent } = this.props;

    this.mousePosition = { clientX, clientY };

    parent.addEventListener("mousemove", this.onParentMouseMove);

    this.setState({ isMouseOnParent: true });
  };

  onParentMouseLeave = () => {
    this.setState({ isMouseOnParent: false });

    parent.removeEventListener("mousemove", this.onParentMouseMove);

    this.mousePosition = undefined;
  };

  onTooltipMouseEnter = () => {
    this.setState({ isMouseOnTooltip: true });
  };

  onTooltipMouseLeave = () => {
    this.setState({ isMouseOnTooltip: false });
  };

  onParentScroll = () => {
    if (!this.mousePosition) return;

    const { parent } = this.props;
    const { clientX, clientY } = this.mousePosition;
    const tooltipElem = this.tooltipRef.current;

    const { top, left, width, height } = parent.getBoundingClientRect();

    const mouseOnParent =
      top <= clientY &&
      top + height >= clientY &&
      left <= clientX &&
      left + width >= clientX;

    if (mouseOnParent || !tooltipElem) return;

    tooltipElem.style.display = "none";

    this.setState({ isMouseOnParent: false });
  };

  componentDidMount() {
    const { parent } = this.props;

    parent.addEventListener("mouseenter", this.onParentMouseEnter);
    parent.addEventListener("mouseleave", this.onParentMouseLeave);
  }

  componentWillUnmount() {
    const { parent } = this.props;

    this.unobserveScroll && this.unobserveScroll();

    this.onParentMouseLeave();

    parent.removeEventListener("mouseenter", this.onParentMouseEnter);
    parent.removeEventListener("mouseleave", this.onParentMouseLeave);
  }

  componentDidUpdate(_prevProps: TooltipProps, prevState: TooltipState) {
    const { isMouseOnParent, isMouseOnTooltip, isShown } = this.state;

    if (isShown && !prevState.isShown && this.tooltipRef.current) {
      this.setTooltipPosition(this.tooltipRef.current);
    }

    if (isShown && (isMouseOnParent || isMouseOnTooltip)) {
      this.hideTooltip.cancel();
    } else if (!isShown && (isMouseOnParent || isMouseOnTooltip)) {
      this.showTooltip();
    } else if (!isShown) {
      this.showTooltip.cancel();
    } else if (isShown) {
      this.hideTooltip();
    }
  }

  render() {
    const { children, className } = this.props;

    const { isShown } = this.state;

    if (!isShown) return null;

    return (
      <div
        ref={this.tooltipRef}
        className={cx("tooltip-container")}
        onMouseEnter={this.onTooltipMouseEnter}
        onMouseLeave={this.onTooltipMouseLeave}
      >
        <div className={cx("tooltip", className)}>{children}</div>
      </div>
    );
  }
}

export { TooltipContainerComponent };
