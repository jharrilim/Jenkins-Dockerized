const $ = require('shelljs')
const lt = require('./scripts/localtunnel')
require('./scripts/logging')

$.config.fatal = true

async function main() {
    console.debug('Opening a Local Tunnel connection... (read more at https://localtunnel.me)')
    const {
        url: tunnelURL,
        subdomain: tunnelSubdomain
    } = await lt.openTunnel()
    console.info(`Public URL is: ${tunnelURL}`)
}

main().catch(reason => {
    console.error(reason)
    process.exit(1)
})
