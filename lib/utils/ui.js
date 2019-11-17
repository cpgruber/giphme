const fetch = require('node-fetch');
const { prompt } = require('inquirer');
const termImg = require('term-img');

const question = {
  type: 'expand',
  name: 'direction',
  message: '(p)revious or (n)ext',
  default: 'n',
  choices: [
    {
      key: 'p',
      name: 'Prev',
      value: 'p'
    },
    {
      key: 'n',
      name: 'Next',
      value: 'n'
    }
  ]
};

async function scroll (gifs, idx = 0) {
  const { url, images: { original: { url: displayUrl } } } = gifs[idx];
  copy(url);

  await display(displayUrl);
  console.log(`${idx+1}/${gifs.length}`);

  const { direction } = await prompt(question);
  return scroll(gifs, getIndex(direction, idx, gifs.length - 1));
}

function display (url) {
  const callback = (res) => termImg(res, () => {});
  return fetch(url, { method: 'GET' }).then(res => res.buffer()).then(callback);
}

function copy (data) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}

function getIndex (direction, currentIndex, max) {
  const dir = direction === 'p' ? -1 : 1;
  let idx = currentIndex + dir;
  if (idx < 0) {
    idx = max;
  } else if (idx > max) {
    idx = 0;
  }
  return idx;
}

module.exports = scroll;
