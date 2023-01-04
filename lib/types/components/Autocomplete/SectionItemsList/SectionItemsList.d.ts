import React, { ReactElement } from 'react';
import { SectionConfiguration } from '../../../types';
export type RenderSectionItemsList = (renderResultsArguments: {
  section: SectionConfiguration;
}) => ReactElement;
type SectionItemsListProps = {
  section: SectionConfiguration;
  children?: RenderSectionItemsList;
  key?: string;
};
export default function SectionItemsList(
  props: SectionItemsListProps
): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
