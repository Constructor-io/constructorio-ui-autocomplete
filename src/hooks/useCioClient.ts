import { useMemo } from 'react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { Nullable } from '@constructor-io/constructorio-client-javascript/lib/types';
import { getCioClient } from '../utils/helpers';
import { CioClientConfig } from '../types';

type UseCioClient = (cioClientConfig: CioClientConfig) => Nullable<ConstructorIOClient>;

const useCioClient: UseCioClient = ({
  apiKey,
  cioJsClient,
  cioClientOptions,
  cioJsClientOptions,
}) => {
  if (!apiKey && !cioJsClient) {
    // eslint-disable-next-line no-console
    console.error('Either apiKey or cioJsClient is required');
  }

  const mergedClientOptions = cioClientOptions ?? cioJsClientOptions;

  return useMemo(
    () => cioJsClient || getCioClient(apiKey, mergedClientOptions),
    [apiKey, cioJsClient, mergedClientOptions]
  );
};

export default useCioClient;
