import { Column } from '../../utils/utils';

const invalidModalWindow = require('./invalid-modal.html');

export default class InvalidModalWindow extends Column {
  init() {
    super.init(invalidModalWindow);
  }
}