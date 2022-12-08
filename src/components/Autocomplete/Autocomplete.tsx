import React from 'react';
import CioAutocomplete from './CioAutocomplete';
import './Autocomplete.css';
import { SectionConfiguration } from '../../types';

export default function Autocomplete() {
  const apiKey = 'key_jaqzPcUDnK66puIO';
  const sections = [
    {
      identifier: 'Products',
      type: 'autocomplete'
    },
    {
      identifier: 'Search Suggestions',
      type: 'autocomplete'
    }
  ] as SectionConfiguration[];

  return <CioAutocomplete apiKey={apiKey} sections={sections} />;
}
