import React, {Component} from 'react';
import classNames from 'classnames/bind';

import styles from './active-player-popup.scss';
import {Popup} from '@app/components/popup';

const cx = classNames.bind(styles);

interface ActivePlayerPopupProps {
  setIgnored: (isIgnored: boolean) => void;
  isConnected: boolean;
  isIgnored: boolean;
  isActive: boolean;
}

class ActivePlayerPopupComponent extends Component<ActivePlayerPopupProps, {}> {
  onIgnore = () => {
    const {setIgnored} = this.props;

    setIgnored(true);
  }

  render() {
    const {
      isConnected,
      isIgnored,
      isActive,
    } = this.props;

    if (!isConnected || isIgnored || isActive) return null;

    return (
      <Popup>
        <div className={cx('notification')}>
          You have to enable 'Tune Hound Preview Player' in your
          {' '}
          <a
            href='https://open.spotify.com/'
            target='_blank'
            rel="noreferrer"
          >
            devices list
          </a>
          {' '}
          to stream audio files from Spotify.
          <div>
            <button onClick={this.onIgnore}>Ignore</button>
          </div>
        </div>
      </Popup>
    );
  }
}

export {ActivePlayerPopupComponent};
