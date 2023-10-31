import type { ObjectSchema } from "realm";
import Realm from "realm";

export class RealmFile extends Realm.Object<RealmFile> {
  Hash?: string;

  static schema: ObjectSchema = {
    name: "File",
    primaryKey: "Hash",
    properties: {
      Hash: { type: "string", default: "", optional: true },
    },
  };
}

