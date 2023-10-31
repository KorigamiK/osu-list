import type { ObjectSchema } from "realm";
import Realm from "realm";

export class RealmUser extends Realm.Object<RealmUser> {
  OnlineID!: number;
  Username?: string;
  CountryCode?: string;

  static embedded = true;

  static schema: ObjectSchema = {
    name: "RealmUser",
    embedded: true,
    properties: {
      OnlineID: { type: "int", default: 1 },
      Username: { type: "string", default: "", optional: true },
      CountryCode: { type: "string", optional: true },
    },
  };
}

