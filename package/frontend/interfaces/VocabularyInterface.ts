export interface VocabularyInterface {
    id: number;
    foreign_word: string;
    known_word: string;
}

export const defaultVocabularyInterface: VocabularyInterface = {
    id: -1,
    foreign_word: '',
    known_word: '',
};