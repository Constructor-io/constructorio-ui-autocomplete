import React from 'react'
import { useContext } from 'react';
import { RenderInput } from '../../../types';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';

type SearchInputProps = {
  renderInput: RenderInput;
};

export default function SearchInput(props: SearchInputProps) {
  const { getFormProps, getInputProps, getLabelProps, setQuery } = useContext(CioAutocompleteContext);

  return props.renderInput({ getFormProps, getInputProps, getLabelProps, setQuery });
}

const DefaultRenderInput: RenderInput = ({ getFormProps, getInputProps, getLabelProps, setQuery }) => {
  const inputProps = getInputProps();

  return (
    <form className='cio-form' {...getFormProps()}>
      <label {...getLabelProps()} hidden>
        Search
      </label>
      <input {...inputProps} />
      <button
        className='cio-btn'
        hidden={!inputProps.value}
        onClick={() => {
          setQuery('');
          if(inputProps.id) document.getElementById(inputProps.id)?.focus();
        }}
        type='button'
        aria-label='Clear search field text'>
        <div className='cio-icon'>
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 512 512'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>
          </svg>
        </div>
      </button>
      <button className='cio-btn' disabled={!inputProps.value} type='submit' aria-label='Submit Search'>
        <div className='cio-icon'>
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 512 512'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
          </svg>
        </div>
      </button>
    </form>
  );
};

SearchInput.defaultProps = {
  renderInput: DefaultRenderInput,
};
