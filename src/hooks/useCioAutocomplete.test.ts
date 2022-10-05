import {renderHook} from '@testing-library/react'
import useCioAutocomplete from './useCioAutocomplete'

test('useCioAutocomplete hook default values are correct', () => {
  const { result: { current: { isOpen, cioClient, query, sections, sectionOrder } }} = renderHook(() => useCioAutocomplete({
    sectionOrder: ['Search Suggestions', 'Products', 'Content'],
    apiKey: 'abc',
    placeholder: 'Type here...',
  }))
  expect(isOpen).toBe(false)
  expect(cioClient).toBeDefined()
  expect(query).toBe("")
  expect(sections).toMatchObject({})
  expect(sectionOrder).toMatchObject(['Search Suggestions', 'Products', 'Content'])
})

test('useCioAutocomplete hook default values are correct', () => {
  const { result: { current: { isOpen, cioClient, query, sections, sectionOrder, setQuery } }} = renderHook(() => useCioAutocomplete({
    sectionOrder: ['Search Suggestions', 'Products', 'Content'],
    apiKey: 'abc',
    placeholder: 'Type here...',
    onChange: () => {
      setQuery('')
    },
  }))
  
  expect(isOpen).toBe(false)
  expect(cioClient).toBeDefined()
  expect(query).toBe("")
  expect(sections).toMatchObject({})
  expect(sectionOrder).toMatchObject(['Search Suggestions', 'Products', 'Content'])
})


