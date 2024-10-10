- `section`: Section info including: 
#### section

  | property                      | type                                    | description                                                   |
  | :-----------------------------| :---------------------------------------| :-------------------------------------------------------------|
  | data                          | Object                                  | The item data for the current section                         |
  | type                       | `'autocomplete'|'recommendations'|custom'` | The type of autocomplete results in this section 
  | displayName                  | string   | The display name of the section 
  | numResults                     | number                                  | The number of results in this section 
  | ref                     | object                                  | React ref object for this section 
  | indexSectionName | string                               | The name of the section (Ex: Products or Search Suggestions) 
  | podId                | string                                | The id of the recommendation pod. Only present for recommendation sections 
  | itemIds                 | string[]                           | The item ids used in the recommendation request. Only present for recommendation requests 
