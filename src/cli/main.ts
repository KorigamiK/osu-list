import path from "node:path";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

import Realm from "realm";
import prompts from "prompts";
import { Beatmap, BeatmapSet } from "../realm/schema/mod.js";
import { getConfigDir, getDataDir, getRealmDBPath } from "../utils/mod.js";
import { getLazerDB, getNamedFileHash, hashedFilePath } from "../realm/mod.js";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export function getArgs() {
  const argv = yargs(hideBin(process.argv)).options({
    reload: {
      type: "boolean",
      default: false,
      alias: "r",
      describe: "Reload lazer database",
    },
    osuDataDir: {
      type: "string",
      default: path.join(getDataDir() || ".", "osu"),
      alias: "d",
      describe: "Osu!lazer data directory",
    },
    configDir: {
      type: "string",
      default: path.join(getConfigDir() || ".", "osu-play"),
      alias: "c",
      describe: "Config directory",
    },
  }).argv;
  return argv;
}

export async function main() {
  const argv = await getArgs();
  console.log("[INFO] OSU!list");

  let reload = false;
  let osuDataDir = argv.osuDataDir;

  if (argv.reload) {
    console.log("[INFO] Reloading lazer database");
    reload = true;
  }

  if (argv.osuDataDir !== getDataDir()) {
    console.log(`[INFO] Using osu!lazer data directory: ${argv.osuDataDir}`);
  }

  const realmDBPath = getRealmDBPath(argv.configDir, { reload, osuDataDir });

  if (realmDBPath == null) {
    console.log("[ERROR] Realm DB not found");
    process.exit(1);
  }

  const currentSchema = Realm.schemaVersion(realmDBPath);
  console.log(`currentSchema: ${currentSchema}`);

  Realm.flags.ALLOW_CLEAR_TEST_STATE = true;

  const realm: Realm = await getLazerDB(realmDBPath);

  console.log(`realm.isClosed: ${realm.isClosed}`);

  const beatmapSets = realm.objects(BeatmapSet);

  const songSet = new Set<string>();
  const uniqueBeatmaps: {
    value: { title: string; path: string | null };
    title: string;
  }[] = [];

  for (const beatmapSet of beatmapSets) {
    for (const beatmap of beatmapSet.Beatmaps) {
      const fileName = beatmap.Metadata.AudioFile;
      const hash = getNamedFileHash(fileName ?? "", beatmapSet);
      if (!hash) continue;
      if (songSet.has(hash)) continue;
      songSet.add(hash);
      const meta = beatmap.Metadata;
      const path = hashedFilePath(hash);
      const title = `${meta.Title} : ${meta.Artist} - ${meta.TitleUnicode} : ${meta.ArtistUnicode}`;
      uniqueBeatmaps.push({
        value: { title, path },
        title,
      });
    }
  }

  console.log(`beatmap songs: ${beatmapSets.length}`);

  // Get the map index from the user
  const selectedBeatmap: (typeof uniqueBeatmaps)[number]["value"] = (
    await prompts({
      type: "autocomplete",
      name: "beatmap",
      message: "Which map do you want to play:",
      choices: uniqueBeatmaps,
    })
  ).beatmap;

  console.log(`Map : ${selectedBeatmap.title}`);
  if (selectedBeatmap.path && existsSync(selectedBeatmap.path)) {
    console.log(`File exists: ${selectedBeatmap.path}`);
    // Open file using exo-open.
    console.log(`Playing file ${selectedBeatmap.title}`);
    selectedBeatmap.path && execSync(`exo-open ${selectedBeatmap.path}`);
  } else {
    console.log(`File does not exist: ${selectedBeatmap.path}`);
  }

  realm.close();
  console.log(`realm.isClosed: ${realm.isClosed}`);

  // Realm.clearTestState();
}
