import classNames from 'classnames/bind';
import React, {Component, useEffect} from 'react';
import { Header } from 'components/header';
import { Search } from './scenes/search';
import { Footer } from './components/footer';

import styles from './app.scss';
import { useDispatch } from 'react-redux';
import { initApp } from './state/actions';

const cx = classNames.bind(styles);

interface AppState {
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAction = initApp();

    dispatch(initAction);
  }, [dispatch]);

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

export {App};
