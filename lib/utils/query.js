const fetch = require('node-fetch');

async function query ({ key, count, rating, term }) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${term}&limit=${count}&rating=${rating}&lang=en`;
  const { data, message } = await fetch(url, { method: 'GET' }).then(res => res.json());

  if (!!data && data.length > 0) {
    return data;
  } else {
    const err = message || 'No results returned';
    throw new Error(err);
  }
}

module.exports = query;
