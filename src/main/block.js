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
    const form = document.querySelector('.needs-validation');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const number = Block.getNumber(form.querySelector('input').value);
      if (Block.isValid(number)) {
        $('#invalid').modal('show');

        return false;
      }

      var $form = $('form');
      $.ajax({
        type: $form.attr('method'),
        url: 'send.php',
        data: $form.serialize()
      }).done(function() {
        console.log('success');
        $('#done').modal('show');
      }).fail(function() {
        console.log('fail');
        $('#fail').modal('show');
      });

      form.reset();
      form.classList.remove('was-validated');
    }, false);
  }

  static isValid(value) {
    return !value;
  }

  static getNumber(value) {
    return value.match(/[^\()\-\+\s0123456789]/) ? '' : value.replace(/\s+|\D/g, '').substr(0, 13);
  }

  forDesktop () {
    if (!isTouchDevice()) {
      $('.mid-block').find('.head').find('br').remove();
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
