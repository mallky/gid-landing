import { Column } from '../../utils/utils';

const failModalWindow = require('./send-failed.html');

export default class FailModalWindow extends Column{
  init() {
    super.init(failModalWindow);
  }
}