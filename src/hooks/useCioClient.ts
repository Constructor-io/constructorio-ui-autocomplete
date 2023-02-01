import { useEffect, useState } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';

export type CioClientConfig = { apiKey?: string; cioJsClient?: ConstructorIOClient };

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

type UseCioClient = (cioClientConfig: CioClientConfig) => ConstructorIOClient | undefined;

const useCioClient: UseCioClient = ({ apiKey, cioJsClient }) => {
  const [cioClient, setCioClient] = useState(cioJsClient);

  useEffect(() => {
    if (apiKey && !cioJsClient) {
      const client = new ConstructorIOClient({
        apiKey,
        sendTrackingEvents: true,
      });

      setCioClient(client);
    } else if (cioJsClient) {
      setCioClient(cioJsClient);
    }
  }, [apiKey, cioJsClient]);

  return cioClient;
};

export default useCioClient;
