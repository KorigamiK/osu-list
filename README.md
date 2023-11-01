# OSU!Pplay

Listen to your favourite [OSU!Lazer](https://lazer.ppy.sh) beatmaps as a spotify playlist from the terminal

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [osu!lazer](https://lazer.ppy.sh/home/download) with some beatmaps to listen to 😉
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

This package can be used as a library or as a cli application. To use the lazer
database interaction in your applicatoins import the `osu-play` package and
start using it!

```ts
import { lazer } from "osu-play";

const realm = getLazerDB();
```

