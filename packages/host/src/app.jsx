import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

// routes
import LifeGame from './components/LifeGame';
import Dijkstra from './components/Dijkstra';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import './app.less';
import Home from './components/Home';

const App = () => {
  const loc = useLocation();
  return (
    <>
      <div className="wasm-header">
        <div className="wasm-logo">
          <Link to="/">WASM</Link>
        </div>
        <Menu mode="horizontal" className="wasm-menu" activeKey={loc?.state?.key}>
          <Menu.Item key="game">
            <Link
              to={{
                pathname: '/life-game',
                state: {
                  key: 'game',
                },
              }}
            >
              生命游戏
            </Link>
          </Menu.Item>
          <Menu.Item key="dijkstra">
            <Link
              to={{
                pathname: '/dijkstra',
                state: {
                  key: 'dijkstra',
                },
              }}
            >
              最短路径
            </Link>
          </Menu.Item>
        </Menu>
      </div>

      <ErrorBoundary>
        <Switch>
          <Route path="/life-game">
            <LifeGame />
          </Route>
          <Route path="/dijkstra">
            <Dijkstra />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ErrorBoundary>
    </>
  );
};

export default App;
