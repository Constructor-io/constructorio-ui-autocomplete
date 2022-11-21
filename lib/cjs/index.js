'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = require('react'),
  t = require('@constructor-io/constructorio-client-javascript'),
  n = require('downshift');
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e };
}
var i = o(e),
  l = o(t);
const c = ({
    setQuery: e,
    items: t,
    onSubmit: o,
    cioClient: i,
    previousQuery: l = '',
    onChange: c
  }) =>
    n.useCombobox({
      items: t,
      itemToString: (e) => (e ? e.value : ''),
      onInputValueChange: async ({ inputValue: t = '' }) => {
        e(t), c && c();
      },
      onSelectedItemChange({ selectedItem: t }) {
        var n;
        t &&
          (e(t.value),
          o && (null == t ? void 0 : t.value) && o({ item: t, originalQuery: l }),
          (null == t ? void 0 : t.value) &&
            ((null === (n = null == t ? void 0 : t.data) || void 0 === n ? void 0 : n.url) ||
              null == i ||
              i.tracker.trackSearchSubmit(t.value, { original_query: l }),
            null == i ||
              i.tracker.trackAutocompleteSelect(t.value, {
                original_query: l,
                section: t.section
              })));
      }
    }),
  a = (t, n, o) => {
    const [i, l] = e.useState({}),
      c = ((t, n = 250) => {
        const [o, i] = e.useState(t);
        return (
          e.useEffect(() => {
            const e = setTimeout(() => {
              i(t);
            }, n);
            return () => {
              clearTimeout(e);
            };
          }, [t, n]),
          o
        );
      })(t),
      a = {};
    return (
      o &&
        (a.resultsPerSection = o.reduce((e, t) => {
          var n;
          return {
            ...e,
            [t.identifier]:
              null === (n = null == t ? void 0 : t.parameters) || void 0 === n
                ? void 0
                : n.numResults
          };
        }, {})),
      e.useEffect(() => {
        c
          ? null == n ||
            n.autocomplete.getAutocompleteResults(c, a).then((e) => {
              const t = {};
              Object.keys(e.sections).forEach((n) => {
                t[n] = e.sections[n].map((e) => ({ ...e, section: n }));
              }),
                l(t);
            })
          : c || l({});
      }, [c, n]),
      i
    );
  },
  r = (t) => {
    const n = 'What can we help you find today?',
      {
        onSubmit: o,
        onChange: i,
        openOnFocus: r,
        apiKey: u,
        cioJsClient: s,
        placeholder: d = n,
        sectionConfigurations: m,
        zeroStateSectionConfigurations: p
      } = t,
      [f, v] = e.useState(''),
      g = ((t) => {
        const n = e.useRef();
        return (
          e.useEffect(() => {
            n.current = t;
          }, [t]),
          n.current
        );
      })(f),
      h = (({ apiKey: t, cioJsClient: n }) => {
        const [o, i] = e.useState(n);
        return (
          e.useEffect(() => {
            if (t && !n) {
              const e = new l.default({
                apiKey: t,
                sendTrackingEvents: !0,
                queryParams: { autocomplete_key: t },
                identityModuleOptions: { cookie_domain: '' }
              });
              i(e);
            } else n && i(n);
          }, [t, n]),
          o
        );
      })({ apiKey: u, cioJsClient: s }),
      x = !f.length && p,
      y = x ? p : m,
      b = null == y ? void 0 : y.filter((e) => 'autocomplete' === e.type || !e.type),
      E = null == y ? void 0 : y.filter((e) => 'recommendations' === e.type),
      C = a(f, h, b),
      S = ((t, n) => {
        const [o, i] = e.useState({});
        return (
          e.useEffect(() => {
            t &&
              0 !== (null == n ? void 0 : n.length) &&
              (async () => {
                const e = await Promise.all(
                    null == n
                      ? void 0
                      : n.map(({ identifier: e, parameters: n }) =>
                          null == t ? void 0 : t.recommendations.getRecommendations(e, n)
                        )
                  ),
                  o = {};
                e.forEach(({ response: e }) => {
                  const { pod: t, results: n } = e;
                  o[t.id] = n.map((e) => ({ ...e, section: null == t ? void 0 : t.id }));
                }),
                  i(o);
              })();
          }, [t]),
          o
        );
      })(h, E),
      P = { ...C, ...S },
      w = [];
    null == y ||
      y.forEach((e) => {
        const { identifier: t, data: n } = e,
          o = P[t] || n;
        o && void 0 !== o && w.push({ ...e, data: o });
      });
    const I = [];
    null == w ||
      w.forEach((e) => {
        (null == e ? void 0 : e.data) && I.push(...e.data);
      });
    const k = c({ setQuery: v, items: I, onSubmit: o, cioClient: h, previousQuery: g }),
      {
        isOpen: N,
        getMenuProps: M,
        getLabelProps: F,
        openMenu: q,
        closeMenu: _,
        getComboboxProps: A
      } = k;
    return {
      query: f,
      sections: w,
      isOpen: N,
      getMenuProps: () => ({ ...M(), className: 'cio-results', 'data-testid': 'cio-results' }),
      getLabelProps: F,
      openMenu: q,
      closeMenu: _,
      getItemProps: ({ item: e, index: t = 0, sectionIdentifier: n = 'Products' }) => {
        const o = (({ activeSectionConfigurations: e, sectionIdentifier: t }) => {
          let n = 0;
          return (
            t &&
              e.find((e) => {
                var o;
                return (
                  (null == e ? void 0 : e.identifier) === t ||
                  ((n +=
                    (null === (o = null == e ? void 0 : e.data) || void 0 === o
                      ? void 0
                      : o.length) || 0),
                  !1)
                );
              }),
            n
          );
        })({ activeSectionConfigurations: w, sectionIdentifier: n });
        return {
          ...k.getItemProps({ item: e, index: t + o }),
          className: 'cio-item',
          'data-testid': 'cio-item'
        };
      },
      getInputProps: () => ({
        ...k.getInputProps(),
        value: f,
        onFocus: () => {
          var e;
          t.onFocus && t.onFocus(),
            x && !1 !== r && k.openMenu(),
            null === (e = null == h ? void 0 : h.tracker) || void 0 === e || e.trackInputFocus();
        },
        className: 'cio-input',
        'data-testid': 'cio-input',
        placeholder: d
      }),
      getFormProps: () => ({
        ...A(),
        onSubmit: (e) => (
          e.preventDefault(),
          o && o({ query: f }),
          null == h || h.tracker.trackSearchSubmit(f, { original_query: f }),
          { query: f }
        ),
        className: 'cio-form',
        'data-testid': 'cio-form'
      }),
      setQuery: v,
      cioClient: h
    };
  },
  u = e.createContext({});
function s(e) {
  const { children: t, ...n } = e,
    o = r(n);
  return i.default.createElement(
    u.Provider,
    { value: { ...o } },
    i.default.createElement('div', { className: 'cio-autocomplete' }, t)
  );
}
function d(t) {
  var n;
  const { item: o, index: l, sectionIdentifier: c, children: a } = t,
    { getItemProps: r } = e.useContext(u);
  let s;
  return (
    (s = (function (e) {
      return void 0 !== e.data.image_url;
    })(o)
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement('img', {
            'data-testid': 'cio-img',
            src: null === (n = o.data) || void 0 === n ? void 0 : n.image_url,
            alt: o.value
          }),
          i.default.createElement('p', { 'data-testid': 'cio-text' }, o.value)
        )
      : o.value),
    i.default.createElement(
      'li',
      { ...r({ item: o, index: l, sectionIdentifier: c }), className: 'cio-item' },
      a || s
    )
  );
}
function m(e) {
  const { section: t, children: n = p } = e;
  return n({ section: t });
}
const p = ({ section: e }) => {
  var t;
  const n = (null == e ? void 0 : e.displayName) || (null == e ? void 0 : e.identifier);
  return i.default.createElement(
    'li',
    { className: `${n} cio-section` },
    i.default.createElement(
      'h5',
      { className: 'cio-sectionName' },
      n.replace(/([A-Z])/g, ' $1').replace(/^./, function (e) {
        return e.toUpperCase();
      })
    ),
    i.default.createElement(
      'ul',
      { className: 'cio-items' },
      null === (t = null == e ? void 0 : e.data) || void 0 === t
        ? void 0
        : t.map((t, n) =>
            i.default.createElement(d, {
              item: t,
              index: n,
              sectionIdentifier: null == e ? void 0 : e.identifier,
              key: `${null == e ? void 0 : e.identifier}_${t.data.id}`
            })
          )
    )
  );
};
function f(t) {
  const { children: n = v } = t,
    { sections: o, isOpen: l, getMenuProps: c, getItemProps: a } = e.useContext(u),
    r =
      o &&
      o.some((e) => {
        var t;
        return null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.length;
      });
  let s;
  s = l && r ? ('function' == typeof n ? n({ sections: o, getItemProps: a }) : n) : null;
  const d = { ...c() };
  return i.default.createElement('ul', { ...d }, s);
}
!(function (e, t) {
  void 0 === t && (t = {});
  var n = t.insertAt;
  if (e && 'undefined' != typeof document) {
    var o = document.head || document.getElementsByTagName('head')[0],
      i = document.createElement('style');
    (i.type = 'text/css'),
      'top' === n && o.firstChild ? o.insertBefore(i, o.firstChild) : o.appendChild(i),
      i.styleSheet ? (i.styleSheet.cssText = e) : i.appendChild(document.createTextNode(e));
  }
})(
  ".cio-autocomplete {\n  font-family: Arial, Helvetica, sans-serif;\n  padding: 20px;\n}\n\n.cio-autocomplete .cio-items {\n  padding: 0;\n}\n\n.cio-autocomplete .cio-item {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.cio-autocomplete .cio-item img {\n  width: 100%;\n}\n\n.cio-autocomplete .products.cio-section .cio-item {\n  align-items: center;\n  justify-content: start;\n}\n\n.cio-autocomplete .products.cio-section .cio-items {\n  display: flex;\n}\n\n.cio-autocomplete .cio-form {\n  position: relative;\n  z-index: 100;\n  width: 300px;\n  top: 0px;\n  right: -8px;\n  height: 30px;\n}\n\n.cio-autocomplete .cio-input {\n  width: 100%;\n  height: 100%;\n  border: 1px solid gray;\n  padding: 0 10px;\n  border-radius: 3px;\n}\n\n.cio-autocomplete .cio-form .cio-btn,\n.cio-autocomplete .cio-form .cio-clear-btn {\n  position: absolute;\n  top: 1px;\n  bottom: -1px;\n  right: -21px;\n}\n\n.cio-autocomplete .cio-form .cio-btn[type='submit'] {\n  right: -21px;\n}\n\n.cio-autocomplete .cio-form .cio-clear-btn {\n  right: 10px;\n}\n\n.cio-autocomplete .cio-form .cio-btn .cio-icon {\n  display: flex;\n}\n\n.cio-autocomplete .cio-results {\n  gap: 20px;\n  padding-left: 0px;\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  z-index: 1000;\n}\n\n.cio-autocomplete .cio-sectionName {\n  margin: 15px 0 20px 0;\n  font-size: 22px;\n}\n\n.cio-autocomplete .cio-results .cio-section.searchSuggestions .cio-items {\n  flex-direction: column;\n  min-width: 200px;\n}\n\n.cio-autocomplete .cio-item {\n  list-style: none;\n}\n\n.cio-autocomplete .cio-item {\n  padding: 10px;\n  margin: 1px;\n  border-bottom: 3px solid transparent;\n}\n\n.cio-autocomplete .cio-item img {\n  max-width: 100px;\n}\n\n.cio-autocomplete [aria-selected='true'] {\n  background-color: hsl(0, 0%, 90%);\n  border-radius: 4px;\n}\n\n.cio-autocomplete .cio-results[role='listbox'].showing-content {\n  position: relative;\n  top: 2px;\n  left: 8px;\n  max-width: 90vw;\n  background: white;\n  margin: 0px;\n  box-shadow: 0 2px 2px 1px grey;\n  overflow: auto;\n}\n"
);
const v = ({ sections: e }) =>
  i.default.createElement(
    i.default.Fragment,
    null,
    null == e ? void 0 : e.map((e) => i.default.createElement(m, { section: e, key: e.identifier }))
  );
function g(t) {
  const { children: n = h } = t,
    { getFormProps: o, getInputProps: i, getLabelProps: l, setQuery: c } = e.useContext(u);
  return n({ getFormProps: o, getInputProps: i, getLabelProps: l, setQuery: c });
}
const h = ({ getFormProps: e, getInputProps: t, getLabelProps: n, setQuery: o }) => {
  const l = t();
  return i.default.createElement(
    'form',
    { ...e() },
    i.default.createElement('label', { ...n(), hidden: !0 }, 'Search'),
    i.default.createElement('input', { ...l }),
    i.default.createElement(
      'button',
      {
        className: 'cio-clear-btn',
        'data-testid': 'cio-clear-btn',
        hidden: !l.value,
        onClick: () => {
          var e;
          o(''),
            l.id && (null === (e = document.getElementById(l.id)) || void 0 === e || e.focus());
        },
        type: 'button',
        'aria-label': 'Clear search field text'
      },
      i.default.createElement(
        'div',
        { className: 'cio-icon' },
        i.default.createElement(
          'svg',
          {
            stroke: 'currentColor',
            fill: 'currentColor',
            strokeWidth: '0',
            viewBox: '0 0 512 512',
            height: '1em',
            width: '1em',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          i.default.createElement('path', {
            d: 'M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'
          })
        )
      )
    ),
    i.default.createElement(
      'button',
      { className: 'cio-btn', disabled: !l.value, type: 'submit', 'aria-label': 'Submit Search' },
      i.default.createElement(
        'div',
        { className: 'cio-icon' },
        i.default.createElement(
          'svg',
          {
            stroke: 'currentColor',
            fill: 'currentColor',
            strokeWidth: '0',
            viewBox: '0 0 512 512',
            height: '1em',
            width: '1em',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          i.default.createElement('path', {
            d: 'M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'
          })
        )
      )
    )
  );
};
(exports.AutocompleteResults = f),
  (exports.CioAutocomplete = function (e) {
    const { children: t } = e;
    return t
      ? i.default.createElement(s, { ...e }, t)
      : i.default.createElement(
          'div',
          null,
          i.default.createElement(
            s,
            { ...e },
            i.default.createElement(g, null),
            i.default.createElement(f, null)
          )
        );
  }),
  (exports.SearchInput = g),
  (exports.SectionItem = d),
  (exports.SectionItemsList = m),
  (exports.useCioAutocomplete = r);
//# sourceMappingURL=index.js.map
