import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../components';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { argTypes } from './argTypes';
import { isProduct } from '../../typeGuards';

export default {
  title: 'Autocomplete/With Hooks',
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
    apiKey: 'key_jaqzPcUDnK66puIO',
    sectionConfigurations: [
      {
        identifier: 'Search Suggestions',
      },
      {
        identifier: 'Products',
      },
    ],
    onFocus: () => {
      console.log('Focus!');
    },
    onSubmit: (e) => {
      console.log('Item or Query Submitted!');
      console.log(e);
    },
  });

  const { onSubmit, ...formProps } = getFormProps();

  const handleSubmit = (onSubmit) => (e) => {
    const { query }: {query: string} = onSubmit(e);
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
            { !!sections?.['Products']?.length && <div className='cio-section'>
              <div className='cio-sectionName'>
                Products
              </div>
              <div className='cio-items'>
                {sections?.['Products']?.map((item, index) => (
                  <div
                    {...getItemProps({
                      item,
                      index,
                      sectionIdentifier: 'Products',
                    })}
                    className='cio-item'
                  >
                    <div>
                      {isProduct(item) && <img width='100%' src={item.data?.image_url} alt='' />}
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> }
            { !!sections?.['Search Suggestions']?.length && <div className='cio-section'>
              <div className='cio-sectionName'>
                Search Suggestions
              </div>
              <div className='cio-items'>
                {sections?.['Search Suggestions']?.map((item, index) => (
                  <div {...getItemProps({ item, index, sectionIdentifier: 'Search Suggestions' })} className='cio-item'>
                    {item.value}
                  </div>
                ))}
              </div>
            </div> }
          </div>
        )}
      </div>
    </div>
  );
}

export const HooksExample = HooksTemplate.bind({});
