var reqId = require('seq-id')

module.exports = logRequestCycle

function logRequestCycle(req, res) {
  markStart(req)
  logStart(req)
  res.on('finish', function(){ logFinish(req, res) })
}

function logStart(req) {
  console.log(colorWithIcon('⇛', reqId(req)), req.method, req.url)
}

function logFinish(req, res) {
  console.log(colorWithIcon('⇚', reqId(req)), res.statusCode, secsAndNsToMs(getDuration(req)))
}

function markStart(req) {
  req._startHrTime = process.hrtime()
}

function getDuration(req) {
  return process.hrtime(req._startHrTime)
}

function secsAndNsToMs(secsAndNs) {
  var ns = secsAndNs[0] * 10e9 + secsAndNs[1]
  return (ns/10e6).toFixed(2) + 'ms'
}

function colorWithIcon(str, sequentialId) {
  str += ' ' + iconFromId(sequentialId)
  return '\033[3' + ansiClrNumFromId(sequentialId) + 'm' + str + '\033[0m'
}

function iconFromId(sequentialId) {
  var seq = sequentialId % 5
  return icons[seq === 0 ? 4 : seq-1]
}

/*
Ansi colors:
  0     1   2     3       4     5       6     7
  Black Red Green Yellow  Blue  Magenta Cyan  White
*/

function ansiClrNumFromId(sequentialId) {
  return (sequentialId % 5) + 2
}

var icons = [ '➀', '➁', '➂', '➃', '➄' ]
