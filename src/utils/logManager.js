const log = require('electron-log')
const fs = require('fs')
const path = require('path')
let logPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? '../../../../report/log.txt' : '../../../report/log.txt')
let logDir = path.join(__dirname, process.env.NODE_ENV === 'production' ? '../../../../report' : '../../../report')
console.log("文件路径" +logPath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}
log.transports.file.level = true
log.transports.console.level = false
log.transports.file.maxSize = 20 * 1024 * 1024
log.transports.file.file = logPath

export default log
