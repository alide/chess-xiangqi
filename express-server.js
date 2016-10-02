var express = require('express')
var app = express()


app.use('/assets', express.static('dist/assets'));
app.use('/', express.static('src'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});