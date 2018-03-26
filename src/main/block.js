import './block.less';
import $ from 'jquery';
import { toJSON, Column, isTouchDevice } from '../../utils/utils';
import DoneModalWindow from '../send-done/send-done';
import FailModalWindow from '../send-failed/send-fail';
import InvalidModalWindow from '../invalid-modal/invalid-modal';

const block = require('./block.html');

export default class Block extends Column {
  init () {
    super.init(block);
    
    const doneModalWindow = new DoneModalWindow(this.root.querySelector('.done-btn-wrapper'));
    const failModalWindow = new FailModalWindow(this.root.querySelector('.fail-btn-wrapper'));
    const invalidModalWindow = new InvalidModalWindow(this.root.querySelector('.invalid-btn-wrapper'));

    doneModalWindow.init();
    failModalWindow.init();
    invalidModalWindow.init();

    this.forDesktop();
    this.forMobile();
    this.validateForm();
  }

  validateForm () {
    const forms = document.getElementsByClassName('needs-validation');

    const validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const number = Block.getNumber(form.querySelector('input').value);

        if (Block.isValid(number)) {
          $('#invalid').modal('show');

          return false;
        }

        const json = toJSON(number);
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

  static isValid(value) {
    return !value;
  }

  static getNumber(value) {
    return value.replace(/\+|\s+|\D/g, '').substr(0, 13);
  }

  forDesktop () {
    if (!isTouchDevice()) {
      $('[title="Telegram"]').attr('href', 'https://t.me/MakarKuzmichev');

      const windowHeight = document.documentElement.clientHeight;
      if (windowHeight < 700) {
        $('html').css('font-size', '10px');
        $('.img-fluid').css('width', '80%');
        $('hr').css('margin-top', '9rem');
      } else if (windowHeight >= 700 && windowHeight < 850) {
        $('html').css('font-size', '11px');
        $('.img-fluid').css('width', '90%');
        $('hr').css('margin-top', '11rem');
      }
    }
  }

  forMobile () {
    if (isTouchDevice()) {
      const phone = $('.phone-number');

      phone.html(`<a href="tel:${phone.text().replace(/-/g, '')}">${phone.text()}</a>`);
    }
  }
}
