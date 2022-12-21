import React, { JSXElementConstructor } from 'react';
import { ComponentStory } from '@storybook/react';
import useCioAutocomplete, { UseCioAutocompleteOptions } from '../../../hooks/useCioAutocomplete';
import { isProduct } from '../../../typeGuards';
import { getStoryParams } from '../../../utils';

export const apiKey = 'key_jaqzPcUDnK66puIO';

export const HooksTemplate: ComponentStory<JSXElementConstructor<UseCioAutocompleteOptions>> =
  function (args) {
    const {
      isOpen,
      sections,
      getFormProps,
      getLabelProps,
      getInputProps,
      getMenuProps,
      getItemProps
    } = useCioAutocomplete(args);

    return (
      <div className='cio-autocomplete'>
        <form {...getFormProps()}>
          <label {...getLabelProps()} hidden>
            Search
          </label>
          <input {...getInputProps()} />
        </form>
        <div {...getMenuProps()}>
          {isOpen && (
            <>
              {sections?.map((section) => (
                <div key={section.identifier} className={section.identifier}>
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
                          key={item?.data?.id}>
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
            </>
          )}
        </div>
      </div>
    );
  };

const hooksTemplateCode = `
function YourComponent() {
  const {
    isOpen,
    sections,
    getFormProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps
  } = useCioAutocomplete(args);

  return (
    <div className='cio-autocomplete'>
      <form {...getFormProps()}>
        <label {...getLabelProps()} hidden>
          Search
        </label>
        <input {...getInputProps()} />
      </form>
      <div {...getMenuProps()}>
        {isOpen && (
          <>
            {sections?.map((section) => (
              <div key={section.identifier} className={section.identifier}>
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
                        key={item?.data?.id}>
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
          </>
        )}
      </div>
    </div>
  );
};
`;

const importHook = `import { useCioAutocomplete } from 'cio-autocomplete-ts';`;

export const getHookStoryParams = (storyCode) =>
  getStoryParams(storyCode, hooksTemplateCode, importHook);

export const addHookStoryCode = (story, code, description = '') => {
  story.parameters = getHookStoryParams(code);
  story.parameters.docs.description = {
    story: `
${description}

\`\`\`jsx
${code}
\`\`\``
  };
};
