import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { Tooltip } from '../../tooltip';
import deezerLogo from '../../../../resources/source-logos/deezer-logo.svg';
import spotifyLogo from '../../../../resources/source-logos/spotify-logo.svg';

import styles from './source-tooltip.scss';

const cx = classNames.bind(styles);

export interface SourceTooltipProps {
  spotifyUrl?: string;
  deezerUrl?: string;
  parent: HTMLElement;
}

const SourceTooltipComponent: FC<SourceTooltipProps> = ({
  spotifyUrl,
  deezerUrl,
  parent,
}) => {
  if (!spotifyUrl && !deezerUrl) return null;

  return (
    <Tooltip
      parent={parent}
    >
      <div>
        {deezerUrl && (
          <a href={deezerUrl} target="_blank" className={cx('link')}>
            <img src={deezerLogo} className={cx('icon')} />
          </a>
        )}
        {spotifyUrl && (
          <a href={spotifyUrl} target="_blank" className={cx('link')}>
            <img src={spotifyLogo} className={cx('icon')} />
          </a>
        )}
      </div>
    </Tooltip>
  );
}

export {SourceTooltipComponent};