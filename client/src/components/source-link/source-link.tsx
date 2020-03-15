import React, {Component, createRef} from 'react';
import { SourceTooltip } from '../tooltip';

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
    const {children, externalUrls} = this.props;
    const {parentElem} = this.state;

    return (
      <>
        <span ref={this.parentRef}>
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
