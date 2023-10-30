import type { ObjectSchema } from "realm";
import Realm from "realm";
/*
public class RealmUser : EmbeddedObject {
  public int OnlineID { get; set; } = 1;
  public string Username { get; set; } = string.Empty;
  public string? CountryCode { get; set; }
}
*/
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

