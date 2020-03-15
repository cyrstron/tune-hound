import React, {Component, RefObject, createRef, CSSProperties} from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import {computePosition, Position} from './services/compute-position';
import {observeScroll} from './services/observe-scroll';

import styles from './tooltip-container.scss';

const cx = classNames.bind(styles);

export interface TooltipState {
  isMouseOnParent: boolean,
  isMouseOnTooltip: boolean,
  isShown: boolean,
  tooltipElem: HTMLDivElement | null,
  parentPosition?: Position; 
  mousePosition?: {
    clientX: number;
    clientY: number;
  };
  tooltipProps?: {
    className: string;
    style: CSSProperties
  }
}

export interface TooltipProps {
  className?: string;
  parent: HTMLElement;
}

class TooltipContainerComponent extends Component<TooltipProps, TooltipState> {
  tooltipRef: RefObject<HTMLDivElement> = createRef();

  state: TooltipState = {
    isMouseOnParent: false,
    isMouseOnTooltip: false,
    isShown: false,
    tooltipElem: null,
  }

  unobserveScroll?: () => void;

  hideTooltip = debounce(() => {
    this.unobserveScroll && this.unobserveScroll();

    this.setState({
      isShown: false,
      mousePosition: undefined,
      parentPosition: undefined,
      tooltipProps: undefined,
    });
  }, 20);

  recalcTooltipProps = () => {
    const {
      parentPosition, 
      mousePosition,
    } = this.state;
    const {parent} = this.props;

    if (!mousePosition || !parentPosition) return;

    const {clientX, clientY} = mousePosition;
    const {top, left} = parent.getBoundingClientRect();

    this.setState({
      tooltipProps: computePosition({
        clientX: clientX - (left - parentPosition.left),
        clientY: clientY - (top - parentPosition.top)
      }, cx, this.props.parent, this.tooltipRef.current),
    });
  }

  onParentMouseEnter = ({clientX, clientY, target}: MouseEvent) => {
    const {top, left} = (target as HTMLElement).getBoundingClientRect();

    this.setState({
      isMouseOnParent: true,
      parentPosition: {top, left},
      mousePosition: this.state.mousePosition || {
        clientX, 
        clientY,
      }
    });
  }

  onParentMouseLeave = () => {
    if (!this.state.isShown) return;

    this.setState({isMouseOnParent: false});
  }

  onTooltipMouseEnter = () => {  
    this.setState({isMouseOnTooltip: true});
  }

  onTooltipMouseLeave = () => {
    this.setState({isMouseOnTooltip: false});
  }

  componentDidMount() {
    const {parent} = this.props;

    parent.addEventListener('mouseenter', this.onParentMouseEnter);
    parent.addEventListener('mouseleave', this.onParentMouseLeave);
  }

  componentWillUnmount() {
    const {parent} = this.props;

    parent.removeEventListener('mouseenter', this.onParentMouseEnter);
    parent.removeEventListener('mouseleave', this.onParentMouseLeave);
  }

  componentDidUpdate(_prevProps: TooltipProps, prevState: TooltipState) {
    const {
      isMouseOnParent,
      isMouseOnTooltip,
      isShown,
      mousePosition,
    } = this.state;

    const {parent} = this.props;

    if (mousePosition && prevState.isShown !== isShown) {
      this.setState({
        tooltipElem: this.tooltipRef.current,
        tooltipProps: computePosition(mousePosition, cx, parent, this.tooltipRef.current),
      });

      this.unobserveScroll = observeScroll(parent, this.recalcTooltipProps);
    }

    if (isShown && (isMouseOnParent || isMouseOnTooltip)) {
      this.hideTooltip.cancel();
    } else if (!isShown && (isMouseOnParent || isMouseOnTooltip)) {
      this.setState({isShown: true});
    } else if (isShown) {
      this.hideTooltip();
    }
  }

  render() {
    const {
      children, 
      className, 
      parent,
    } = this.props;

    const {
      isShown,
      tooltipProps,
    } = this.state;

    if (!isShown) return null;

    return (
      <div 
        ref={this.tooltipRef}
        className={cx('tooltip-container', tooltipProps?.className)}
        style={tooltipProps?.style || {
          visibility: 'hidden'
        }}
        onMouseEnter={this.onTooltipMouseEnter}
        onMouseLeave={this.onTooltipMouseLeave}
      >
        <div 
          className={cx('tooltip', className)}
        >
          {children}
        </div>
      </div>
    );
  }
}

export {TooltipContainerComponent}
