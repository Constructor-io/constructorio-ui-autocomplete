import React, { JSXElementConstructor } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CioAutocomplete } from '../../components';
import useCioAutocomplete from '../../hooks/useCioAutocomplete';
import useFetchRecommendationPod from '../../hooks/useFetchRecommendationPod';
import { argTypes } from './argTypes';
import { useEffect, useState } from 'react';
import useCioClient from '../../hooks/useCioClient';
import { AutocompleteResultSections } from '../../types';
import { isProduct } from '../../typeGuards';

export default {
  title: 'Autocomplete/Recommendations/WithRecPod',
  // component: CioAutocomplete,
  argTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CioAutocomplete>;

const useRecPods = (cioClient, recPods) => {
  const [recommendations, setRecommendations] = useState<AutocompleteResultSections>();
  const [recPodDisplayNames, setRecPodDisplayNames] = useState({});

  useEffect(() => {
    if (!cioClient) return;

    Promise.all(
      recPods.map((recPod) => cioClient.recommendations.getRecommendations(recPod.podId, { section: recPod.section })),
    ).then((responses) => {
      const resultsByPodId: AutocompleteResultSections = {};
      const recPodDisplayNamesById = {};
      responses.forEach((response) => {
        resultsByPodId[response.response.pod.id] = response?.response?.results;
        recPodDisplayNamesById[response.response.pod.id] = response.response.pod.display_name;
      });
      setRecommendations(resultsByPodId);
      setRecPodDisplayNames(recPodDisplayNamesById);
    }).catch((e) => {
        console.log(e)
    });
  }, [cioClient, recPods]);

  return { recommendations, recPodDisplayNames };
};
  
const RecommendationPod = ({ podId, displayName, results, getItemProps }) => {
  return (
    <li>
      <h3>{displayName}</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {results?.map((item, index) => (
          <li key={item.data.id} {...getItemProps({ item, index, sectionName: podId })}>
            {item.value}
          </li>
        ))}
      </ul>
    </li>
  );
};

const querySuggestionSections = ['Search Suggestions', 'Brands', 'Categories', 'Products'];
const apiKey = 'key_afiSr5Y4gCaaSW5X'

const RecommendationsTemplate: ComponentStory<JSXElementConstructor<any>> = function () {
  const cioClient = useCioClient({ apiKey });
  const { isOpen, sections, getFormProps, getInputProps, getMenuProps, getItemProps } =
    useCioAutocomplete({
      cioJsClient: cioClient,
      openOnFocus: true,
      onSubmit: (e) => {
        console.log('Item or Query Submitted!');
        console.log(e);
      },
    });

  const inputProps = getInputProps();

  let content;

  const renderQuerySuggestions = isOpen && Object.values(sections).some((items) => items?.length);

  if (renderQuerySuggestions) {
    content = (
      <>
        <div>
          {querySuggestionSections
            .filter((sectionName) => sectionName !== 'Products')
            .map((sectionName) => (
              <li key={sectionName}>
                <h3>{sectionName}</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {sections?.[sectionName]?.map((item, index) => (
                    <li key={item.data.id} {...getItemProps({ item, index, sectionName })}>
                      {item.value}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </div>
        <div>
          <li style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {sections?.['Products']?.map((item, index) => (
                <li
                  key={item.data.id}
                  {...getItemProps({
                    item,
                    index,
                    sectionName: 'Products',
                  })}
                  style={{ display: 'inline-flex', maxWidth: '30%' }}>
                  <div>
                    { isProduct(item) && <img width='100%' src={item.data?.image_url} alt='' /> }
                    <p style={{ textOverflow: 'ellipsis', maxWidth: 50, fontSize: 'small' }}>{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </div>
        <RecommendationPod
          key='trending_brands'
          podId='trending_brands'
          displayName={recPodDisplayNames['trending_brands']}
          results={recommendations?.['trending_brands']}
          getItemProps={getItemProps}
          />
        </>
    );
  }  else {
    content = <h3> No Results </h3>;
  }

  return (
    <div>
      <form {...getFormProps()} style={{ display: 'flex' }}>
        <input {...inputProps} style={{ width: '50%' }} />
      </form>
      <ul
        style={{
          display: isOpen ? 'flex' : 'none',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: '10px',
          flexDirection: 'row',
          border: '1px solid gray',
        }}
        {...getMenuProps()}>
        {isOpen && content}
      </ul>
    </div>
  );
}

export const Recommendations = RecommendationsTemplate.bind({});
