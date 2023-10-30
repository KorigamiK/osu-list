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

/*
public class Beatmap : RealmObject {
  [PrimaryKey]
  public Guid ID { get; set; } = Guid.NewGuid();
  public string DifficultyName { get; set; } = string.Empty;
  public Ruleset Ruleset { get; set; } = null!;
  public BeatmapDifficulty Difficulty { get; set; } = null!;
  public BeatmapMetadata Metadata { get; set; } = null!;
  public BeatmapUserSettings UserSettings { get; set; } = null!;
  public BeatmapSet? BeatmapSet { get; set; }
  public int Status { get; set; }
  [Indexed]
  public int OnlineID { get; set; } = -1;
  public double Length { get; set; }
  public double BPM { get; set; }
  public string Hash { get; set; } = string.Empty;
  public double StarRating { get; set; } = -1;
  [Indexed]
  public string MD5Hash { get; set; } = string.Empty;
  public string OnlineMD5Hash { get; set; } = string.Empty;
  public DateTimeOffset? LastLocalUpdate { get; set; }
  public DateTimeOffset? LastOnlineUpdate { get; set; }
  public bool Hidden { get; set; }
  public double AudioLeadIn { get; set; }
  public float StackLeniency { get; set; } = 0.7f;
  public bool SpecialStyle { get; set; }
  public bool LetterboxInBreaks { get; set; }
  public bool WidescreenStoryboard { get; set; }
  public bool EpilepsyWarning { get; set; }
  public bool SamplesMatchPlaybackRate { get; set; }
  public DateTimeOffset? LastPlayed { get; set; }
  public double DistanceSpacing { get; set; }
  public int BeatDivisor { get; set; }
  public int GridSize { get; set; }
  public double TimelineZoom { get; set; }
  public double? EditorTimestamp { get; set; }
  public int CountdownOffset { get; set; }
  // Author kabii
  public override bool Equals(object obj) {
    if (obj == null || !GetType().Equals(obj.GetType())) {
      return false;
    } else {
      Beatmap map = (Beatmap)obj;
      return ID == map.ID;
    }
  }

  public override int GetHashCode() {
    return HashCode.Combine(base.GetHashCode(), ID);
  }
}*/
export class Beatmap extends Realm.Object<Beatmap> {
  ID!: string;
  DifficultyName?: string;
  Ruleset!: any;
  Difficulty!: any;
  Metadata!: BeatmapMetadata;
  UserSettings!: any;
  BeatmapSet!: any;
  Status!: number;
  OnlineID!: number;
  Length!: number;
  BPM!: number;
  Hash?: string;
  StarRating!: number;
  MD5Hash?: string;
  OnlineMD5Hash?: string;
  LastLocalUpdate?: Date;
  LastOnlineUpdate?: Date;
  Hidden!: boolean;
  AudioLeadIn!: number;
  StackLeniency!: number;
  SpecialStyle!: boolean;
  LetterboxInBreaks!: boolean;
  WidescreenStoryboard!: boolean;
  EpilepsyWarning!: boolean;
  SamplesMatchPlaybackRate!: boolean;
  LastPlayed?: Date;
  DistanceSpacing!: number;
  BeatDivisor!: number;
  GridSize!: number;
  TimelineZoom!: number;
  EditorTimestamp?: number;
  CountdownOffset!: number;

  static schema: ObjectSchema = {
    name: "Beatmap",
    primaryKey: "ID",
    properties: {
      ID: { type: "uuid", default: "" },
      DifficultyName: { type: "string", default: "", optional: true },
      // Ruleset: { type: "object", objectType: "Ruleset", default: null },
      // Difficulty: { type: "object", objectType: "BeatmapDifficulty", default: null },
      Metadata: {
        type: "object",
        objectType: "BeatmapMetadata",
        default: null,
      },
      // UserSettings: { type: "object", objectType: "BeatmapUserSettings", default: null },
      BeatmapSet: { type: "object", objectType: "BeatmapSet", default: null },
      Status: { type: "int", default: -3 },
      OnlineID: { type: "int", default: -1 },
      Length: { type: "double", default: 0 },
      BPM: { type: "double", default: 0 },
      Hash: { type: "string", default: "", optional: true },
      StarRating: { type: "double", default: -1 },
      MD5Hash: { type: "string", default: "", optional: true },
      OnlineMD5Hash: {
        type: "string",
        default: "",
        optional: true,
      },
      LastLocalUpdate: { type: "date", optional: true },
      LastOnlineUpdate: { type: "date", optional: true },
      Hidden: { type: "bool", default: false },
      AudioLeadIn: { type: "double", default: 0 },
      StackLeniency: { type: "float", default: 0.7 },
      SpecialStyle: { type: "bool", default: false },
      LetterboxInBreaks: { type: "bool", default: false },
      WidescreenStoryboard: { type: "bool", default: false },
      EpilepsyWarning: { type: "bool", default: false },
      SamplesMatchPlaybackRate: { type: "bool", default: false },
      LastPlayed: { type: "date", optional: true },
      DistanceSpacing: { type: "double", default: 0 },
      BeatDivisor: { type: "int", default: 0 },
      GridSize: { type: "int", default: 0 },
      TimelineZoom: { type: "double", default: 0 },
      EditorTimestamp: { type: "double", optional: true },
      CountdownOffset: { type: "int", default: 0 },
    },
  };
}

export class BeatmapSet extends Realm.Object<BeatmapSet> {
  ID!: string;
  OnlineID!: number;
  DateAdded!: Date;
  DateSubmitted?: Date;
  DateRanked?: Date;
  Beatmaps!: Array<Beatmap>;
  Files!: Array<RealmNamedFileUsage>;
  Status!: number;
  DeletePending!: boolean;
  Hash?: string;
  Protected!: boolean;

  static schema: ObjectSchema = {
    name: "BeatmapSet",
    primaryKey: "ID",
    properties: {
      ID: { type: "uuid", default: "" },
      OnlineID: { type: "int", default: -1 },
      DateAdded: { type: "date" },
      DateSubmitted: { type: "date", optional: true },
      DateRanked: { type: "date", optional: true },
      Beatmaps: { type: "list", objectType: "Beatmap", default: [] },
      Files: { type: "list", objectType: "RealmNamedFileUsage", default: [] },
      Status: { type: "int", default: -3 },
      DeletePending: { type: "bool", default: false },
      Hash: { type: "string", default: "", optional: true },
      Protected: { type: "bool", default: false },
    },
  };
}
