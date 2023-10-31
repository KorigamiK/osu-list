import Realm from "realm";
import {
  Beatmap,
  BeatmapMetadata,
  BeatmapSet,
  RealmFile,
  RealmNamedFileUsage,
  RealmUser,
} from "./schema/index.js";
import { dataDir, stdin } from "./utils/mod.js";
import { closeSync, existsSync } from "fs";
import { exec } from "child_process";

console.log("[INFO] OSU!list");

const currentSchema = Realm.schemaVersion("./client.realm");
console.log(`currentSchema: ${currentSchema}`);

const realm = await Realm.open({
  schema: [
    BeatmapSet,
    RealmFile,
    RealmNamedFileUsage,
    Beatmap,
    BeatmapMetadata,
    RealmUser,
  ],
  path: "./client.realm",
  schemaVersion: 36,
  onMigration: (oldRealm, newRealm) => {
    console.log(`[onMigration]: ${oldRealm.path} -> ${newRealm.path}`);
  },
});

console.log(`realm.isClosed: ${realm.isClosed}`);

const beatmapSets = realm.objects(BeatmapSet);

console.log(`beatmaps: ${beatmapSets.length}`);
for (const [i, beatmaps] of beatmapSets.entries()) {
  const meta = beatmaps.Beatmaps[0].Metadata;
  if (meta == null) {
    console.log("null metadata");
    continue;
  }
  console.log(
    `${i} [Metadata] Title: ${meta.Title} : ${meta.Artist} - ${meta.TitleUnicode} : ${meta.ArtistUnicode}`,
  );
}

const hashedFilePath = (hash: string) => {
  return `${dataDir}/osu/files/${hash.slice(0, 1)}/${
    hash.slice(
      0,
      2,
    )
  }/${hash}`;
};

const getNamedFileHash = (fileName: string, beatmapSet: BeatmapSet) => {
  const files = beatmapSet.Files;
  for (const file of files) {
    if (file.Filename == fileName) return file.File.Hash;
  }
  return undefined;
};

const checkFileExists = (path: string) => {
  return existsSync(path);
};

// Get the map index from the user from the command line.
const index = parseInt(prompt("Play map:") || "0");
const selectedBeatmapSet = beatmapSets[index];
console.log(`Map ${index}: ${selectedBeatmapSet.OnlineID}`);
const fileName = selectedBeatmapSet.Beatmaps[0].Metadata.AudioFile;
const fileHash = fileName
  ? getNamedFileHash(fileName, selectedBeatmapSet)
  : undefined;
const filePath = fileHash ? hashedFilePath(fileHash) : undefined;
if (filePath && checkFileExists(filePath)) {
  console.log(`File exists: ${filePath}`);
} else {
  console.log(`File does not exist: ${filePath}`);
}

// Open file using exo-open.
console.log(`Playing file ${selectedBeatmapSet.Beatmaps[0].Metadata.Title}`);
filePath && exec(`exo-open ${filePath}`);

/* // Filter for all tasks with a status of "Open".
const openTasks = tasks.filtered("status = 'Open'"); */

realm.close();
console.log(`realm.isClosed: ${realm.isClosed}`);

closeSync(stdin);
