const program = require('commander');
const parseConfig = require('./utils/config');
const query = require('./utils/query');
const scroll = require('./utils/ui');

async function init() {
  program
    .version('1.0.6')
    .description('Search and copy giphy links from CLI.')
    .option('-k, --key <giphy api key>', 'set giphy api key')
    .option('-c, --count <number gifs returned>', 'number gifs to pick from')
    .option('-r, --rating <gif rating>', 'g, pg, pg-13, r')
    .parse(process.argv);

  const { key, count, rating } = await parseConfig(program);
  if (!key) return console.log('You need to set your giphy api key!');
  const term = program.args.join(' ');
  if (!term) return console.log('You need to provide a search term!');

  return query({ key, count, rating, term }).then(scroll).catch(console.log);
}

module.exports = init;
