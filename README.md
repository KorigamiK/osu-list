<h1 align="center">
	<br>
  osu!play
	<br>

[![NPM version](https://img.shields.io/npm/v/osu-play.svg?style=flat)](https://npmjs.org/package/osu-play)
[![Downloads](https://badgen.net/npm/dt/osu-play)](https://www.npmjs.com/package/osu-play)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

</h1>

> Listen to your favourite [osu!lazer](https://lazer.ppy.sh) beatmaps as a
> spotify playlist from the terminal

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [osu!lazer](https://lazer.ppy.sh/home/download) with some beatmaps to listen
  to 😉
- That's it!

### Quick start

- Try out the latest release without installing anything:

  ```sh
  npx osu-play # using npm
  pnpm dlx osu-play # using pnpm
  ```

- Install the latest release globally:

  ```sh
  npm i -g osu-play # using npm
  pnpm i -g osu-play # using pnpm
  ```

## Usage

The `osu-play` command can be used with the following options:

```sh
➜  korigamik git:(main) ✗ osu-play --help
Play music from your osu!lazer beatmaps from the terminal
Usage: osu-play [options]

Options:
      --help            Show help                                      [boolean]
      --version         Show version number                            [boolean]
  -r, --reload          Reload lazer database         [boolean] [default: false]
      --exportPlaylist  Export playlist to a file                       [string]
  -d, --osuDataDir      Osu!lazer data directory
                            [string] [default: "/home/origami/.local/share/osu"]
  -c, --configDir       Config directory
                            [string] [default: "/home/origami/.config/osu-play"]
  -l, --loop            Loop the playlist on end      [boolean] [default: false]
```

This package can be used as a library or as a cli application. To use the lazer
database interaction in your applicatoins import the `osu-play` package and
start using it!

```ts
import { lazer } from "osu-play";

const realm = getLazerDB();
```
