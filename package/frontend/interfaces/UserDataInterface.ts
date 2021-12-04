import { VocabularyInterface } from "./VocabularyInterface";
import firebase from "firebase";

export interface UserDataInterface {
    user_name: string;
    amount_of_vocs_per_unit: number;
    dark_mode: boolean;
    creation_time?: string;
    update_time?: any;
    vocs: VocabularyInterface[]
}