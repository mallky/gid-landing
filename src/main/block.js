import './block.less';
import $ from 'jquery';
import { toJSON, Column, isTouchDevice } from '../../utils/utils';
import DoneModalWindow from '../send-done/send-done';
import FailModalWindow from '../send-failed/send-fail';

const block = require('./block.html');

export default class Block extends Column {
  init () {
    super.init(block);
    
    const doneModalWindow = new DoneModalWindow(this.root.querySelector('.done-btn-wrapper'));
    const failModalWindow = new FailModalWindow(this.root.querySelector('.fail-btn-wrapper'));

    doneModalWindow.init();
    failModalWindow.init();

    !isTouchDevice() && $('[title="Telegram"]').attr('href', 'https://t.me/MakarKuzmichev');

    this.validateForm();
  }

  validateForm () {
    const forms = document.getElementsByClassName('needs-validation');

    const validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const json = toJSON(form);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/telegram', true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            console.log('DONE');
            $('#exampleModalCenter').modal('hide');
            $('#done').modal('show');
          }
          if (xhr.status !== 200) {
            console.log('MISTAKE');
            $('#exampleModalCenter').modal('hide');
            $('#fail').modal('show');
          }
        };

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(json);

        form.reset();
        form.classList.remove('was-validated');
      }, false);
    });
  }
}
