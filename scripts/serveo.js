const $ = require('shelljs')
require('./logging')

$.config.fatal = true
// $.config.silent = true

module.exports.startServeo = (localPort) => {
    return new Promise((resolve, reject) => {
        $.exec(`ssh -R "80:localhost:${localPort}" "serveo.net"`, {
            async: true,
            // silent: true,
        }, (code, stdOut, stdErr) => {
            console.info(`code is ${code}`)
            console.debug(`out is ${stdOut}`)
            console.warn(`err is ${stdErr}`)

            // if (code && code !== 0) {
            //     let message = `Serveo connection failed.`
            //     if (stdErr) {
            //         message += ` ${stdErr.trim()}.`
            //     }
            //     console.error(message)
            //     process.exit(1)
            // }
            // if (stdOut) {
            //     console.debug(stdOut)
            //     const matches = stdOut.trim().match(/^Forwarding HTTP traffic from (https:\/\/.*\.serveo\.net)/i)
            //     if (matches.length === 1) {
            //         resolve(matches[0])
            //     } else {
            //         reject(`Unexpected message from Serveo.net!`)
            //     }
            // }
            // if (stdErr) {
            //     console.warn(stdErr.trim())
            // }
        })
    })
}