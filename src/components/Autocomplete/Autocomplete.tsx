import React from 'react';
import CioAutocomplete from './CioAutocomplete';
import './Autocomplete.css';

export default function Autocomplete() {
  const apiKey = 'key_jaqzPcUDnK66puIO';

  return <CioAutocomplete apiKey={apiKey} sectionOrder={['products', 'searchSuggestions']} />;
}
