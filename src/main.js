import './style.less';
import 'bootstrap';
import $ from 'jquery';
import Block from './main/block';

class App {
  init () {
    this.root = document.getElementById('root');
    $(document.head).append('<link rel="shortcut icon" href="/images/logo2.jpg" type="image/jpg">');

    const block = new Block(this.root);
    block.init();
  }
}

const app = new App();

app.init();

if (process.env.NODE_ENV !== 'production') {
  console.log('Dev mode On!');
}
