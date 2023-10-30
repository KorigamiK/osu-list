import type { ObjectSchema } from "realm";
import Realm from "realm";

/* [MapTo("File")]
public class RealmFile : RealmObject {
  [PrimaryKey]
  public string Hash { get; set; } = string.Empty;
} */
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

