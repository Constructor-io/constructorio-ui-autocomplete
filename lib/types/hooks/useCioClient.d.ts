import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
export type CioClientConfig = {
  apiKey?: string;
  cioJsClient?: ConstructorIOClient;
};
export type TrackSearchSubmit = (
  term: string,
  parameters: {
    original_query: string;
  }
) => true | Error;
export type TrackAutocompleteSelect = (
  term: string,
  parameters: {
    original_query: string;
    section: string;
  }
) => true | Error;
type UseCioClient = (cioClientConfig: CioClientConfig) => ConstructorIOClient | undefined;
declare const useCioClient: UseCioClient;
export default useCioClient;
