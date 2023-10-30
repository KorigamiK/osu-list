import type { ObjectSchema } from "realm";
import Realm from "realm";
import { BeatmapMetadata } from "./beatmapMetadata.js";

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
