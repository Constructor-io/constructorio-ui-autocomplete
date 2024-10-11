### `UserDefinedSection`
  
User defined Section Configurations `AutocompleteSectionConfiguration` | `RecommendationsSectionConfiguration` | `CustomSection`

- by default, typing a query will fetch data for Search Suggestions and Products
- to override this, pass an array of sections objects
- the order of the objects in the \`sections\` array determines the order of the results

  ### `AutocompleteSectionConfiguration`

  Congigures the Suggestions sections for the user typed queries

  | property                      | type                                    | description                                                   |
  | :-----------------------------| :---------------------------------------| :-------------------------------------------------------------|
  | indexSectionName              | string                                  | refers to a section under an index. The default sections are "Products" and "Search Suggestions". You can find all the sections that exist in your index under the "Indexes" tab of Constructor dashboard|
  | type                          | 'autocomplete'                          | The type of autosuggest results in this section. Set to 'autocomplete'|
  | displayName                   | string                                  | The display name of the section|
  | numResults                    | number                                  | The number of results in this section. Default is 8|
  | displaySearchTermHighlights   | boolean                                 | Use constructor's auto highlighting of words that match the search keyword, with `"displaySearchTermHighlights": true`|
  | ref                           | object                                  | React ref object for this section|

  ### `RecommendationsSectionConfiguration`

  A different type of suggestions that doesn't rely on the user's typed query but returns instead "Best Search Suggestions" or "Best Products Suggestions" That is powered by Constructor's Recommendations service

  | property                      | type                                    | description                                                   |
  | :-----------------------------| :---------------------------------------| :-------------------------------------------------------------|
  | podId                         | string                                  | Each recommendation section object must have a `podId`. You can find a list of your pods and their IDs from the customer dashboard|
  | indexSectionName              | string                                  | refers to a section under an index. The default sections are "Products" and "Search Suggestions". You can find all the sections that exist in your index under the "Indexes" tab of Constructor dashboard|
  | type                          | 'recommendations'                       | The type of sutosuggest results in this section. Set to 'recommendations'|
  | displayName                   | string                                  | The display name of the section|
  | numResults                    | number                                  | The number of results in this section. Default is 8|
  | displaySearchTermHighlights   | boolean                                 | Use constructor's auto highlighting of words that match the search keyword, with `"displaySearchTermHighlights": true`|
  | itemIds                       | array                                   | Array of Item IDs|
  | term                          | string                                  | Search term|
  | ref                           | object                                  | React ref object for this section|

  ### `CustomSection`

  You can directly pass any custom section with items to be renedered with other sections

  | property                      | type                                    | description                                                   |
  | :-----------------------------| :---------------------------------------| :-------------------------------------------------------------|
  | type                          | 'custom'                                | The type of autosuggest results in this section. Set to 'custom'|
  | displayName                   | string                                  | The display name of the section|
  | data                          | Item[]                                  | Array of data items to be rendered|

---------------------

### `AdvancedParameters`
Can be used to fine-tune the autosuggest data returned from constructor's servers.

| property                             | type                                    | description                                                   |
| :------------------------------------| :---------------------------------------| :-------------------------------------------------------------|
| filters                               | object                                  | apply filters to the suggestions. Any parameter supported by <a href="https://docs.constructor.io/rest_api/autocomplete_queries/" target="__blank">  our autocomplete endpoint </a>  can be passed under `advancedParameters`|
| numTermsWithGroupSuggestions         | integer                                 | Add suggested group filters to search term suggestions. Not all suggested search terms will have group filters, so these integers are upper limits, used to specify the maximum number of terms with group filters and the maximum number of suggested group filters per term|
| numGroupsSuggestedPerTerm            | integer                                 | Add suggested group filters to search term suggestions. Not all suggested search terms will have group filters, so these integers are upper limits, used to specify the maximum number of terms with group filters and the maximum number of suggested group filters per term|
| displaySearchSuggestionImages        | boolean                                 | Display images for search suggestions. This field need to be made displayable before they can be used. Please contact your Constructor Integration Engineer for details.|
| displaySearchSuggestionResultCounts  | boolean                                 | Display counts for search suggestions. This field need to be made displayable before they can be used. Please contact your Constructor Integration Engineer for details.|
| debounce                             | number                                  | override the recommended, default delay employed for debouncing autocomplete network requests between keystrokes as your users type into the text input field. The default value is 250, which results in a debounce delay of 250 milliseconds.
| fetchZeroStateOnFocus                | boolean                                 | override the zero state fetching behavior from initial render to input focus.|
| translations                         | object                                  | Pass a `translations` object to display translatable words in your preferred language|
