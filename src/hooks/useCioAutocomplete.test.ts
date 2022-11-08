import { renderHook } from '@testing-library/react';
import useCioAutocomplete from './useCioAutocomplete';

test('useCioAutocomplete hook default values are correct', () => {
  const {
    result: {
      current: { isOpen, cioClient, query, sections }
    }
  } = renderHook(() =>
    useCioAutocomplete({
      apiKey: 'abc',
      placeholder: 'Type here...',
      sectionConfigurations: []
    })
  );
  expect(isOpen).toBe(false);
  expect(cioClient).toBeDefined();
  expect(query).toBe('');
  expect(sections).toMatchObject({});
});
