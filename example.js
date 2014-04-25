var http = require('http')
  , log = require('./')

http.createServer(function(req, res) {
  log(req, res)
  res.end('hai\n')
}).listen(process.env.PORT || 3000)
