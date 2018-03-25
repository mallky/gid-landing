import $ from 'jquery';
import _ from 'lodash';

const createComponent = (component) => {
  return $(component)[0];
};

const toJSON = function (number) {
  const obj = {};
  obj[ 'phone' ] = number;

  return JSON.stringify(obj);
};

const isTouchDevice = () => {
  return 'ontouchstart' in document.documentElement;
};

class Column {
  constructor (root) {
    this.root = root;
  }
  
  init (component, opt = {}) {
    const _component = _.template(component)(opt);
    
    this.root.appendChild(createComponent(_component));
  }
}

export {
  toJSON,
  isTouchDevice,
  Column
};