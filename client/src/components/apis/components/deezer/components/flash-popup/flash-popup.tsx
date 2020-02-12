import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './flash-popup.scss';

const cx = classNames.bind(styles);

interface FlashPopupProps {
  ignoreFlash: () => void;
}

class FlashPopup extends Component<FlashPopupProps, {}> {
  onApply = () => {
    location.reload();
  }

  onIgnore = () => {
    const {ignoreFlash} = this.props;

    ignoreFlash();
  }

  render() {
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

export {FlashPopup}