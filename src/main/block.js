import './block.less';
import { Column } from '../../utils/utils';

const block = require('./block.html');

export default class Block extends Column {
  init () {
    super.init(block);
  }
}
