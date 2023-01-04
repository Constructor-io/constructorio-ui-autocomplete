import React from 'react';
import { useContext } from 'react';
import { CioAutocompleteContext } from '../CioAutocompleteProvider';
import { isProduct } from '../../../typeGuards';
export default function SectionItem(props) {
  var _a;
  const { item, index, sectionIdentifier, children } = props;
  const { getItemProps } = useContext(CioAutocompleteContext);
  let defaultChildren;
  if (isProduct(item)) {
    defaultChildren = React.createElement(
      React.Fragment,
      null,
      React.createElement('img', {
        'data-testid': 'cio-img',
        src: (_a = item.data) === null || _a === void 0 ? void 0 : _a.image_url,
        alt: item.value
      }),
      React.createElement('p', { 'data-testid': 'cio-text' }, item.value)
    );
  } else {
    defaultChildren = item.value;
  }
  return React.createElement(
    'li',
    Object.assign({}, getItemProps({ item, index, sectionIdentifier }), { className: 'cio-item' }),
    children ? children : defaultChildren
  );
}
//# sourceMappingURL=SectionItem.js.map
