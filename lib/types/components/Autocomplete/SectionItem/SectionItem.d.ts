import { ReactNode } from 'react';
import { Item } from '../../../types';
export interface SectionItemProps {
  item: Item;
  index: number;
  sectionIdentifier: string;
  children?: ReactNode;
  key?: string;
}
export default function SectionItem(props: SectionItemProps): JSX.Element;
