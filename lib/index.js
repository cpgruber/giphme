const program = require('commander');
const fetch = require('node-fetch');
const load = require('load-json-file');
const write = require('write-json-file');
const termImg = require('term-img');
const path = require('path');
const config = path.join(__dirname, '../config.json');

async function init() {
  program
    .version('1.0.4')
    .description('Search and copy giphy links from CLI.')
    .option('-k, --key <giphy api key>', 'set giphy api key')
    .option('-c, --count <number gifs returned>', 'number gifs picked from')
    .option('-r, --rating <gif rating>', 'g, pg, pg-13, r')
    .parse(process.argv);

  const term = program.args.join(" ");
  const opts = await getConfig();
  const key = program.key || opts.key;
  const count = program.count || opts.count;
  const rating = program.rating || opts.rating;

  await setConfig({key, count, rating});

  if (!key) return console.log("You need to set your giphy api key!");
  if (!term) return console.log("You need to provide a search term!");

  return query(key, term, count, rating);
}

function query(key, term, count, rating) {
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${term}&limit=${count}&rating=${rating}&lang=en`;
  return fetch(url, {method: 'GET'}).then(res => res.json()).then(res => {
    if (res.data.length === 0) return console.log("No results returned!");

    var gif = res.data[getIndex(res.data.length)];
    copy(gif.url);
    return display(gif.images.original.url);
  }).catch(err => {
    console.log("There was an error, maybe check your giphy key.");
  });
}

function getConfig() {
  return load(config).catch(err => {
    return null;
  });
}

function setConfig(opts) {
  return write(config, opts);
}

function display(url) {
  return fetch(url, {method: 'GET'}).then(res => res.buffer()).then(res => {
    termImg(res, () => {});
  });
}

function copy(data) {
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}

function getIndex(count) {
  return Math.floor(Math.random() * count);
}

exports.init = init;
