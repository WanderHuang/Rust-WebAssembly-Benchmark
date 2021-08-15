import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootDOMNode = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootDOMNode
);
