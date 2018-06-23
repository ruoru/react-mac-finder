import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import FinderDemo from './views/FinderDemo';

render(
  <FinderDemo />,
  document.getElementById('root'),
);