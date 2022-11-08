import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { AutocompleteApiResponse, RecommendationsApiResponse } from '../types';

export type CioClientOptions = { apiKey?: string; cioJsClient?: CioClient };

// https://constructor-io.github.io/constructorio-client-javascript/module-tracker.html#~trackSearchSubmit
export type TrackSearchSubmit = (
  term: string,
  parameters: {
    original_query: string;
  }
) => true | Error;

// https://constructor-io.github.io/constructorio-client-javascript/module-tracker.html#~trackAutocompleteSelect
export type TrackAutocompleteSelect = (
  term: string,
  parameters: {
    original_query: string;
    section: string;
  }
) => true | Error;

export interface CioClient {
  autocomplete: {
    getAutocompleteResults: (term: string, options) => Promise<AutocompleteApiResponse>;
  };
  tracker: {
    trackInputFocus: () => true | Error;
    trackSearchSubmit: TrackSearchSubmit;
    trackAutocompleteSelect: TrackAutocompleteSelect;
  };
  recommendations: {
    getRecommendations: (podId: string, parameters: any) => Promise<RecommendationsApiResponse>; // any for now, we will import this from client js
  };
}

type UseCioClient = (cioClientOptions: CioClientOptions) => CioClient;

const useCioClient: UseCioClient = ({ apiKey, cioJsClient }) => {
  const [cioClient, setCioClient] = useState(cioJsClient);

  useEffect(() => {
    if (apiKey && !cioJsClient) {
      const client: CioClient = new ConstructorIOClient({
        apiKey: apiKey,
        sendTrackingEvents: true,
        queryParams: {
          autocomplete_key: apiKey
        },
        identityModuleOptions: {
          cookie_domain: ''
        }
      });

      setCioClient(client);
    } else if (cioJsClient) {
      setCioClient(cioJsClient);
    }
  }, [apiKey, cioJsClient]);

  return cioClient!;
};

export default useCioClient;
