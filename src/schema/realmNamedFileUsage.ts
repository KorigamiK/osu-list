import type { ObjectSchema } from "realm";
import Realm from "realm";
import { RealmFile } from "./realmFile.ts";

/* public class RealmNamedFileUsage : EmbeddedObject
{
    public RealmFile File { get; set; } = null!;
    public string Filename { get; set; } = null!;
} */
export class RealmNamedFileUsage extends Realm.Object<RealmNamedFileUsage> {
  File!: RealmFile;
  Filename?: string;

  static embedded = true;

  static schema: ObjectSchema = {
    name: "RealmNamedFileUsage",
    embedded: true,
    properties: {
      File: "File",
      Filename: { type: "string", optional: true },
    },
  };
}
