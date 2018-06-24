import './finder.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import folder from './assets/folder.svg';
import arrowR from './assets/triangle-arrow-r.svg';
import equal from 'fast-deep-equal';

class FinderRow extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { rowIndex, columnIndex, disable, value, hasChild, onChange } = this.props;
    if (!disable && onChange) {
      onChange(rowIndex, columnIndex, value, !hasChild);
    }
  }

  render() {
    const { text, disable, hasChild, isSelect } = this.props;

    return (
      <li className={`${hasChild && 'has-child'} ${disable && 'disable'} ${isSelect && 'select'}`} onClick={this.onChange} >
        {
          hasChild
            ? <>
              <img src={`./${folder}`}></img>
              <span>{text}</span>
              <img src={`./${arrowR}`}></img>
            </>
            : <span>{text}</span>
        }

      </li>
    );
  }
}

class FinderColumn extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(rowIndex, columnIndex, value, isEnd) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(rowIndex, columnIndex, value, isEnd);
    }
  }

  render() {
    const { id, data, selectIndex } = this.props;

    return (
      <ul className="columns">
        {
          data.map((item, i) => <FinderRow
            columnIndex={id}
            rowIndex={i}
            isSelect={selectIndex == i}
            text={item.text}
            value={item.value}
            disable={item.disable}
            hasChild={Array.isArray(item.child) && item.child.length > 0}
            onChange={this.onChange}
          />)
        }
      </ul>
    )
  }
}

class Finder extends Component {
  constructor(props) {
    super(props);

    const { data, dataKeys, defaultSelectIndexs, selectIndexs, value } = props;
    const valueIndexs = value && this.getValueIndexs(value, data, dataKeys);
    const { columns, newSelectIndexs } = this.parseData(valueIndexs || selectIndexs || defaultSelectIndexs, data, dataKeys);

    this.state = {
      selectIndexs: newSelectIndexs,
      columns,
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dataKeys, defaultSelectIndexs, selectIndexs, value } = nextProps;
    const valueIndexs = value && this.getValueIndexs(value, data, dataKeys);

    if (!equal(this.props.data, data) || (valueIndexs && valueIndexs !== this.state.selectIndexs)) {
      const { columns, newSelectIndexs } = this.parseData(valueIndexs || selectIndexs || defaultSelectIndexs, data, dataKeys);
      this.setState({
        columns,
        selectIndexs: newSelectIndexs,
      });
    }

    if (Array.isArray(selectIndexs) && selectIndexs.length > 0) {
      this.setState({ selectIndexs });
    }
  }

  getValueIndexs(value, data, dataKeys) {
    const { dataPathByValue, dataWithPathByValue } = this.getTreePath(data, dataKeys);
    const valueIndexs = dataPathByValue[value] ? dataPathByValue[value].indexs : [];
    return valueIndexs;
  }

  getTreePath(data, dataKeys = { child: 'child', value: 'value' }) {
    const dataPathByValue = {};
    const dataWithPathByValue = lookAll(data, dataKeys, []);

    function lookAll(data, dataKeys, indexs) {
      const root = [];
      for (let key in data) {
        const item = data[key], newIndexs = JSON.parse(JSON.stringify(indexs));
        newIndexs.push(key);
        item.indexs = newIndexs;
        if (item[dataKeys.child] && Object.keys(item[dataKeys.child]).length > 0) {
          item.child = lookAll(item[dataKeys.child], dataKeys, newIndexs);
        };
        root.push(item);
        dataPathByValue[item[dataKeys.value]] = item;
      }
      return root;
    }
    return { dataPathByValue, dataWithPathByValue };
  }

  parseData(selectIndexs = [], data = [], dataKeys = {}) {
    let i = 0, dataItem = JSON.parse(JSON.stringify(data)), columns = [], newSelectIndexs = [];

    do {
      columns.push(dataItem);
      const selectIndex = dataItem[selectIndexs[i]] ? selectIndexs[i] : -1;
      newSelectIndexs.push(selectIndex);
      dataItem = Array.isArray(dataItem) && dataItem[selectIndex] && dataItem[selectIndex][dataKeys.child];
      i++;
    } while (dataItem);

    return { columns, newSelectIndexs };
  }

  onChange(rowIndex, columnIndex, value, isEnd) {
    const { data, dataKeys, disabled, onChange } = this.props;
    let { selectIndexs } = this.state;
    if (disabled) return;
    
    selectIndexs[columnIndex] = rowIndex;
    if (selectIndexs.length > columnIndex + 1) {
      selectIndexs = selectIndexs.slice(0, columnIndex + 1);
    }

    const { columns, newSelectIndexs } = this.parseData(selectIndexs, data, dataKeys);
    selectIndexs = newSelectIndexs;

    this.setState({ columns, selectIndexs });

    if (onChange) {
      onChange(value, isEnd, selectIndexs)
    }
  }

  render() {
    const { columns, selectIndexs } = this.state;

    return (
      <div className="finder">
        {
          columns.map((item, i) => <FinderColumn id={i} data={item} selectIndex={selectIndexs[i]} onChange={this.onChange} />)
        }
      </div>
    );
  }
}

Finder.propTypes = {
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.object,
  defaultSelectIndexs: PropTypes.array,
  disabled: PropTypes.bool,
  selectIndexs: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Finder.defaultProps = {
  data: [],
  dataKeys: {
    text: 'text',
    value: 'value',
    disable: 'disable',
    child: 'child',
  },
}

export default Finder;
