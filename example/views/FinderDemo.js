import "./finder-demo.scss";
import React, { Component } from "react";
import { Finder } from "../../src";

class FinderDemo extends Component {
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
        }
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
          <li>selectIndexs: {`[${selectIndexs.join(",")}]`}</li>
          <li>
            value：
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
export default FinderDemo;
