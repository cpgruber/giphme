# giphme

## Overview
CLI tool to search giphy, copy gif url to clipboard (_macOS\* and iTerm2\*\* only_)

```
$ npm install -g giphme
```
\* uses `pbcopy`

\*\* uses [`term-img`](https://github.com/sindresorhus/term-img)

## Usage
1. Get an api key from [giphy](https://developers.giphy.com/dashboard/?create=true)
2. Load your api key to the tool in your first search:

  ```
  $ giphme -k <your api key> <search term>

  # search term can include spaces and does not need to be enclosed in quotes
  ```
3. Scroll through gifs using interactive prompt:
  - `n` or `return` to view next gif in queue
  - `p` for previous
4. link for currently viewed gif automatically copied to clipboard, `cmd + v` to paste
5. `ctrl + c` to exit, do another search

  ```
  $ giphme i aint the sharpest tool in the shed
  ```

## Docs

Options:
```
-k, --key <giphy api key>           set giphy api key
-c, --count <number gifs returned>  number gifs to pick from, default 10
-r, --rating <gif rating>           g, pg, pg-13, r, default pg
-V, --version                       output the version number
-h, --help                          output usage information
```
**Note:** when setting options, values are persisted for all subsequent searches

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
