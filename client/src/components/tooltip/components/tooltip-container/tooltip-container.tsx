import React, {Component, RefObject, createRef, CSSProperties} from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import {computePosition} from './services/compute-position';

import styles from './tooltip-container.scss';

const cx = classNames.bind(styles);

export interface TooltipState {
  isMouseOnParent: boolean,
  isMouseOnTooltip: boolean,
  isShown: boolean,
  tooltipElem: HTMLDivElement | null,
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

  hideTooltip = debounce(() => {
    this.setState({
      isShown: false,
      mousePosition: undefined,
      tooltipProps: undefined,
    });
  }, 20);

  onParentMouseEnter = ({clientX, clientY}: MouseEvent) => {
    this.setState({
      isMouseOnParent: true,
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

    if (mousePosition && prevState.isShown !== isShown) {
      this.setState({
        tooltipElem: this.tooltipRef.current,
        tooltipProps: computePosition(mousePosition, cx, this.props.parent, this.tooltipRef.current),
      });
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
