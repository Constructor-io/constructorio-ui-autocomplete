export const getIndexOffset = ({ activeSections, sectionIdentifier }) => {
  let indexOffset = 0;
  if (sectionIdentifier) {
    activeSections.find((config) => {
      var _a;
      if ((config === null || config === void 0 ? void 0 : config.identifier) === sectionIdentifier)
        return true; // break out of loop
      indexOffset +=
        ((_a = config === null || config === void 0 ? void 0 : config.data) === null ||
        _a === void 0
          ? void 0
          : _a.length) || 0;
      return false; // continue
    });
  }
  return indexOffset;
};
export const camelToStartCase = (camelCaseString) =>
  camelCaseString
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
export function isTrackingRequestSent(trackingRequestUrl) {
  var _a, _b;
  const trackingRequestsQueue =
    (_a = window.localStorage) === null || _a === void 0 ? void 0 : _a._constructorio_requests;
  return (
    trackingRequestsQueue &&
    ((_b = JSON.parse(trackingRequestsQueue)) === null || _b === void 0
      ? void 0
      : _b.some((request) => {
          var _a;
          return (_a = request === null || request === void 0 ? void 0 : request.url) === null ||
            _a === void 0
            ? void 0
            : _a.includes(trackingRequestUrl);
        }))
  );
}
export function clearConstructorRequests() {
  var _a;
  if ((_a = window.localStorage) === null || _a === void 0 ? void 0 : _a._constructorio_requests) {
    window.localStorage.removeItem('_constructorio_requests');
  }
}
// Function to emulate pausing between interactions
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
export const getStoryParams = (storyCode, templateCode, importCode) => {
  const code = `
${importCode}
${storyCode}
${templateCode}
`;
  return {
    docs: {
      source: {
        code,
        language: 'jsx',
        format: true,
        type: 'code'
      }
    }
  };
};
export const stringify = (obj) => JSON.stringify(obj, null, '  ');
export const disableStoryActions = (story) => {
  story.parameters.actions = { argTypesRegex: null };
};
//# sourceMappingURL=utils.js.map
