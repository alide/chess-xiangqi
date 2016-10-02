var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))

app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/', express.static(__dirname + '/src'))

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});