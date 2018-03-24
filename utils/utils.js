import $ from 'jquery';
import _ from 'lodash';

const createComponent = (component) => {
  return $(component)[0];
};

const toJSON = function (form) {
  const obj = {};
  const elements = form.querySelectorAll('input');
  const textarea = form.querySelector('textarea');
  const select = form.querySelector('select');

  obj['text'] = textarea.value;
  obj['whom'] = select.value;

  for (let i = 0; i < elements.length; ++i) {
    const element = elements[i];
    const name = element.name;
    const value = element.value;

    if (name) {
      obj[ name ] = value;
    }
  }

  return JSON.stringify(obj);
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
  Column
};