import { Column } from '../../utils/utils';

const doneModalWindow = require('./send-done.html');

export default class DoneModalWindow extends Column {
  init() {
    super.init(doneModalWindow);
  }
}