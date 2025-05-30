import React from 'react';
import { CioAutocomplete } from '../../../index';
import { argTypes } from '../argTypes';
import { stringifyWithDefaults } from '../../../utils/format';
import {
  contentDescription,
  customSectionDescription,
  numResultsDescription,
  productsDescription,
  recommendationsDescription,
  searchSuggestionsDescription,
  sectionOrderDescription,
  sectionsDescription,
  apiKey,
  onSubmitDefault as onSubmit,
  displaySearchTermHighlightsDescription,
  displayNoResultsMessageDescription,
  customRenderItemDescription,
} from '../../../constants';
import { ComponentTemplate, getComponentStoryParams, addComponentStoryDescription } from '.';

export default {
  title: 'Autocomplete/Component/Sections',
  component: CioAutocomplete,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: sectionsDescription,
      },
    },
  },
};

export const Default = ComponentTemplate.bind({});
Default.args = { apiKey, onSubmit };
Default.parameters = getComponentStoryParams(`const args = ${stringifyWithDefaults(Default.args)}`);

export const RenderSearchSuggestions = ComponentTemplate.bind({});
RenderSearchSuggestions.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
    },
  ],
};
addComponentStoryDescription(
  RenderSearchSuggestions,
  `const args = ${stringifyWithDefaults(RenderSearchSuggestions.args)}`,
  searchSuggestionsDescription
);

export const RenderSuggestedProducts = ComponentTemplate.bind({});
RenderSuggestedProducts.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Products',
    },
  ],
};
addComponentStoryDescription(
  RenderSuggestedProducts,
  `const args = ${stringifyWithDefaults(RenderSuggestedProducts.args)}`,
  productsDescription
);

export const RenderSuggestedContent = ComponentTemplate.bind({});
RenderSuggestedContent.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Content',
    },
  ],
};
addComponentStoryDescription(
  RenderSuggestedContent,
  `const args = ${stringifyWithDefaults(RenderSuggestedContent.args)}`,
  contentDescription
);

export const ConfigureNumberOfResultsPerSection = ComponentTemplate.bind({});
ConfigureNumberOfResultsPerSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Products',
      numResults: 2,
    },
  ],
};
addComponentStoryDescription(
  ConfigureNumberOfResultsPerSection,
  `const args = ${stringifyWithDefaults(ConfigureNumberOfResultsPerSection.args)}`,
  numResultsDescription
);

export const ConfigureOrderOfRenderedSections = ComponentTemplate.bind({});
ConfigureOrderOfRenderedSections.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Products',
    },
    {
      indexSectionName: 'Search Suggestions',
    },
  ],
};
addComponentStoryDescription(
  ConfigureOrderOfRenderedSections,
  `const args = ${stringifyWithDefaults(ConfigureOrderOfRenderedSections.args)}`,
  sectionOrderDescription
);

export const RenderRecommendations = ComponentTemplate.bind({});
RenderRecommendations.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
    },
    {
      indexSectionName: 'Products',
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
      numResults: 4,
    },
  ],
};
addComponentStoryDescription(
  RenderRecommendations,
  `const args = ${stringifyWithDefaults(RenderRecommendations.args)}`,
  recommendationsDescription
);

export const DisplaySearchTermHighlights = ComponentTemplate.bind({});
DisplaySearchTermHighlights.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
      displaySearchTermHighlights: true,
    },
    {
      indexSectionName: 'Products',
      displaySearchTermHighlights: true,
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
      displaySearchTermHighlights: true,
    },
  ],
};
addComponentStoryDescription(
  DisplaySearchTermHighlights,
  `const args = ${stringifyWithDefaults(DisplaySearchTermHighlights.args)}`,
  displaySearchTermHighlightsDescription
);

export const DisplayNoResultsMessage = ComponentTemplate.bind({});
DisplayNoResultsMessage.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
      displayNoResultsMessage: true,
    },
    {
      indexSectionName: 'Products',
      displayNoResultsMessage: true,
    },
    {
      podId: 'bestsellers',
      type: 'recommendations',
    },
  ],
};
addComponentStoryDescription(
  DisplayNoResultsMessage,
  `const args = ${stringifyWithDefaults(DisplayNoResultsMessage.args)}`,
  displayNoResultsMessageDescription
);

export const RenderCustomSection = ComponentTemplate.bind({});
RenderCustomSection.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Search Suggestions',
    },
    {
      displayName: 'Recent Searches',
      type: 'custom',
      data: [
        {
          value: 'Red T-shirt',
          data: {
            id: '1',
          },
        },
        {
          value: 'Dresses',
          data: {
            id: '2',
          },
        },
      ],
    },
  ],
};
addComponentStoryDescription(
  RenderCustomSection,
  `const args = ${stringifyWithDefaults(RenderCustomSection.args)}`,
  customSectionDescription
);

export const CustomRenderItem = ComponentTemplate.bind({});
CustomRenderItem.args = {
  apiKey,
  onSubmit,
  sections: [
    {
      indexSectionName: 'Products',
      renderItem: ({ item, query, getItemProps }) => (
        <div {...getItemProps(item)} style={{ display: 'block' }}>
          <a href={item.data?.url}>
            <h3>{item.value}</h3>
            <img src={item.data?.image_url} alt={item.value} />
          </a>
          <p>{`$ ${item.data?.price}`}</p>
          <p>Query: {query}</p>
        </div>
      ),
    },
  ],
};
addComponentStoryDescription(
  CustomRenderItem,
  `const args = ${stringifyWithDefaults(CustomRenderItem.args)}`,
  customRenderItemDescription
);
