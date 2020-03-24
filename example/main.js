import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';

import Finder from './Finder';

render(
  <Finder />,
  document.getElementById('root'),
);