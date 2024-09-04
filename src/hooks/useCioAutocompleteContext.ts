import { useContext } from 'react';
import { CioAutocompleteContext } from '../components/Autocomplete/CioAutocompleteProvider';

const useCioAutocompleteContext = () => {
  const contextObject = useContext(CioAutocompleteContext);
  return contextObject;
};

export default useCioAutocompleteContext;
