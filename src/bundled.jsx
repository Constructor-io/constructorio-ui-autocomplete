/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CioAutocompleteComponent from './components/Autocomplete/CioAutocomplete/CioAutocomplete';
import { shopifyDefaults } from './utils/shopifyDefaults';
import './styles.css';

const CioAutocomplete = ({ selector, includeCSS = true, useShopifyDefaults, ...rest }) => {
  if (document) {
    const stylesheet = document.getElementById('cio-autocomplete-styles');
    const containerSelector = selector || (useShopifyDefaults ? shopifyDefaults.selector : undefined);
    const containerElement = containerSelector ? document.querySelector(containerSelector) : null;

    if (!containerElement) {
      // eslint-disable-next-line no-console
      console.error(`CioAutocomplete: There were no elements found for the provided selector`);

      return;
    }

    if (stylesheet) {
      if (!includeCSS) {
        stylesheet.disabled = true;
      } else {
        stylesheet.disabled = false;
      }
    }

    ReactDOM.createRoot(containerElement).render(
      <React.StrictMode>
        <CioAutocompleteComponent {...rest} />
      </React.StrictMode>
    );
  }
};

if (window) {
  window.CioAutocomplete = CioAutocomplete;
}

export default CioAutocomplete;
