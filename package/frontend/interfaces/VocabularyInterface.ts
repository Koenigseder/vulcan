export interface VocabularyInterface {
    id: number;
    foreign_word: string;
    known_word: string;
    repeated_without_mistake?: number | null;
}
