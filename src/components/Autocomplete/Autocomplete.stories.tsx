import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CioAutocomplete from './CioAutocomplete';
import { CioAutocompleteProps } from '../../types';
import SearchInput from './SearchInput';
import AutocompleteResults from './AutocompleteResults';
import SectionItemsList from './SectionItemsList';
import SectionItem from './SectionItem';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
const apiKey = 'key_jaqzPcUDnK66puIO';

export default {
  title: 'Example/CioAutocomplete',
  component: CioAutocomplete,
  argTypes: {
    apiKey: { 
      description: 'Constructor.io API key.',
      table: {
        type: { summary: "string" },
      },
    },
    onSubmit: { 
      table: {
        type: { summary: "function" },
      },
    },
    onFocus: { 
      table: {
        type: { summary: "function" },
      },
    },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CioAutocomplete>;

const Template: ComponentStory<typeof CioAutocomplete> = (args: CioAutocompleteProps) => <CioAutocomplete {...args} />;

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
                  <div {...getItemProps({ item, index, sectionName: 'searchSuggestions'})} className='cio-item'>
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

const onSubmit = () => {
  console.log('Input is in focus')
}
const onFocus = () => {
  console.log('Input is in focus')
}

export const Primary = Template.bind({
  
});
Primary.args = {
  apiKey,
  onFocus: onFocus,
  onSubmit: onSubmit
};

export const CustomRenderInput = Template.bind({});
const handleSubmit = (onSubmit) => (e) => {
  const { query } = onSubmit(e);
  console.log(`custom handleSubmit logic here with term: ${query}`);
};

CustomRenderInput.args = {
  apiKey,
  renderInput: ({ getFormProps, getInputProps, getLabelProps }) => {
    const { onSubmit, ...formProps } = getFormProps();
    return (
      <form {...formProps} onSubmit={handleSubmit(onSubmit)} style={{ height: 50, width: 600 }}>
        <label {...getLabelProps()} hidden>
          Search Products
        </label>
        <input {...getInputProps()} style={{ borderRadius: 10, padding: 10, height: 30, fontSize: '1.5rem' }} />
      </form>
    );
  }
};

export const CustomRenderProps = Template.bind({});
CustomRenderProps.args = {
  apiKey,
  sectionOrder: ["products", "searchSuggestions"],
  children: [
    <SearchInput />,
    <AutocompleteResults>
        <>
          <SectionItemsList sectionName='products' />
          <SectionItemsList
            sectionName='searchSuggestions'
          >
            {({ sectionName, sectionItems }) => (
              <div>
                <h5 className='cio-sectionName'>Search Suggestions</h5>
                <div>
                  {sectionItems?.map((item, index) => (
                    <SectionItem item={item} index={index} sectionName={'searchSuggestions'}>
                      <div>
                        {item.value}
                      </div>
                    </SectionItem>
                  ))}
                </div>
              </div>
            )}
          </SectionItemsList>
        </>
    </AutocompleteResults>
  ]
};

export const HooksExample = HooksTemplate.bind({});