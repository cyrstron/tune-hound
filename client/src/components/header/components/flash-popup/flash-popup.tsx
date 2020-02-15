import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './flash-popup.scss';

const cx = classNames.bind(styles);

interface FlashPopupProps {
  isEnabled: boolean;
  isIgnored: boolean;
  isConnected: boolean;
  setIgnored: (isIgnored: boolean) => void;
}

class FlashPopupComponent extends Component<FlashPopupProps, {}> {
  onApply = () => {
    location.reload();
  }

  onIgnore = () => {
    const {setIgnored} = this.props;

    setIgnored(true);
  }

  render() {
    const {
      isEnabled,
      isIgnored,
      isConnected,
    } = this.props;

    if (!isConnected || isIgnored || isEnabled) return null;

    return (
      <div className={cx('notification')}>
        You should enable Flash to stream audio files from Deezer.
        <div>
          <button onClick={this.onApply}>Done</button>
          <button onClick={this.onIgnore}>Ignore</button>
        </div>
      </div>
    )
  }

}

export {FlashPopupComponent};
