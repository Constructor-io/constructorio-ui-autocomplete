/* eslint-disable import/prefer-default-export */
import ConstructorIO from '@constructor-io/constructorio-client-javascript';
import { apiKey as DEMO_API_KEY } from '../src/constants';
import apiAutocompleteResponse from './local_examples/apiAutocompleteResponse.json';
import apiRecommendationsResponse from './local_examples/apiRecommendationsResponse.json';

// ConstructorIO Client Mock
class MockConstructorIO extends ConstructorIO {
  autocomplete = {
    getAutocompleteResults: jest.fn().mockResolvedValue(apiAutocompleteResponse),
  } as any;

  recommendations = {
    getRecommendations: jest.fn().mockResolvedValue(apiRecommendationsResponse),
  } as any;

  // Override other methods as needed
}

const mockConstructorIOClient =
  typeof window !== 'undefined' ? new MockConstructorIO({ apiKey: DEMO_API_KEY }) : null;

jest.mock('../src/hooks/useCioClient', () => ({
  __esModule: true,
  default: () => (() => mockConstructorIOClient)(),
}));

export { mockConstructorIOClient };
