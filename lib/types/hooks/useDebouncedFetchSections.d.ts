import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import { AutocompleteResultSections, SectionConfiguration } from '../types';
declare const useDebouncedFetchSection: (
  query: string,
  cioClient?: ConstructorIOClient,
  autocompleteSections?: SectionConfiguration[]
) => AutocompleteResultSections;
export default useDebouncedFetchSection;
