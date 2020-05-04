import classNames from 'classnames/bind';
import React, {Component} from 'react';
import { Header } from 'components/header';
import { Search } from './scenes/search';
import { Footer } from './components/footer';

import styles from './app.scss';

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
        <Footer className={'footer'} />
      </div>
    );
  }
}

export {App};
