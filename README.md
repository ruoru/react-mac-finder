# react-mac-finder

[![Build Status](https://img.shields.io/travis/ruoru/react-mac-finder.svg?style=flat-square)](https://travis-ci.org/ruoru/react-mac-finder)
[![Codecov](https://img.shields.io/codecov/c/github/ruoru/react-mac-finder/master.svg?style=flat-square)](https://codecov.io/gh/ruoru/react-mac-finder/branch/master)
[![Dependency Status](https://img.shields.io/gemnasium/react-component/trigger.svg?style=flat-square)](https://gemnasium.com/ruoru/react-mac-finder)

[![NPM Version](https://img.shields.io/npm/v/react-mac-finder.svg?style=flat-square)](https://www.npmjs.org/package/react-mac-finder)
[![NPM Downloads](http://img.shields.io/npm/dm/react-mac-finder.svg?style=flat-square)](https://npmjs.org/package/react-mac-finder)

A picker of react component look like mac finder.

[<img src="http://p42sgsc8q.bkt.clouddn.com/country-flags/svg/cn.svg" height="20" /> 暂无简体中文文档](README-zh_CN.md)

## Demo link

https://ruoru.github.io/react-mac-finder

## Support environment

* browser.

## Applicable scene

1. Must have a certain size parent element that wraps the component;
2. If there are both used `selectIndexs` array and `value`, the `value` are used first, followed by the `selectIndexs`, and then is `defaultValue`. Finally, I do not recommend using `selectIndexs` and `value` at the same time.
3. Now can't scroll horizontally;
4. When you use value, make sure that each option has a value;

## Remaining problem

1. If you find it, please give me an issue;

## Interface design

| property name          | description                                                                         | type                                              | default                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| data \*                | The data of this component.                                                         | Array                                             | []                                                                  |
| dataKeys               | The alias of the `data` key.                                                        | Object                                            | {text: 'text', value: 'value', disable: 'disable', child: 'child'}  |
| defaultSelectIndexs    | The default selection index of data.                                                | Array                                             | -                                                                   |
| selectIndexs           | Forces the selection of data by index. If `value` exists, `selectIndexs` fails.     | Array                                             | -                                                                   |
| value                  | Forces select same value item of data.                                              | String \| Number                                   | -                                                                   |
| onChange               | Callback method, each time you change the selected value will run of the method.    | Function (value, isEnd, selectIndexs)             | -                                                                   |
| disabled               | ReadOnly the component value.                                                       | Bool                                              | false                                                               |

## Install

```bash
npm install --save react-mac-finder
```

## Example Code

[Finder demo code](./example/Finder/index.js)

```js
import React, { Component } from "react";
import { Finder } from "react-mac-finder";

class Finder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectIndexs: [],
      value: null,
      isEnd: true,
      data: [
        {
          text: "A1",
          value: "A1",
          child: [
            {
              text: "A11",
              value: "A11",
              child: [
                {
                  text: "A111",
                  value: "A111"
                },
                {
                  text: "A112",
                  value: "A112"
                },
                {
                  text: "A113",
                  value: "A113"
                },
                {
                  text: "A114",
                  value: "A114"
                },
                {
                  text: "A115",
                  value: "A115"
                },
                {
                  text: "A116",
                  value: "A116"
                }
              ]
            },
            {
              text: "A12",
              value: "A12"
            },
            {
              text: "A13",
              value: "A13"
            },
            {
              text: "A14",
              value: "A14"
            },
            {
              text: "A15",
              value: "A15"
            }
          ]
        },
        {
          text: "B1",
          value: "B1",
          disable: true,
          child: [
            {
              text: "B11",
              value: "B11",
              child: [
                {
                  text: "B111",
                  value: "B111"
                },
                {
                  text: "B112",
                  value: "B112"
                },
                {
                  text: "B113",
                  value: "B113"
                }
              ]
            },
            {
              text: "B12",
              value: "B12"
            },
            {
              text: "B13",
              value: "B13"
            }
          ]
        },
        {
          text: "C1",
          value: "C1",
          child: [
            {
              text: "C11",
              value: "C11",
              child: [
                {
                  text: "C111",
                  value: "C111"
                },
                {
                  text: "C112",
                  value: "C112",
                  child: [],
                },
                {
                  text: "C113",
                  value: "C113"
                },
                {
                  text: "C114",
                  value: "C114"
                },
                {
                  text: "C115",
                  value: "C115"
                },
                {
                  text: "C116",
                  value: "C116"
                }
              ]
            },
            {
              text: "C12",
              value: "C12",
              disable: true,
              child: [
                {
                  text: "C121",
                  value: "C121"
                }
              ],
            },
            {
              text: "C13",
              value: "C13"
            },
            {
              text: "C14",
              value: "C14"
            },
            {
              text: "C15",
              value: "C15"
            }
          ]
        },
      ]
    };
  }

  render() {
    const { data, selectIndexs, value, isEnd } = this.state;
    return (
      <>
        <div className="finder-demo">
          <Finder
            value={value}
            data={data}
            onChange={(value, isEnd, selectIndexs) => {
              this.setState({ value, isEnd, selectIndexs });
            }}
          />
        </div>

        <ul className="value-list">
          <li>selectIndexs: {selectIndexs.join(",")}</li>
          <li>
            value:
            <input
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </li>
          <li>isEndNode: {`${isEnd}`}</li>
        </ul>
      </>
    );
  }
}
export default Finder;
```

## Local development

```sh
$ git clone https://github.com/ruoru/react-mac-finder.git
$ cd react-mac-finder
$ npm install
$ npm start
```