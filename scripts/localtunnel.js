const LocalTunnel = require('localtunnel')
require('./logging')

module.exports.openTunnel = async function (localPort = 8080, subdomain = null) {
    return new Promise(resolve => {
        const tunnel = new LocalTunnel(localPort, {
            subdomain: subdomain
        }, (error) => {
            if (error) {
                console.error(
                    'Local tunnel connection failed.\n' +
                    '\t' + error
                )
                process.exit(2)
            }
            console.info('Local tunnel connection is established.')
            const tunnelClone = Object.assign({}, tunnel)
            resolve({
                url: tunnelClone.url,
                subdomain: tunnelClone.tunnel_cluster._opt.name
            })
        })
        tunnel.on('error', (error) => {
            console.error(
                'Local tunnel connection failed.\n' +
                '\t' + error
            )
            process.exit(2)
        })
        tunnel.on('close', () => {
            console.error('Local tunnel connection closed.')
            process.exit(2)
        })
    })
}