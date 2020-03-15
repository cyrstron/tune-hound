import React, {Component, RefObject, createRef} from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import {computePosition} from './services/compute-position';

import styles from './tooltip-container.scss';

const cx = classNames.bind(styles);

export interface TooltipState {
  isMouseOnParent: false,
  isMouseOnTooltip: false,
  isShown: false,
  tooltipElem: HTMLDivElement | null,

}

export interface TooltipProps {
  className?: string;
  parent: HTMLElement;
}

class TooltipContainerComponent extends Component<TooltipProps> {
  tooltipRef: RefObject<HTMLDivElement> = createRef();

  state: TooltipState = {
    isMouseOnParent: false,
    isMouseOnTooltip: false,
    isShown: false,
    tooltipElem: null,
  }

  hideTooltip = debounce(() => {
    this.setState({isShown: false});
  }, 20);

  onParentMouseEnter = () => {
    this.setState({isMouseOnParent: true});
  }

  onParentMouseLeave = () => {
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
    } = this.state;

    if (prevState.isShown !== isShown) {
      this.setState({tooltipElem: this.tooltipRef.current});
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
    } = this.state;

    if (!isShown) return null;

    const tooltipProps = computePosition(cx, parent, this.tooltipRef.current);

    return (
      <div 
        ref={this.tooltipRef}
        className={cx('tooltip-container', tooltipProps.className)}
        style={tooltipProps.style}
        onMouseEnter={this.onTooltipMouseEnter}
        onMouseLeave={this.onTooltipMouseLeave}
      >
        <div 
          className={cx('tooltip')}
        >
          {children}
        </div>
      </div>
    );
  }
}

export {TooltipContainerComponent}
