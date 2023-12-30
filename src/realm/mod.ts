import Realm from "realm";
import path from "node:path";
import { getDataDir } from "../utils/mod.js";
import {
  Beatmap,
  BeatmapMetadata,
  BeatmapSet,
  RealmFile,
  RealmNamedFileUsage,
  RealmUser,
} from "./schema/mod.js";

export const getLazerDB = async (realmDBPath: string) => {
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
    schemaVersion: 41,
    onMigration: (oldRealm, newRealm) => {
      console.log(
        `[onMigration]: Migrating ${oldRealm.path} - ${oldRealm.schemaVersion} -> ${newRealm.path} - ${newRealm.schemaVersion}`,
      );
    },
  });

  return realm;
};

export const hashedFilePath = (hash: string) => {
  const dataDir = getDataDir();
  if (!dataDir) return null;
  return path.join(
    dataDir,
    "osu",
    "files",
    hash.slice(0, 1),
    hash.slice(0, 2),
    hash,
  );
};

export const getNamedFileHash = (fileName: string, beatmapSet: BeatmapSet) => {
  const files = beatmapSet.Files;
  for (const file of files) {
    if (file.Filename == fileName) return file.File.Hash;
  }
  return undefined;
};
