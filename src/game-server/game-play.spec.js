const {expect} = require('chai');
const {roll} = require('./game-play');

describe('game-play', () => {
  describe('roll()', () => {
    it('should return slot values', () => {
      const result = roll();
      expect(result).to.have.property('win');
      expect(result.slots).to.be.instanceof(Array);
      expect(result.slots).to.have.lengthOf(3);
    });

    it('should return bonus status', () => {
      const result = roll();
      expect(result).to.have.property('bonus');
      expect(result.bonus).to.be.oneOf([true, false]);
    });

    it('should return game outcome string', () => {
      const result = roll();
      const possibleWins = ['no-win', 'small-win', 'big-win'];
      expect(result).to.have.property('win');
      expect(result.win).to.be.oneOf(possibleWins);
    });
  });
});
