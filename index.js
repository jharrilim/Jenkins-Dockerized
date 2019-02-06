const $ = require('shelljs')
const url = require("url");
const fs = require('fs')
require('./scripts/logging')

$.config.fatal = true
const rootDir = __dirname

function getPublicUrl() {
    const urlParam = url.parse(process.argv[process.argv.length - 1])
    if (urlParam.protocol && urlParam.protocol.startsWith('https')) {
        return urlParam.href
    } else {
        throw new Error(`Invalid URL`)
    }
}

function updateLocationInYaml(url) {
    fs.writeFileSync(
        `${rootDir}/JCasC/.gitignored.yaml`,
        'unclassified:\n' +
        '  location:\n' +
        `    url: "${url}"\n`
    )
}

async function main() {
    const publicUrl = getPublicUrl()
    console.debug(`Public URL is: ${publicUrl}`)
    updateLocationInYaml(publicUrl)

    try {
        $.config.fatal = false
        $.exec('docker rm --force --volumes jenkins')
    } catch (_) {} finally {
        $.config.fatal = true
    }
    $.rm('-rf', `${rootDir}/jenkins_home/`)
    $.exec(`docker build --tag my-jenkins --no-cache  .`)
    $.exec(`docker run --name jenkins --detach --publish 8080:8080 --publish 50000:50000 --volume "${rootDir}/jenkins_home":/var/jenkins_home my-jenkins`)
    console.info(
        `Jenkins is starting up and is accessible from:\n` +
        `\thttp://localhost:8080/\n` +
        `\t${publicUrl}`
    )
}

main().catch(reason => {
    console.error(reason)
    process.exit(1)
})