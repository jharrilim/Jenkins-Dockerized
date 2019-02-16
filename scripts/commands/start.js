const $ = require('shelljs')
const fs = require('fs')
const path = require('path')
require('../logging')

$.config.fatal = true
const rootDir = path.resolve(__dirname, '..', '..')

module.exports = (opts) => {
    let publicUrl
    if (opts.url) {
        publicUrl = getPublicUrl(opts.url)
    } else {
        try {
            publicUrl = getNewServeoTunnelUrl()
        } catch (e) {
            console.warn(e.message || e)
            publicUrl = "http://localhost:8080"
        }
    }

    console.debug(`Public URL is: ${publicUrl}`)
    updateLocationInYaml(publicUrl)

    try {
        $.config.fatal = false
        $.exec('docker rm --force --volumes jenkins')
    } catch (_) {} finally {
        $.config.fatal = true
    }
    $.rm('-rf', path.resolve(rootDir, 'jenkins_home'))
    $.exec(`docker build --tag my-jenkins --no-cache  .`)
    $.exec(
        `docker run ` +
        `--name jenkins ` +
        `--detach ` +
        `--publish 8080:8080 ` +
        `--publish 50000:50000 ` +
        `--volume "${path.resolve(rootDir, 'jenkins_home')}:/var/jenkins_home" ` +
        `my-jenkins `
    )
    console.info(
        `Jenkins is starting up and is accessible from:\n` +
        `\thttp://localhost:8080/\n` +
        `\t${publicUrl}`
    )
    console.info(
        `You can follow the Jenkins container logs using:\n` +
        `\t` + `docker logs --follow jenkins`
    )
}

function getPublicUrl(httpAddress) {
    const url = require("url")

    const urlParam = url.parse(httpAddress)
    if (urlParam.protocol && urlParam.protocol.startsWith('https')) {
        return urlParam.href
    } else {
        throw new Error(`Invalid URL`)
    }
}

function getNewServeoTunnelUrl() {
    throw new Error('Serveo tunnel is not implemented!')
}

function updateLocationInYaml(url) {
    fs.writeFileSync(
        `${rootDir}/JCasC/.gitignored.yaml`,
        'unclassified:\n' +
        '  location:\n' +
        `    url: "${url}"\n`
    )
}