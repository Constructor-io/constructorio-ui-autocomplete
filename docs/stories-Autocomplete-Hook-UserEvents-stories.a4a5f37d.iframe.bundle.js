"use strict";(self.webpackChunk_constructor_io_constructorio_ui_autocomplete=self.webpackChunk_constructor_io_constructorio_ui_autocomplete||[]).push([[803],{"./src/stories/Autocomplete/Hook/UserEvents.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,OnChange:()=>OnChange,OnFocus:()=>OnFocus,OnSubmit:()=>OnSubmit,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/index.ts"),_argTypes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/stories/Autocomplete/argTypes.ts"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils.ts"),_constants__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/constants.ts"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stories/Autocomplete/Hook/index.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Autocomplete/Hook/User Events",component:_index__WEBPACK_IMPORTED_MODULE_0__.gq,argTypes:_argTypes__WEBPACK_IMPORTED_MODULE_1__.P,parameters:{docs:{description:{component:_constants__WEBPACK_IMPORTED_MODULE_3__._w}}}};var Default=___WEBPACK_IMPORTED_MODULE_2__.Y9.bind({});Default.args={apiKey:_constants__WEBPACK_IMPORTED_MODULE_3__.q1},Default.parameters=(0,___WEBPACK_IMPORTED_MODULE_2__.i)("const args = ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.Pz)(Default.args)));var OnFocus=___WEBPACK_IMPORTED_MODULE_2__.Y9.bind({});OnFocus.args={apiKey:_constants__WEBPACK_IMPORTED_MODULE_3__.q1,onFocus:function onFocus(){console.log("Focus!")}},(0,___WEBPACK_IMPORTED_MODULE_2__.mz)(OnFocus,"const args = {\n    apiKey: '".concat(_constants__WEBPACK_IMPORTED_MODULE_3__.q1,"',\n    onFocus: () => { console.log('Focus!') }\n  }"),_constants__WEBPACK_IMPORTED_MODULE_3__.bI),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.$u)(OnFocus);var OnChange=___WEBPACK_IMPORTED_MODULE_2__.Y9.bind({});OnChange.args={apiKey:_constants__WEBPACK_IMPORTED_MODULE_3__.q1,onChange:function onChange(inputFieldValue){console.log("New Query: ".concat(inputFieldValue))}},(0,___WEBPACK_IMPORTED_MODULE_2__.mz)(OnChange,"const args = {\n    apiKey: '".concat(_constants__WEBPACK_IMPORTED_MODULE_3__.q1,"',\n    onChange: (inputFieldValue) => {\n      console.log('New Query: ' + inputFieldValue);\n    }\n  }"),_constants__WEBPACK_IMPORTED_MODULE_3__.pb),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.$u)(OnChange);var OnSubmit=___WEBPACK_IMPORTED_MODULE_2__.Y9.bind({});OnSubmit.args={apiKey:_constants__WEBPACK_IMPORTED_MODULE_3__.q1,onSubmit:function onSubmit(submitEvent){var query=submitEvent.query,item=submitEvent.item,originalQuery=submitEvent.originalQuery;query?console.log("Submitted query: ".concat(query)):(console.log("Selected a search suggestion for: ".concat(originalQuery)),console.dir(item))}},(0,___WEBPACK_IMPORTED_MODULE_2__.mz)(OnSubmit,"const args = {\n    apiKey: '".concat(_constants__WEBPACK_IMPORTED_MODULE_3__.q1,"',\n    onSubmit: (submitEvent) => {\n      const { query, item, originalQuery } = submitEvent;\n      if (query) {\n        console.log('Submitted query: ' + query);\n      } else {\n        console.log('Selected a search suggestion for: ' + originalQuery);\n        console.dir(item);\n      }\n    }\n  }"),_constants__WEBPACK_IMPORTED_MODULE_3__.aO),(0,_utils__WEBPACK_IMPORTED_MODULE_4__.$u)(OnSubmit);var __namedExportsOrder=["Default","OnFocus","OnChange","OnSubmit"];try{Default.displayName="Default",Default.__docgenInfo={description:"",displayName:"Default",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/UserEvents.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/stories/Autocomplete/Hook/UserEvents.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}try{OnFocus.displayName="OnFocus",OnFocus.__docgenInfo={description:"",displayName:"OnFocus",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnFocus"]={docgenInfo:OnFocus.__docgenInfo,name:"OnFocus",path:"src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnFocus"})}catch(__react_docgen_typescript_loader_error){}try{OnChange.displayName="OnChange",OnChange.__docgenInfo={description:"",displayName:"OnChange",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnChange"]={docgenInfo:OnChange.__docgenInfo,name:"OnChange",path:"src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnChange"})}catch(__react_docgen_typescript_loader_error){}try{OnSubmit.displayName="OnSubmit",OnSubmit.__docgenInfo={description:"",displayName:"OnSubmit",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnSubmit"]={docgenInfo:OnSubmit.__docgenInfo,name:"OnSubmit",path:"src/stories/Autocomplete/Hook/UserEvents.stories.tsx#OnSubmit"})}catch(__react_docgen_typescript_loader_error){}},"./src/stories/Autocomplete/Hook/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y9:()=>HooksTemplate,i:()=>getHookStoryParams,mz:()=>addHookStoryCode});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_hooks_useCioAutocomplete__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useCioAutocomplete.ts"),_typeGuards__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/typeGuards.ts"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function HooksTemplate(args){var _useCioAutocomplete=(0,_hooks_useCioAutocomplete__WEBPACK_IMPORTED_MODULE_1__.Z)(args),isOpen=_useCioAutocomplete.isOpen,sections=_useCioAutocomplete.sections,getFormProps=_useCioAutocomplete.getFormProps,getLabelProps=_useCioAutocomplete.getLabelProps,getInputProps=_useCioAutocomplete.getInputProps,getMenuProps=_useCioAutocomplete.getMenuProps,getItemProps=_useCioAutocomplete.getItemProps,setQuery=_useCioAutocomplete.setQuery,autocompleteClassName=_useCioAutocomplete.autocompleteClassName,inputProps=getInputProps();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{className:autocompleteClassName,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form",_objectSpread(_objectSpread({},getFormProps()),{},{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label",_objectSpread(_objectSpread({htmlFor:"cio-input"},getLabelProps()),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input",_objectSpread({id:"cio-input"},inputProps))})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button",{className:"cio-clear-btn","data-testid":"cio-clear-btn",hidden:!inputProps.value,onClick:function onClick(){setQuery(""),inputProps.id&&setTimeout((function(){var _document$getElementB;return null===(_document$getElementB=document.getElementById(inputProps.id))||void 0===_document$getElementB?void 0:_document$getElementB.focus()}),100)},type:"button","aria-label":"Clear search field text",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"cio-icon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 512 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"})})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button",{className:"cio-submit-btn","data-testid":"cio-submit-btn",disabled:!inputProps.value,type:"submit","aria-label":"Submit Search",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"cio-icon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 512 512",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"})})})})]})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",_objectSpread(_objectSpread({},getMenuProps()),{},{children:isOpen&&(null==sections?void 0:sections.map((function(section){var _section$data;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:section.identifier,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{className:"cio-section",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h5",{className:"cio-sectionName",children:(null==section?void 0:section.displayName)||section.identifier}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"cio-section-items",children:null==section||null===(_section$data=section.data)||void 0===_section$data?void 0:_section$data.map((function(item,index){var _item$data,_item$data2;return(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div",_objectSpread(_objectSpread({},getItemProps({item,index,sectionIdentifier:section.identifier})),{},{key:null==item||null===(_item$data=item.data)||void 0===_item$data?void 0:_item$data.id}),(0,_typeGuards__WEBPACK_IMPORTED_MODULE_3__.v)(item)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img",{width:"100%",src:null===(_item$data2=item.data)||void 0===_item$data2?void 0:_item$data2.image_url,alt:"","data-testid":"cio-img"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:item.value}))}))})]})},section.identifier)})))}))]})}HooksTemplate.displayName="HooksTemplate";var getHookStoryParams=function getHookStoryParams(storyCode){return(0,_utils__WEBPACK_IMPORTED_MODULE_4__.Ez)(storyCode,"\nfunction YourComponent() {\n  const {\n    isOpen,\n    sections,\n    getFormProps,\n    getLabelProps,\n    getInputProps,\n    getMenuProps,\n    getItemProps,\n    setQuery,\n    autocompleteClassName\n  } = useCioAutocomplete(args);\n\n  const inputProps = getInputProps();\n\n  return (\n    <div className={autocompleteClassName}>\n      <form {...getFormProps()}>\n        <label {...getLabelProps()} hidden>\n          Search\n        </label>\n        <input {...inputProps} />\n        <button\n          className='cio-clear-btn'\n          data-testid='cio-clear-btn'\n          hidden={!inputProps.value}\n          onClick={() => {\n            setQuery('');\n            if (inputProps.id) {\n              setTimeout(() => document.getElementById(inputProps.id)?.focus(), 100);\n            }\n          }}\n          type='button'\n          aria-label='Clear search field text'>\n          <div className='cio-icon'>\n            <svg\n              stroke='currentColor'\n              fill='currentColor'\n              strokeWidth='0'\n              viewBox='0 0 512 512'\n              height='1em'\n              width='1em'\n              xmlns='http://www.w3.org/2000/svg'>\n              <path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'></path>\n            </svg>\n          </div>\n        </button>\n        <button\n          className='cio-submit-btn'\n          data-testid='cio-submit-btn'\n          disabled={!inputProps.value}\n          type='submit'\n          aria-label='Submit Search'>\n          <div className='cio-icon'>\n            <svg\n              stroke='currentColor'\n              fill='currentColor'\n              strokeWidth='0'\n              viewBox='0 0 512 512'\n              height='1em'\n              width='1em'\n              xmlns='http://www.w3.org/2000/svg'>\n              <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>\n            </svg>\n          </div>\n        </button>\n      </form>\n      <div {...getMenuProps()}>\n        {isOpen && (\n          <>\n            {sections?.map((section) => (\n              <div key={section.identifier} className={section.identifier}>\n                <div className='cio-section'>\n                  <h5 className='cio-sectionName'>{section?.displayName || section.identifier}</h5>\n                  <div className='cio-section-items'>\n                    {section?.data?.map((item, index) => (\n                      <div\n                        {...getItemProps({\n                          item,\n                          index,\n                          sectionIdentifier: section.identifier\n                        })}\n                        key={item?.data?.id}>\n                        {isProduct(item) && (\n                          <img\n                            width='100%'\n                            src={item.data?.image_url}\n                            alt=''\n                            data-testid='cio-img'\n                          />\n                        )}\n                        <p>{item.value}</p>\n                      </div>\n                    ))}\n                  </div>\n                </div>\n              </div>\n            ))}\n          </>\n        )}\n      </div>\n    </div>\n  );\n};\n","import { useCioAutocomplete } from 'cio-autocomplete-ts';")},addHookStoryCode=function addHookStoryCode(story,code){var description=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";story.parameters=getHookStoryParams(code),story.parameters.docs.description={story:"\n".concat(description,"\n\n```jsx\n").concat(code,"\n```")}};try{HooksTemplate.displayName="HooksTemplate",HooksTemplate.__docgenInfo={description:"",displayName:"HooksTemplate",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/index.tsx#HooksTemplate"]={docgenInfo:HooksTemplate.__docgenInfo,name:"HooksTemplate",path:"src/stories/Autocomplete/Hook/index.tsx#HooksTemplate"})}catch(__react_docgen_typescript_loader_error){}try{getHookStoryParams.displayName="getHookStoryParams",getHookStoryParams.__docgenInfo={description:"",displayName:"getHookStoryParams",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/Autocomplete/Hook/index.tsx#getHookStoryParams"]={docgenInfo:getHookStoryParams.__docgenInfo,name:"getHookStoryParams",path:"src/stories/Autocomplete/Hook/index.tsx#getHookStoryParams"})}catch(__react_docgen_typescript_loader_error){}}}]);