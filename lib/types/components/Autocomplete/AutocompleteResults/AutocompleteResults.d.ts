import { ReactNode } from 'react';
import { GetItemProps, SectionConfiguration } from '../../../types';
export type RenderResults = (renderResultsArguments: {
  sections: SectionConfiguration[];
  getItemProps: GetItemProps;
}) => ReactNode;
type AutocompleteResultsProps = {
  children?: RenderResults | ReactNode;
};
export default function AutocompleteResults(props: AutocompleteResultsProps): JSX.Element;
export {};
