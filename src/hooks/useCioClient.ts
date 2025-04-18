import { useMemo } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { getCioClient } from '../utils/helpers';
import { CioClientConfig } from '../types';

type UseCioClient = (cioClientConfig: CioClientConfig) => Nullable<ConstructorIOClient>;

const useCioClient: UseCioClient = ({ apiKey, cioJsClient, cioJsClientOptions }) => {
  if (!apiKey && !cioJsClient) {
    // eslint-disable-next-line no-console
    console.error('Either apiKey or cioJsClient is required');
  }

  return useMemo(
    () => cioJsClient || getCioClient(apiKey, cioJsClientOptions),
    [apiKey, cioJsClient, cioJsClientOptions]
  );
};

export default useCioClient;
