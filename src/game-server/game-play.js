/**
 * This module contains the logic of the game play.
 */

// Total number of symbols that can appear in each game play
const NUM_SYMBOLS = 6;

/**
 * Get a random number between 0 and NUM_SYMBOLS
 *
 * @returns {number}
 */
function getRandomNumber() {
  return Math.floor(Math.random() * NUM_SYMBOLS);
}

/**
 * Decide randomly whether to give a bonus round or not.
 *
 * This function is intentionally kept simple and probable so that the
 * likelyhood of a use winning a bonus is not too few.
 *
 * @returns {boolean}
 */
function calculateBonus() {
  // Create a random digit and get the current timestamp. If the random digit
  // is the same as the last digit in the timestamp, give a bonus round.
  const randomNumber = getRandomNumber();
  const timestampEntropy = (new Date()).getTime() % NUM_SYMBOLS;

  return randomNumber === timestampEntropy;
}

/**
 * This function rolls the dice, which is central to the gameplay.
 *
 * It returns the type of win and whether the user get a bonus round.
 *
 * @returns {object}
 */
function roll() {
  // We instantiate a 0-filled array of length 3 and then fill it with
  // random numbers instead. Then we pass the array of random numbers through a Set(),
  // so that we can easily count how many duplicate numbers there were in the random set.
  const slots = [0, 0, 0].map(getRandomNumber);
  const deDupeCount = new Set(slots).size;
  const output = {slots};

  switch (deDupeCount) {
    case 1: {
      // Only one number left in the deduped list, which means
      // all 3 of the numbers were the same - Big win!
      output.win = 'big-win';
      output.bonus = calculateBonus();
      break;
    }
    case 2: {
      // Two numbers left in the deduped list, which means
      // two of the random numbers generated were the same - Small win!
      output.win = 'small-win';
      output.bonus = calculateBonus();
      break;
    }
    default: {
      // More than two (three!) distinct numbers left in the deduped list, which means
      // all the 3 random numbers were distinct values - No win.
      output.win = 'no-win';
      output.bonus = calculateBonus();
    }
  }

  return output;
}

exports.roll = roll;
