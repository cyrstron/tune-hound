import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './active-player-popup.scss';

const cx = classNames.bind(styles);

interface ActivePlayerPopupProps {
  setIgnored: (isIgnored: boolean) => void;
}

interface ActivePlayerPopupState {
  isIgnored: boolean;
}

class ActivePlayerPopup extends Component<ActivePlayerPopupProps, ActivePlayerPopupState> {
  isUnmounted: boolean = false;

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  onIgnore = () => {
    const {setIgnored} = this.props;

    setIgnored(true);
  }

  render() {
    return (
      <div className={cx('notification')}>
        You have to enable 'Tune Hound Preview Player' in your
        {' '}
        <a
          href='https://open.spotify.com/' 
          target='_blank'
        >
          devices list
        </a>
        {' '}
        to stream audio files from Spotify.
        <div>
          <button onClick={this.onIgnore}>Ignore</button>
        </div>
      </div>
    )
  }

}

export {ActivePlayerPopup}