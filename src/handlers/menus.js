const chalk = require('chalk')
const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('menus', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
  fs.readdirSync('./src/menus/').forEach(dir => {
    const files = fs.readdirSync(`./src/menus/${dir}/`).filter(file => file.endsWith('.js'));
    if (!files || files.length <= 0) console.log(chalk.red("menus - 0"))
    files.forEach((file) => {
      let menu = require(`../menus/${dir}/${file}`)
      if (menu) {
        client.menus.set(menu.id, menu)
        table.addRow(menu.id, '✅')
      } else {
        table.addRow(file, '⛔')
      }
    });
  });
  console.log(chalk.blue(table.toString()))
};