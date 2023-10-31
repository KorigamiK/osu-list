import Realm from "realm";
import {
  Beatmap,
  BeatmapMetadata,
  BeatmapSet,
  RealmFile,
  RealmNamedFileUsage,
  RealmUser,
} from "./schema/mod.js";
import { getConfigDir, getDataDir, getRealmDBPath } from "./utils/mod.js";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import prompts from "prompts";
import path from "node:path";

console.log("[INFO] OSU!list");

const realmDBPath = getRealmDBPath(
  path.join(getConfigDir() || ".", "osu-play"),
);

if (realmDBPath == null) {
  console.log("[ERROR] Realm DB not found");
  process.exit(1);
}

const currentSchema = Realm.schemaVersion(realmDBPath);
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
  path: realmDBPath,
  schemaVersion: 36,
  onMigration: (oldRealm, newRealm) => {
    console.log(
      `[onMigration]: Migrating ${oldRealm.path} - ${oldRealm.schemaVersion} -> ${newRealm.path} - ${newRealm.schemaVersion}`,
    );
  },
});

Realm.flags.ALLOW_CLEAR_TEST_STATE = true;

console.log(`realm.isClosed: ${realm.isClosed}`);

const beatmapSets = realm.objects(BeatmapSet);

console.log(`beatmaps: ${beatmapSets.length}`);

const hashedFilePath = (hash: string) => {
  return `${getDataDir()}/osu/files/${hash.slice(0, 1)}/${hash.slice(
    0,
    2,
  )}/${hash}`;
};

const getNamedFileHash = (fileName: string, beatmapSet: BeatmapSet) => {
  const files = beatmapSet.Files;
  for (const file of files) {
    if (file.Filename == fileName) return file.File.Hash;
  }
  return undefined;
};

// Get the map index from the user
const selectedBeatmapSet = (
  await prompts({
    type: "autocomplete",
    name: "beatmapSet",
    message: "Which map do you want to play:",
    choices: beatmapSets.map((beatmapSet) => {
      const meta = beatmapSet.Beatmaps[0].Metadata;
      return {
        title: `${meta.Title} : ${meta.Artist} - ${meta.TitleUnicode} : ${meta.ArtistUnicode}`,
        value: beatmapSet,
      };
    }),
  })
).beatmapSet;

console.log(`Map : ${selectedBeatmapSet.Beatmaps[0].Metadata.Title}`);
const fileName = selectedBeatmapSet.Beatmaps[0].Metadata.AudioFile;
const fileHash = fileName
  ? getNamedFileHash(fileName, selectedBeatmapSet)
  : undefined;
const filePath = fileHash ? hashedFilePath(fileHash) : undefined;
if (filePath && existsSync(filePath)) {
  console.log(`File exists: ${filePath}`);
} else {
  console.log(`File does not exist: ${filePath}`);
}

// Open file using exo-open.
console.log(`Playing file ${selectedBeatmapSet.Beatmaps[0].Metadata.Title}`);
filePath && execSync(`exo-open ${filePath}`);

realm.close();
console.log(`realm.isClosed: ${realm.isClosed}`);

// Realm.clearTestState();

// Realm doesn't exit on its own, see: realm-js#4535
process.exit(0);
