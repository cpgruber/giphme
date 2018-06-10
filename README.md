# giphme

## Overview
CLI tool to search giphy, copy gif url to clipboard (_macOS only_)

```
$ npm install -g giphme
```

## Usage
1. Get an api key from [giphy](https://developers.giphy.com/dashboard/?create=true)
2. Load your api key to the tool in your first search:
```
$ giphme -k <your api key> <search term>
```
\*_search term can include spaces and does not need to be enclosed in quotes_
3. `cmd + v` to paste gif url
4. Search anything else (no need to set key again unless it needs to be changed)
```
$ giphme i aint the sharpest tool in the shed
```

## Docs

Options:
```
-V, --version                       output the version number
-k, --key <giphy api key>           set giphy api key
-c, --count <number gifs returned>  number gifs to randomly pick from, default 5
-h, --help                          output usage information
```

## License

The MIT License (MIT)

Copyright (c) 2018 Chase Gruber.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
