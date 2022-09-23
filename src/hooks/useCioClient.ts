/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { CioClient, CioClientOptions } from '../types';

type UseCioClient = (cioClientOptions: CioClientOptions) => CioClient | null | undefined;

const useCioClient: UseCioClient = ({ apiKey, cioJsClient }) => {
  const [cioClient, setCioClient] = useState(cioJsClient);

  useEffect(() => {
    if (apiKey && !cioJsClient) {
      const client: CioClient = new ConstructorIOClient({
        apiKey: apiKey,
        sendTrackingEvents: true,
        queryParams: {
          autocomplete_key: apiKey,
        },
        identityModuleOptions: {
          cookie_domain: '',
        },
      });

      setCioClient(client);
    } else if (cioJsClient) {
      setCioClient(cioJsClient);
    }
  }, [apiKey, cioJsClient]);

  return cioClient;
};

export default useCioClient;
