import type { ObjectSchema } from "realm";
import Realm from "realm";
import { RealmUser } from "./realmUser.ts";

/*
public class BeatmapMetadata : RealmObject {
  public string Title { get; set; } = string.Empty;
  public string TitleUnicode { get; set; } = string.Empty;
  public string Artist { get; set; } = string.Empty;
  public string ArtistUnicode { get; set; } = string.Empty;
  public RealmUser Author { get; set; } = new RealmUser();
  public string Source { get; set; } = string.Empty;
  public string? Tags { get; set; } = string.Empty;
  public int PreviewTime { get; set; }
  public string AudioFile { get; set; } = string.Empty;
  public string BackgroundFile { get; set; } = string.Empty;

  // Author kabii
  public string OutputAudioFilename(int beatmapId) =>
      $"{Artist.Trunc(30)} - {Title.Trunc(60)} ({beatmapId}).mp3"
          .RemoveFilenameCharacters();
}
*/
export class BeatmapMetadata extends Realm.Object<BeatmapMetadata> {
  Title?: string;
  TitleUnicode?: string;
  Artist?: string;
  ArtistUnicode?: string;
  Author?: RealmUser;
  Source?: string;
  Tags?: string;
  PreviewTime?: number;
  AudioFile?: string;
  BackgroundFile?: string;

  static schema: ObjectSchema = {
    name: "BeatmapMetadata",
    properties: {
      Title: { type: "string", default: "", optional: true },
      TitleUnicode: { type: "string", default: "", optional: true },
      Artist: { type: "string", default: "", optional: true },
      ArtistUnicode: { type: "string", default: "", optional: true },
      Author: { type: "object", objectType: "RealmUser", default: null },
      Source: { type: "string", default: "", optional: true },
      Tags: { type: "string", default: "", optional: true },
      PreviewTime: { type: "int", default: 0 },
      AudioFile: { type: "string", default: "", optional: true },
      BackgroundFile: { type: "string", default: "", optional: true },
    },
  };
}

