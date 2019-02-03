const chalk = require('chalk');

console.info = m => console.log(chalk.blue.bold(m))
console.debug = m => console.log(chalk.green.bold(m))
console.warn = m => console.log(chalk.yellow.bold(m))
console.error = m => console.log(chalk.red.bold(m))
