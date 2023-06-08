import {horizontalScale, verticalScale, moderateScale} from './metrics';

// Mock the Dimensions module
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  },
}));

describe('React Native Utils', () => {
  describe('horizontalScale', () => {
    it('should return the correctly horizontal scaled value', () => {
      const size = 100;
      const expected = 100;
      const result = horizontalScale(size);
      expect(result).toBe(expected);
    });
  });

  describe('verticalScale', () => {
    it('should return the correctly vertical scaled value', () => {
      const size = 100;
      const expected = 100;
      const result = verticalScale(size);
      expect(result).toBe(expected);
    });
  });

  describe('moderateScale', () => {
    it('should return the correctly moderate scaled value', () => {
      const size = 100;
      const factor = 0.5;
      const expected = 100;
      const result = moderateScale(size, factor);
      expect(result).toBe(expected);
    });
  });
});
