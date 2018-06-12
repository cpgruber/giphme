const program = require('commander');
const { prompt } = require('inquirer');
const fetch = require('node-fetch');
const load = require('load-json-file');
const write = require('write-json-file');
const termImg = require('term-img');
const path = require('path');
const config = path.join(__dirname, '../config.json');
const question = require('./scroll');

async function init() {
  program
    .version('1.0.4')
    .description('Search and copy giphy links from CLI.')
    .option('-k, --key <giphy api key>', 'set giphy api key')
    .option('-c, --count <number gifs returned>', 'number gifs to pick from')
    .option('-r, --rating <gif rating>', 'g, pg, pg-13, r')
    .parse(process.argv);

  const term = program.args.join(" ");
  const opts = await getConfig();
  const key = program.key || opts.key;
  const count = program.count || opts.count || 10;
  const rating = program.rating || opts.rating || 'pg';

  await setConfig({key, count, rating});

  if (!key) return console.log("You need to set your giphy api key!");
  if (!term) return console.log("You need to provide a search term!");

  return query(key, term, count, rating);
}

function query(key, term, count, rating) {
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${term}&limit=${count}&rating=${rating}&lang=en`;
  return fetch(url, {method: 'GET'}).then(res => res.json()).then(res => {
    if (res.data.length === 0) return console.log("No results returned!");
    return scrollThru(res.data, 0);
  }).catch(err => {
    console.log("There was an error, maybe check your giphy key.");
  });
}

function scrollThru(gifs, idx) {
  let gif = gifs[idx];
  copy(gif.url);
  return display(gif.images.original.url).then(() => {
    return prompt(question);
  }).then(cmd => {
    let dir = cmd.direction === 'p' ? -1 : 1;
    let i = idx + dir;
    let newIdx = i < 0 ? gifs.length - 1 :
      i >= gifs.length ? 0 : i;
    return scrollThru(gifs, newIdx);
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

exports.init = init;
