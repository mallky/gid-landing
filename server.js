const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config/config.json');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/dist'));
app.post('/telegram', jsonParser, function (req, res) {
  const reqBody = req.body;
  const fields = [
    '<strong>Телефон</strong>: ' + reqBody.phone,
    reqBody.text
  ];
  
  const msg = encodeURI(fields.join('\n'));

  request.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    if(response.statusCode === 200){
      console.log('done');
      res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
    }
    if(response.statusCode!== 200){
      console.log('mistake');
      res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
    }
  });
});

app.listen(8080);