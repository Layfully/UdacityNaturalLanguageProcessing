import { getFormData, fetchData } from '../src/client/js/formHandler';

global.fetch = jest.fn();

global.Client = {
    handleTextValidation: jest.fn(),
};

describe('Form handler functions', () => {
    let mockElementName;
    let mockElementResults;

    beforeEach(() => {
        fetch.mockClear();
        Client.handleTextValidation.mockClear();

        mockElementName = { value: 'Test value' };
        mockElementResults = { innerHTML: '' };

        document.getElementById = jest.fn()
            .mockReturnValueOnce(mockElementName)
            .mockReturnValueOnce(mockElementResults);
    });

    it('should get form data', () => {
        const formText = getFormData();

        expect(formText).toEqual(mockElementName.value);
        expect(Client.handleTextValidation).toHaveBeenCalledWith(mockElementName.value);
    });

    it('should fetch data', async () => {
        const mockResponse = Promise.resolve({
            json: () => Promise.resolve({
                subjectivity: 'neutral',
                polarity: 'neutral',
                text: 'test',
            }),
        });

        fetch.mockImplementationOnce(() => mockResponse);

        const response = await fetchData(mockElementName.value);

        expect(fetch).toHaveBeenCalledWith('http://localhost:8081/analyzeText', expect.any(Object));
        expect(response).toEqual({
            subjectivity: 'neutral',
            polarity: 'neutral',
            text: 'test',
        });
    });
});