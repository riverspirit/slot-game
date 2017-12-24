import request from './request';

(function init() {
  const allSymbolClasses = ['symbol-0', 'symbol-1', 'symbol-2', 'symbol-3', 'symbol-4', 'symbol-5'];
  const numSymbols = allSymbolClasses.length;
  const numSlots = 3;
  const $element = document.querySelector.bind(document);
  const playButton = $element('#play-button');
  const gameOutcome = $element('#outcome');
  const bonusRoundMessage = $element('#bonus-round');

  function disabledPlayButton(disable = true) {
    if (disable) {
      playButton.classList.add('rotate');
      playButton.setAttribute('disabled', 'disabled');
    } else {
      playButton.classList.remove('rotate');
      playButton.removeAttribute('disabled');
    }
  }

  function setSymbolInSlot(slot, symbolIndex) {
    slot.classList.remove(...allSymbolClasses);
    slot.classList.add(`symbol-${symbolIndex}`);
  }

  function showOutcomeStatus(win) {
    const strings = {
      'no-win': 'No Win',
      'small-win': 'Small Win',
      'big-win': 'Big Win!',
    };

    gameOutcome.classList.remove('hide');
    gameOutcome.textContent = strings[win];
  }

  function showBonusMessage() {
    return new Promise((resolve) => {
      bonusRoundMessage.classList.remove('hide');

      setTimeout(() => {
        bonusRoundMessage.classList.add('hide');
        resolve();
      }, 2000);
    });
  }

  function dimOutcomeMessage(dim = true) {
    if (dim) {
      gameOutcome.classList.add('dim');
    } else {
      gameOutcome.classList.remove('dim');
    }
  }

  function rotateSymbols(slotNumber, stopAtSymbol) {
    return new Promise((resolve) => {
      const slot = $element(`#slot-${slotNumber}`);
      let count = 0;
      const timeoutLength = 100;
      const initialTimeoutDelay = timeoutLength * numSymbols * slotNumber;

      function step() {
        setSymbolInSlot(slot, count % numSymbols);
        count += 1;

        if (count < numSymbols) {
          setTimeout(step, timeoutLength);
        } else if (count === numSymbols) {
          setSymbolInSlot(slot, stopAtSymbol);

          if ((slotNumber + 1) === numSlots) {
            disabledPlayButton(false);
            resolve();
          }
        }
      }

      setTimeout(step, initialTimeoutDelay);
    });
  }

  function updateSymbolsClasses(slotValues) {
    return new Promise((resolve) => {
      slotValues.forEach((value, i) => {
        const slot = $element(`#slot-${i}`);
        slot.classList.remove(...allSymbolClasses);
        slot.classList.add(`symbol-${value}`);
        rotateSymbols(i, value).then(resolve);
      });
    });
  }


  function play() {
    disabledPlayButton();
    dimOutcomeMessage();

    request('post', '/api/play').then((response) => {
      const data = JSON.parse(response);
      updateSymbolsClasses(data.slots).then(() => {
        showOutcomeStatus(data.win);
        dimOutcomeMessage(false);

        if (data.bonus) {
          showBonusMessage().then(play);
        }
      });
    }).catch(() => {});
  }

  playButton.addEventListener('click', () => {
    play(false);
  });
}());
