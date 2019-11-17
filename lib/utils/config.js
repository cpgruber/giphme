const load = require('load-json-file');
const write = require('write-json-file');
const path = require('path');

const config = path.join(__dirname, '../../config.json');

async function parseConfig ({ key, count, rating }) {
  const saved = await load(config) || {};
  const opts = {
    key: key || saved.key,
    count: count || saved.count || 10,
    rating: rating || saved.rating || 'pg'
  };
  // don't need to wait for this to write
  write(config, opts);

  return opts;
}

module.exports = parseConfig;
