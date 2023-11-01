import path from "node:path";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

import Realm from "realm";
import prompts from "prompts";
import { BeatmapSet } from "./realm/schema/mod.js";
import { getConfigDir, getRealmDBPath } from "./utils/mod.js";
import { getLazerDB, getNamedFileHash, hashedFilePath } from "./realm/mod.js";

export default async function main() {
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

  Realm.flags.ALLOW_CLEAR_TEST_STATE = true;

  const realm: Realm = await getLazerDB(realmDBPath);

  console.log(`realm.isClosed: ${realm.isClosed}`);

  const beatmapSets = realm.objects(BeatmapSet);

  console.log(`beatmaps: ${beatmapSets.length}`);

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
}
