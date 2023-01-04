import React from 'react';
import { useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import SectionItemsList from '../SectionItemsList/SectionItemsList';
export default function AutocompleteResults(props) {
  const { children = DefaultRenderResults } = props;
  const { sections, isOpen, getMenuProps, getItemProps } = useContext(CioAutocompleteContext);
  const hasResults =
    sections &&
    sections.some((section) => {
      var _a;
      return (_a = section === null || section === void 0 ? void 0 : section.data) === null ||
        _a === void 0
        ? void 0
        : _a.length;
    });
  let content;
  if (isOpen && hasResults) {
    content = typeof children === 'function' ? children({ sections, getItemProps }) : children;
  } else {
    content = null;
  }
  const menuProps = Object.assign({}, getMenuProps());
  return React.createElement('ul', Object.assign({}, menuProps), content);
}
const DefaultRenderResults = ({ sections }) =>
  React.createElement(
    React.Fragment,
    null,
    sections === null || sections === void 0
      ? void 0
      : sections.map((section) =>
          React.createElement(SectionItemsList, { section: section, key: section.identifier })
        )
  );
//# sourceMappingURL=AutocompleteResults.js.map
