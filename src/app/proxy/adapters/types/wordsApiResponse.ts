type Definition = {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
};

type Phonetic = {
  text: string;
  audio?: string;
};

type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

export type WordObject = {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
};
