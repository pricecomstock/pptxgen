import axios from "axios";

const apiKey = process.env.TWINWORDS_API_KEY;
const apiHost = "twinword-word-associations-v1.p.rapidapi.com";
const TWINWORDS_API_URL =
  "https://twinword-word-associations-v1.p.rapidapi.com/associations/";

const headers = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": apiHost,
};

class AssociatedWords {
  public entry: string;

  public associations: string[];
  public associationsScored: Record<string, number>;

  constructor(twinWordsJsonReponse) {
    this.entry = twinWordsJsonReponse.entry;
    this.associations = twinWordsJsonReponse.associations_array;
    this.associationsScored = twinWordsJsonReponse.associations_scored;
  }
}

export async function getAssociatedWords(searchTerm: string) {
  return;
  try {
    const response = await axios.get(TWINWORDS_API_URL, {
      headers,
      params: {
        entry: searchTerm,
      },
    });

    return new AssociatedWords(response.data);
  } catch (e) {
    return [];
  }
}
