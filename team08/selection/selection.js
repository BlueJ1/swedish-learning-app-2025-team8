import {
  db_get_categories,
  db_get_n_random_words,
  db_get_vocabs,
  init_db,
  local_get_categories,
} from "../store/read.js";
import {
  local_set_categories,
  local_set_guesses,
  local_wipe_guesses,
} from "../store/write.js";
import * as Types from "../store/storage_type.js";
import * as DB from "../store/alternative_backend/database_type.js";
import { CATEGORIES } from "../store/store_config.js";

/**
 * @typedef {Object} FrontVocab
 * @property {string} en - English word (e.g., "sweater").
 * @property {string} sv - Swedish translation.
 * @property {string} img
 * @property {string} audio
 * @property {string} id
 */

/**
 * @typedef WordSelect
 * @property {Number} correct_index
 * @property {FrontVocab} words
 *
 */

await init_db();

// Resets guesses for testing, this should be done in start game
// ---
local_wipe_guesses();
local_set_categories([CATEGORIES.FOOD]);
// ---

/** @type {Types.Guess[]} */
let guesses = [];

let words = db_get_categories(local_get_categories());

/**
 *
 * @returns {WordSelect}
 */
export function get_next_words() {
  console.log(words);
  const IDS = db_get_n_random_words(words, 3);
  console.log(IDS);
  /**
   * @type {DB.Vocabulary[]}
   */
  const WORDS = db_get_vocabs(IDS);

  const RESULT = [];
  for (let i = 0; i < 3; i++) {
    /** @type {FrontVocab} */
    const ITEM = {
      en: WORDS[i].en,
      sv: WORDS[i].sv,
      img: WORDS[i].img,
      audio: WORDS[i].audio,
      id: IDS[i],
    };
    RESULT.push(ITEM);
  }
  return {
    correct_index: Math.floor(Math.random() * IDS.length),
    words: RESULT,
  };
}

/**
 * @param {Types.Guess} guess
 */
export function update_selection(guess) {
  guesses.push(guess);
  if (guess.guessed_correct) {
    words = words.filter((id) => id != guess.id);
  }
}

export function finish_game() {
  local_set_guesses(guesses);
}
