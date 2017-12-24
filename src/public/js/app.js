import request from './request';

(function init() {
  // Declaring all the config
  const allSymbolClasses = ['symbol-0', 'symbol-1', 'symbol-2', 'symbol-3', 'symbol-4', 'symbol-5'];
  const numSymbols = allSymbolClasses.length;
  const numSlots = 3;
  const bonusMessageTimeout = 2000;
  const $element = document.querySelector.bind(document);
  const playButton = $element('#play-button');
  const gameOutcome = $element('#outcome');
  const bonusRoundMessage = $element('#bonus-round');

  /**
   * Disable/enable the play button
   *
   * Because we don't want the user to activate the play button when a game is
   * in progress.
   *
   * @param {boolean} [disable = true] - true to disable, false to enable
   */
  function disablePlayButton(disable = true) {
    if (disable) {
      playButton.classList.add('rotate');
      playButton.setAttribute('disabled', 'disabled');
    } else {
      playButton.classList.remove('rotate');
      playButton.removeAttribute('disabled');
    }
  }

  /**
   * Set a symbol in a slot
   *
   * This removes the existing symbol from the slot and sets the new symbol
   *
   * @param {number} slot - Numerical index of the target slot [0-2]
   * @param {number} symbolIndex - Index of the symbol to set [0-5]
   */
  function setSymbolInSlot(slotNumber, symbolIndex) {
    const slot = $element(`#slot-${slotNumber}`);

    slot.classList.remove(...allSymbolClasses);
    slot.classList.add(`symbol-${symbolIndex}`);
  }

  /**
   * Show the game's outcome message based on the key passed
   *
   * @param {string} win - the type of win [no-win|small-win|big-win]
   */
  function showOutcomeStatus(win) {
    // Setting the strings to display in constant, rather than taking directly
    // from the server response, so that they can be localized easily.
    const strings = {
      'no-win': 'No Win',
      'small-win': 'Small Win',
      'big-win': 'Big Win!',
    };

    gameOutcome.classList.remove('hide');
    gameOutcome.textContent = strings[win];
  }

  /**
   * Let the user know that they have won a bonus round.
   * The bonus message auto hides after the specified timeout.
   */
  function showBonusMessage() {
    return new Promise((resolve) => {
      bonusRoundMessage.classList.remove('hide');

      setTimeout(() => {
        bonusRoundMessage.classList.add('hide');
        resolve();
      }, bonusMessageTimeout);
    });
  }

  /**
   * Dim/un-dim the game outcome message.
   *
   * Dimming is done to indicate that the outcome displayed at the top
   * is of the previous game play.
   *
   * @param {boolean} [dim = true] - true to dim, false to un-dim
   */
  function dimOutcomeMessage(dim = true) {
    if (dim) {
      gameOutcome.classList.add('dim');
    } else {
      gameOutcome.classList.remove('dim');
    }
  }

  /**
   * Rotate symbols in the given slot before stopping at the specified final one
   *
   * This is just a moderately fancy rotation effect to set symbols in a slot.
   * This function loops through all the availale symbols and then stops at the
   * specified goal symbol.
   *
   * @param {number} slotNumber - target slot number
   * @param {number} stopAtSymbol - goal symbol to end the rotation at
   */
  function rotateSymbols(slotNumber, stopAtSymbol) {
    return new Promise((resolve) => {
      let count = 0;
      const timeoutLength = 100;
      const initialTimeoutDelay = timeoutLength * numSymbols * slotNumber;

      function step() {
        setSymbolInSlot(slotNumber, count % numSymbols);
        count += 1;

        if (count < numSymbols) {
          setTimeout(step, timeoutLength);
        } else if (count === numSymbols) {
          // Once all the symbols have been looped through, stop at the
          // specified goal symbol.
          setSymbolInSlot(slotNumber, stopAtSymbol);

          // Once symbols in all the 3 slots have been rotated and stopped,
          // let the caller know that the operations have finished,
          // so that the game setup can be reset for the next game play.
          if ((slotNumber + 1) === numSlots) {
            resolve();
          }
        }
      }

      setTimeout(step, initialTimeoutDelay);
    });
  }

  /**
   * Update all the slots with the symbols provided
   *
   * @param {array} slotValues - array of symbol indices, eg: [1, 0, 4]
   */
  function updateSymbolsInSlots(slotValues) {
    return new Promise((resolve) => {
      slotValues.forEach((symbolIndex, slotNumberIndex) => {
        setSymbolInSlot(slotNumberIndex, symbolIndex);
        rotateSymbols(slotNumberIndex, symbolIndex).then(resolve);
      });
    });
  }


  /**
   * Start the game play
   */
  function play() {
    // Disable play button and dim the previous game outcome
    disablePlayButton();
    dimOutcomeMessage();

    // Using POST so we don't need to worry about the response getting cached
    request('post', '/api/play').then((response) => {
      const data = JSON.parse(response);

      // Update all the slots with the results from the server
      updateSymbolsInSlots(data.slots).then(() => {
        // Enable play button and show game outcome
        disablePlayButton(false);
        showOutcomeStatus(data.win);
        dimOutcomeMessage(false);

        // If the user won a bonus round, play it automatically
        if (data.bonus) {
          showBonusMessage().then(play);
        }
      });
    }).catch(() => {
      // Error with the service call, handle accordingly
    });
  }

  playButton.addEventListener('click', () => {
    play(false);
  });
}());
