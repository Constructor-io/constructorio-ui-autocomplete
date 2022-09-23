import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../components';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { argTypes } from './argTypes';

export default {
  title: 'Example/CioAutocomplete With Hooks',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CioAutocomplete>;

const HooksTemplate: ComponentStory<JSXElementConstructor<any>> = function () {
  const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
    useCioAutocomplete({
      sectionOrder: ['products', 'searchSuggestions'],
      apiKey: 'key_jaqzPcUDnK66puIO',
      onFocus: () => {
        console.log('Focus!');
      },
      onSubmit: (e) => {
        console.log('Item or Query Submitted!');
        console.log(e);
      },
      resultsPerSection: { products: 3 },
    });

  const { onSubmit, ...formProps } = getFormProps();

  const handleSubmit = (onSubmit) => (e) => {
    const { query } = onSubmit(e);
    console.log(`custom handleSubmit logic here with term: ${query}`);
  };
  return (
    <div className='cio-autocomplete'>
      <form className='cio-form' {...formProps} onSubmit={handleSubmit(onSubmit)}>
        <input {...getInputProps()} />
      </form>
      <div
        {...getMenuProps()}>
        {isOpen && (
          <div className='cio-results'>
            <div className='cio-section'>
              <div className='cio-sectionName'>
                Products
              </div>
              <div className='cio-items'>
                {sections?.products?.map((item, index) => (
                  <div
                    {...getItemProps({
                      item,
                      index,
                      sectionName: 'products',
                    })}
                    className='cio-item'
                  >
                    <div>
                      <img width='100%' src={item.data?.image_url} alt='' />
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='cio-section'>
              <div className='cio-sectionName'>
                Search Suggestions
              </div>
              <div className='cio-items'>
                {sections?.searchSuggestions?.map((item, index) => (
                  <div {...getItemProps({ item, index, sectionName: 'searchSuggestions' })} className='cio-item'>
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const HooksExample = HooksTemplate.bind({});