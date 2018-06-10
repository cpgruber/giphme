const program = require('commander');
const fetch = require('node-fetch');
const load = require('load-json-file');
const write = require('write-json-file');
const path = require('path');
const config = path.join(__dirname, '../config.json');

async function init() {
  program
    .version('1.0.4')
    .description('Search and copy giphy links from CLI.')
    .option('-k, --key <giphy api key>', 'set giphy api key')
    .option('-c, --count <number gifs returned>', 'number gifs picked from')
    .parse(process.argv);

  const key = await (program.key ? setKey(program.key) : getKey());
  const term = program.args.join(" ");
  const count = program.count || 5;

  if (!key) return console.log("You need to set your giphy api key!");
  if (!term) return console.log("You need to provide a search term!");

  return query(key, term, count);
}

function query(key, term, count) {
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${term}&limit=${count}&rating=PG&lang=en`;
  return fetch(url, {method: 'GET'}).then(res => res.json()).then(res => {
    if (res.data.length === 0) return console.log("No results returned!");

    var gif = res.data[getIndex(res.data.length)];
    copy(gif.url);
  }).catch(err => {
    console.log("There was an error, maybe check your giphy key.");
  });
}

function getKey() {
  return load(config).then(res => {
  	return res.key;
  }).catch(err => {
    return null;
  });
}

function setKey(key) {
  return write(config, {key}).then(res => {
    return key;
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
