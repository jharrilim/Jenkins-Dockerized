#!/usr/bin/env node

const yargs = require('yargs')

yargs
    .usage('$0 <command> [options]')
    .command('start', 'Start Jenkins instance', args => {
        args.options({
            'url': {
                type: 'string',
                describe: 'Publicly available HTTPS url for port forwarding to Jenkins'
            }
        })
    }, args => {
        require('./scripts/commands/start')(args)
    })
    .help()
    .argv

//     .option('port', 'The local port on which the Jenkins Web UI will be running.', 8080)
//     .option('url', 'Publicly available HTTPS url for port forwarding to Jenkins')
//     .command('start', 'Start Jenkins instance', ['s'])