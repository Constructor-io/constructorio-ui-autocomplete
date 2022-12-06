import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../components';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import { argTypes } from './argTypes';
import { isProduct } from '../../typeGuards';

export default {
  title: 'Autocomplete/Hook',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof CioAutocomplete>;

export const Hook: ComponentStory<JSXElementConstructor<any>> = function () {
  const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
    useCioAutocomplete({
      apiKey: 'key_jaqzPcUDnK66puIO',
      sectionConfigurations: [
        {
          identifier: 'Search Suggestions'
        },
        {
          identifier: 'Products'
        }
      ],
      onFocus: () => {
        console.log('Focus!');
      },
      onSubmit: (e) => {
        console.log('Item or Query Submitted!');
        console.log(e);
      }
    });

  const { onSubmit, ...formProps } = getFormProps();

  const handleSubmit = (onSubmit) => (e) => {
    const { query }: { query: string } = onSubmit(e);
    console.log(`custom handleSubmit logic here with term: ${query}`);
  };
  return (
    <div className='cio-autocomplete'>
      <form className='cio-form' {...formProps} onSubmit={handleSubmit(onSubmit)}>
        <input {...getInputProps()} />
      </form>
      <div {...getMenuProps()}>
        {isOpen && (
          <div className='cio-results'>
            {sections?.map((section) => (
              <div key={section.identifier}>
                <div className='cio-section'>
                  <div className='cio-sectionName'>{section.identifier}</div>
                  <div className='cio-items'>
                    {section?.data?.map((item, index) => (
                      <div
                        {...getItemProps({
                          item,
                          index,
                          sectionIdentifier: section.identifier
                        })}
                        className='cio-item'
                        key={item.value}>
                        <div>
                          {isProduct(item) && (
                            <img
                              width='100%'
                              src={item.data?.image_url}
                              alt=''
                              data-testid='cio-img'
                            />
                          )}
                          <p>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const HooksZeroState: ComponentStory<JSXElementConstructor<any>> = function () {
  const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
    useCioAutocomplete({
      apiKey: 'key_jaqzPcUDnK66puIO',
      sectionConfigurations: [
        {
          identifier: 'Search Suggestions'
        },
        {
          identifier: 'Products'
        }
      ],
      zeroStateSectionConfigurations: [
        {
          identifier: 'bestsellers',
          displayName: 'Best Selling Products',
          type: 'recommendations'
        }
      ],
      onFocus: () => {
        console.log('Focus!');
      },
      onSubmit: (e) => {
        console.log('Item or Query Submitted!');
        console.log(e);
      }
    });

  const { onSubmit, ...formProps } = getFormProps();

  const handleSubmit = (onSubmit) => (e) => {
    const { query }: { query: string } = onSubmit(e);
    console.log(`custom handleSubmit logic here with term: ${query}`);
  };
  return (
    <div className='cio-autocomplete'>
      <form className='cio-form' {...formProps} onSubmit={handleSubmit(onSubmit)}>
        <input {...getInputProps()} />
      </form>
      <div {...getMenuProps()}>
        {isOpen && (
          <div className='cio-results'>
            {sections?.map((section) => (
              <div key={section.identifier}>
                <div className='cio-section'>
                  <div className='cio-sectionName'>
                    {section?.displayName || section.identifier}
                  </div>
                  <div className='cio-items'>
                    {section?.data?.map((item, index) => (
                      <div
                        {...getItemProps({
                          item,
                          index,
                          sectionIdentifier: section.identifier
                        })}
                        className='cio-item'
                        key={item.value}>
                        <div>
                          {isProduct(item) && (
                            <img
                              width='100%'
                              src={item.data?.image_url}
                              alt=''
                              data-testid='cio-img'
                            />
                          )}
                          <p>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
