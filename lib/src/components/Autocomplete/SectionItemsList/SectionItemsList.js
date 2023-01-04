import React from 'react';
import SectionItem from '../SectionItem/SectionItem';
import { camelToStartCase } from '../../../utils';
export default function SectionItemsList(props) {
  const { section, children = DefaultRenderSectionItemsList } = props;
  return children({ section });
}
const DefaultRenderSectionItemsList = ({ section }) => {
  var _a;
  const sectionName =
    (section === null || section === void 0 ? void 0 : section.displayName) ||
    (section === null || section === void 0 ? void 0 : section.identifier);
  return React.createElement(
    'li',
    { className: `${sectionName} cio-section`, role: 'none' },
    React.createElement(
      'h5',
      { className: 'cio-sectionName', 'aria-hidden': true },
      camelToStartCase(sectionName)
    ),
    React.createElement(
      'ul',
      { className: 'cio-items', role: 'none' },
      (_a = section === null || section === void 0 ? void 0 : section.data) === null ||
        _a === void 0
        ? void 0
        : _a.map((item, index) => {
            var _a;
            return React.createElement(SectionItem, {
              item: item,
              index: index,
              sectionIdentifier:
                section === null || section === void 0 ? void 0 : section.identifier,
              key: `${section === null || section === void 0 ? void 0 : section.identifier}_${
                (_a = item === null || item === void 0 ? void 0 : item.data) === null ||
                _a === void 0
                  ? void 0
                  : _a.id
              }`
            });
          })
    )
  );
};
//# sourceMappingURL=SectionItemsList.js.map
