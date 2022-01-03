import { VocabularyInterface } from "../interfaces/VocabularyInterface";

export interface UserDataInterface {
  amount_of_vocs: number;
  dark_mode: boolean;
  update_time: number;
  user_name: string;
  vocs: VocabularyInterface[];
}
