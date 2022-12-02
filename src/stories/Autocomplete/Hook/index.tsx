import React, { JSXElementConstructor } from 'react';
import { ComponentStory } from '@storybook/react';
import useCioAutocomplete, { UseCioAutocompleteOptions } from '../../../hooks/useCioAutocomplete';
import { isProduct } from '../../../typeGuards';
import { getStoryParams } from '../../../utils';

export const apiKey = 'key_jaqzPcUDnK66puIO';

export const HooksTemplate: ComponentStory<JSXElementConstructor<UseCioAutocompleteOptions>> =
  function (args) {
    const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
      useCioAutocomplete(args);

    const { onSubmit, ...formProps } = getFormProps();

    return (
      <div className='cio-autocomplete'>
        <form className='cio-form' {...formProps} onSubmit={onSubmit}>
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
                              <img width='100%' src={item.data?.image_url} alt='' />
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

const hooksTemplateCode = `
function YourComponent() {
  const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
    useCioAutocomplete(args);

  const { onSubmit, ...formProps } = getFormProps();

  return (
    <div className='cio-autocomplete'>
      <form className='cio-form' {...formProps} onSubmit={onSubmit}>
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
                            <img width='100%' src={item.data?.image_url} alt='' />
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
`;

export const getHookStoryParams = (storyCode) => getStoryParams(storyCode, hooksTemplateCode);
