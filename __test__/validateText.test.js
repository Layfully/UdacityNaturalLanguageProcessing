import { validateText, handleTextValidation } from '../src/client/js/validateText';

describe('Text Validation Tests', () => {

  describe('validateText', () => {

    it('should return false if inputText is not a string', () => {
      expect(validateText(123)).toBe(false);
      expect(validateText(true)).toBe(false);
      expect(validateText(null)).toBe(false);
      expect(validateText(undefined)).toBe(false);
      expect(validateText({})).toBe(false);
      expect(validateText([])).toBe(false);
    });

    it('should return false if inputText is an empty string', () => {
      expect(validateText('')).toBe(false);
    });

    it('should return true if inputText is a non-empty string', () => {
      expect(validateText('hello')).toBe(true);
    });
  });

  describe('handleTextValidation', () => {
    const mockElement = {
      innerText: '',
    };

    beforeEach(() => {
        document.getElementById = jest.fn().mockReturnValue(mockElement);
    });

    it('should set validation text if input is invalid', () => {
      handleTextValidation('');
      expect(mockElement.innerText).toBe("Text can't be empty");
    });

    it('should clear validation text if input is valid', () => {
      mockElement.innerText = "Text can't be empty";
      handleTextValidation('hello');
      expect(mockElement.innerText).toBe("");
    });
  });
});