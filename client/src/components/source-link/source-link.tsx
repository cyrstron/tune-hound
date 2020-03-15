import React, {Component, createRef} from 'react';
import classNames from 'classnames/bind';
import { SourceTooltip } from '../tooltip';

import styles from './source-link.scss';

const cx = classNames.bind(styles);

export interface SourceLinkState {
  parentElem: HTMLElement | null;
}

export interface SourceLinkProps {
  className?: string;
  to?: string;
  externalUrls: {
    spotifyUrl?: string;
    deezerUrl?: string;
  }
}

class SourceLinkComponent extends Component<SourceLinkProps, SourceLinkState> {
  parentRef = createRef<HTMLElement>();

  state: SourceLinkState = {
    parentElem: null,
  }

  componentDidMount() {
    this.setState({parentElem: this.parentRef.current});
  }

  render() { 
    const {children, externalUrls, className} = this.props;
    const {parentElem} = this.state;

    return (
      <>
        <span ref={this.parentRef} className={cx('source-link', className)}>
          {children}
        </span>
        {parentElem && (
          <SourceTooltip
            parent={parentElem} 
            spotifyUrl={externalUrls.spotifyUrl}
            deezerUrl={externalUrls.deezerUrl}
          />
        )}
      </>
    );
  }
}

export {SourceLinkComponent};
