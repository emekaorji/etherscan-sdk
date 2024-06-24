import { EtherScan } from '../src/client';

test('Should throw an error if API Key is not specified', () => {
  expect(() => {
    // @ts-ignore
    new EtherScan({});
  }).toThrow('API key is required');
});
