import classNames from 'classnames/bind';
import React, {Component} from 'react';
import { Header } from 'components/header';

import styles from './app.scss';
import { Search } from './scenes/search';

const cx = classNames.bind(styles);

interface AppState {
}

class App extends Component<{}, AppState> {
  render() {
    return (
      <div className={cx('app')}>
        <Header className={'header'} />
        <div className={cx('main')}>
          <Search className={cx('main-content')}/>
        </div>
      </div>
    );
  }
}

export {App};
