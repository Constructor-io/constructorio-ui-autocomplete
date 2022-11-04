import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../components';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { argTypes } from './argTypes';
import { isProduct } from '../../typeGuards';

export default {
  title: 'Autocomplete/Kmart AU',
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
      sectionOrder: ['Search Suggestions', 'Products', 'genres', 'subjects'],
      apiKey: 't3d3i2_teachables_qa',
      onFocus: () => {
        console.log('Focus!');
      },
      onSubmit: (e) => {
        console.log('Item or Query Submitted!');
        console.log(e);
      },
      resultsPerSection: { products: 3 },
      placeholder: 'Search by keyword',
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
            {(!!sections?.['genres']?.length || !!sections?.['subjects']?.length)  && <div className='cio-section'>
              <div className='cio-items'>
                {sections?.['genres']?.map((item, index) => (
                  <div {...getItemProps({ item, index, sectionName: 'genres' })} className='cio-item'>
                    {item.value + ' (Genre)'}
                  </div>
                ))}
                {sections?.['subjects']?.map((item, index) => (
                  <div {...getItemProps({ item, index, sectionName: 'subjects' })} className='cio-item'>
                    {item.value + ' (Subject)'}
                  </div>
                ))}
              </div>
            </div> }
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
                      sectionName: 'Products',
                    })}
                    className='cio-item'
                  >
                    <div>
                      {isProduct(item) && <img width='100%' src={`https://teachables.scholastic.com${item.data?.image_url}`} alt='' />}
                      <p>{item.value}</p>
                    </div>
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