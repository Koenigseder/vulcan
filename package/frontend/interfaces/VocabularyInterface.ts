import { QueryModes } from "../enums/QueryModesEnum";

export interface VocabularyInterface {
  id: number;
  foreign_word: string;
  known_word: string;
  repeated_without_mistake?: number | null;
  last_voc_side_queried:
    | QueryModes.foreignWord
    | QueryModes.knownWord
    | undefined;
}
