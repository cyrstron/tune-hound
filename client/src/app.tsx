import classNames from 'classnames/bind';
import React, {Component} from 'react';
import { Header } from 'components/header/header';

import styles from './app.scss';

const cx = classNames.bind(styles);


interface AppState {
}

class App extends Component<{}, AppState> {
  render() {
    return (
      <>
        <Header />
        <div className={cx('app')}>
          Welcome!
        </div>
      </>
    );
  }
}

export {App};
