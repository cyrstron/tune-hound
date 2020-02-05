import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './flash-popup.scss';

const cx = classNames.bind(styles);

interface FlashPopupProps {
  updateFlashStatus: () => void;
}

interface FlashPopupState {
  isIgnored: boolean;
  isApplied: boolean;
}

class FlashPopup extends Component<FlashPopupProps, FlashPopupState> {
  state: FlashPopupState = {
    isIgnored: false,
    isApplied: false,
  }

  isUnmounted: boolean = false;

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  onApply = () => {
    this.props.updateFlashStatus();
  }

  onIgnore = () => {
    this.setState({
      isIgnored: true
    });
  }

  render() {
    const {isIgnored, isApplied} = this.state;

    if (isIgnored) return null;

    return (
      <div className={cx('notification')}>
        You should enable Flash to stream audio files from Deezer.
        {isApplied && (
          <div>
            Flash wasn't enabled.
          </div>
        )}
        <div>
          <button onClick={this.onApply}>Done</button>
          <button onClick={this.onIgnore}>Ignore</button>
        </div>
      </div>
    )
  }

}

export {FlashPopup}