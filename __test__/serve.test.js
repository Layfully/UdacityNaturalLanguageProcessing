const { parsePolarity, analyzeText} = require('../src/server');
const fetch = require('node-fetch');

describe('Test parsePolarity function', () => {
  it('should map sentiment values correctly', () => {
    expect(parsePolarity("P+")).toEqual("strong positive");
    expect(parsePolarity("P")).toEqual("positive");
    expect(parsePolarity("NEU")).toEqual("neutral");
    expect(parsePolarity("N")).toEqual("negative");
    expect(parsePolarity("N+")).toEqual("strong negative");
    expect(parsePolarity("NONE")).toEqual("without polarity");
  });
});

jest.mock('node-fetch');

describe('Test analyzeText function', () => {
  it('should fetch sentiment analysis data and respond with parsed data', async () => {
    const mockReq = { body: { text: 'test text' } };
    const mockRes = { send: jest.fn() };
    const mockJsonPromise = Promise.resolve({
      subjectivity: 'neutral',
      score_tag: 'NEU',
      sentence_list: []
    });
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockJsonPromise,
    });
    fetch.mockImplementation(() => mockFetchPromise);

    await analyzeText(mockReq, mockRes);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockRes.send).toHaveBeenCalledWith({
      subjectivity: 'neutral',
      polarity: 'neutral',
      text: 'test text',
    });
  });
});