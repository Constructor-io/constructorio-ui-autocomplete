import e, {
  useState as t,
  useEffect as n,
  useRef as o,
  createContext as i,
  useContext as c
} from 'react';
import r from '@constructor-io/constructorio-client-javascript';
import { useCombobox as l } from 'downshift';
const a = (e, o, i) => {
    const [c, r] = t({}),
      l = ((e, o = 250) => {
        const [i, c] = t(e);
        return (
          n(() => {
            const t = setTimeout(() => {
              c(e);
            }, o);
            return () => {
              clearTimeout(t);
            };
          }, [e, o]),
          i
        );
      })(e),
      a = {};
    return (
      i &&
        (a.resultsPerSection = i.reduce((e, t) => {
          var n;
          return {
            ...e,
            [t.identifier]:
              null === (n = null == t ? void 0 : t.parameters) || void 0 === n
                ? void 0
                : n.numResults
          };
        }, {})),
      n(() => {
        l
          ? null == o ||
            o.autocomplete.getAutocompleteResults(l, a).then((e) => {
              const t = {};
              Object.keys(e.sections).forEach((n) => {
                t[n] = e.sections[n].map((e) => ({ ...e, section: n }));
              }),
                r(t);
            })
          : l || r({});
      }, [l, o]),
      c
    );
  },
  s = (e) => {
    const i = 'What can we help you find today?',
      {
        onSubmit: c,
        onChange: s,
        openOnFocus: u,
        apiKey: d,
        cioJsClient: m,
        placeholder: p = i,
        sectionConfigurations: g,
        zeroStateSectionConfigurations: v
      } = e,
      [f, h] = t(''),
      x = ((e) => {
        const t = o();
        return (
          n(() => {
            t.current = e;
          }, [e]),
          t.current
        );
      })(f),
      y = (({ apiKey: e, cioJsClient: o }) => {
        const [i, c] = t(o);
        return (
          n(() => {
            if (e && !o) {
              const t = new r({
                apiKey: e,
                sendTrackingEvents: !0,
                queryParams: { autocomplete_key: e },
                identityModuleOptions: { cookie_domain: '' }
              });
              c(t);
            } else o && c(o);
          }, [e, o]),
          i
        );
      })({ apiKey: d, cioJsClient: m }),
      b = !f.length && v,
      E = b ? v : g,
      w = null == E ? void 0 : E.filter((e) => 'autocomplete' === e.type || !e.type),
      P = null == E ? void 0 : E.filter((e) => 'recommendations' === e.type),
      C = a(f, y, w),
      S = ((e, o) => {
        const [i, c] = t({});
        return (
          n(() => {
            e &&
              0 !== (null == o ? void 0 : o.length) &&
              (async () => {
                const t = await Promise.all(
                    null == o
                      ? void 0
                      : o.map(({ identifier: t, parameters: n }) =>
                          null == e ? void 0 : e.recommendations.getRecommendations(t, n)
                        )
                  ),
                  n = {};
                t.forEach(({ response: e }) => {
                  const { pod: t, results: o } = e;
                  n[t.id] = o.map((e) => ({ ...e, section: null == t ? void 0 : t.id }));
                }),
                  c(n);
              })();
          }, [e]),
          i
        );
      })(y, P),
      k = { ...C, ...S },
      I = [];
    null == E ||
      E.forEach((e) => {
        const { identifier: t, data: n } = e,
          o = k[t] || n;
        o && void 0 !== o && I.push({ ...e, data: o });
      });
    const N = [];
    null == I ||
      I.forEach((e) => {
        (null == e ? void 0 : e.data) && N.push(...e.data);
      });
    const M = (({
        setQuery: e,
        items: t,
        onSubmit: n,
        cioClient: o,
        previousQuery: i = '',
        onChange: c
      }) =>
        l({
          items: t,
          itemToString: (e) => (e ? e.value : ''),
          onInputValueChange: async ({ inputValue: t = '' }) => {
            e(t), c && c();
          },
          onSelectedItemChange({ selectedItem: t }) {
            var c;
            t &&
              (e(t.value),
              n && (null == t ? void 0 : t.value) && n({ item: t, originalQuery: i }),
              (null == t ? void 0 : t.value) &&
                ((null === (c = null == t ? void 0 : t.data) || void 0 === c ? void 0 : c.url) ||
                  null == o ||
                  o.tracker.trackSearchSubmit(t.value, { original_query: i }),
                null == o ||
                  o.tracker.trackAutocompleteSelect(t.value, {
                    original_query: i,
                    section: t.section
                  })));
          }
        }))({ setQuery: h, items: N, onSubmit: c, cioClient: y, previousQuery: x }),
      {
        isOpen: F,
        getMenuProps: Q,
        getLabelProps: _,
        openMenu: q,
        closeMenu: z,
        getComboboxProps: T
      } = M;
    return {
      query: f,
      sections: I,
      isOpen: F,
      getMenuProps: () => ({ ...Q(), className: 'cio-results', 'data-testid': 'cio-results' }),
      getLabelProps: _,
      openMenu: q,
      closeMenu: z,
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
        })({ activeSectionConfigurations: I, sectionIdentifier: n });
        return {
          ...M.getItemProps({ item: e, index: t + o }),
          className: 'cio-item',
          'data-testid': 'cio-item'
        };
      },
      getInputProps: () => ({
        ...M.getInputProps(),
        value: f,
        onFocus: () => {
          var t;
          e.onFocus && e.onFocus(),
            b && !1 !== u && M.openMenu(),
            null === (t = null == y ? void 0 : y.tracker) || void 0 === t || t.trackInputFocus();
        },
        className: 'cio-input',
        'data-testid': 'cio-input',
        placeholder: p
      }),
      getFormProps: () => ({
        ...T(),
        onSubmit: (e) => (
          e.preventDefault(),
          c && c({ query: f }),
          null == y || y.tracker.trackSearchSubmit(f, { original_query: f }),
          { query: f }
        ),
        className: 'cio-form',
        'data-testid': 'cio-form'
      }),
      setQuery: h,
      cioClient: y
    };
  },
  u = i({});
function d(t) {
  const { children: n, ...o } = t,
    i = s(o);
  return e.createElement(
    u.Provider,
    { value: { ...i } },
    e.createElement('div', { className: 'cio-autocomplete' }, n)
  );
}
function m(t) {
  var n;
  const { item: o, index: i, sectionIdentifier: r, children: l } = t,
    { getItemProps: a } = c(u);
  let s;
  return (
    (s = (function (e) {
      return void 0 !== e.data.image_url;
    })(o)
      ? e.createElement(
          e.Fragment,
          null,
          e.createElement('img', {
            'data-testid': 'cio-img',
            src: null === (n = o.data) || void 0 === n ? void 0 : n.image_url,
            alt: o.value
          }),
          e.createElement('p', { 'data-testid': 'cio-text' }, o.value)
        )
      : o.value),
    e.createElement(
      'li',
      { ...a({ item: o, index: i, sectionIdentifier: r }), className: 'cio-item' },
      l || s
    )
  );
}
function p(e) {
  const { section: t, children: n = g } = e;
  return n({ section: t });
}
const g = ({ section: t }) => {
  var n;
  const o = (null == t ? void 0 : t.displayName) || (null == t ? void 0 : t.identifier);
  return e.createElement(
    'li',
    { className: `${o} cio-section` },
    e.createElement(
      'h5',
      { className: 'cio-sectionName' },
      o.replace(/([A-Z])/g, ' $1').replace(/^./, function (e) {
        return e.toUpperCase();
      })
    ),
    e.createElement(
      'ul',
      { className: 'cio-items' },
      null === (n = null == t ? void 0 : t.data) || void 0 === n
        ? void 0
        : n.map((n, o) =>
            e.createElement(m, {
              item: n,
              index: o,
              sectionIdentifier: null == t ? void 0 : t.identifier,
              key: `${null == t ? void 0 : t.identifier}_${n.data.id}`
            })
          )
    )
  );
};
function v(t) {
  const { children: n = f } = t,
    { sections: o, isOpen: i, getMenuProps: r, getItemProps: l } = c(u),
    a =
      o &&
      o.some((e) => {
        var t;
        return null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.length;
      });
  let s;
  s = i && a ? ('function' == typeof n ? n({ sections: o, getItemProps: l }) : n) : null;
  const d = { ...r() };
  return e.createElement('ul', { ...d }, s);
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
const f = ({ sections: t }) =>
  e.createElement(
    e.Fragment,
    null,
    null == t ? void 0 : t.map((t) => e.createElement(p, { section: t, key: t.identifier }))
  );
function h(e) {
  const { children: t = x } = e,
    { getFormProps: n, getInputProps: o, getLabelProps: i, setQuery: r } = c(u);
  return t({ getFormProps: n, getInputProps: o, getLabelProps: i, setQuery: r });
}
const x = ({ getFormProps: t, getInputProps: n, getLabelProps: o, setQuery: i }) => {
  const c = n();
  return e.createElement(
    'form',
    { ...t() },
    e.createElement('label', { ...o(), hidden: !0 }, 'Search'),
    e.createElement('input', { ...c }),
    e.createElement(
      'button',
      {
        className: 'cio-clear-btn',
        'data-testid': 'cio-clear-btn',
        hidden: !c.value,
        onClick: () => {
          var e;
          i(''),
            c.id && (null === (e = document.getElementById(c.id)) || void 0 === e || e.focus());
        },
        type: 'button',
        'aria-label': 'Clear search field text'
      },
      e.createElement(
        'div',
        { className: 'cio-icon' },
        e.createElement(
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
          e.createElement('path', {
            d: 'M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'
          })
        )
      )
    ),
    e.createElement(
      'button',
      { className: 'cio-btn', disabled: !c.value, type: 'submit', 'aria-label': 'Submit Search' },
      e.createElement(
        'div',
        { className: 'cio-icon' },
        e.createElement(
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
          e.createElement('path', {
            d: 'M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'
          })
        )
      )
    )
  );
};
function y(t) {
  const { children: n } = t;
  return n
    ? e.createElement(d, { ...t }, n)
    : e.createElement(
        'div',
        null,
        e.createElement(d, { ...t }, e.createElement(h, null), e.createElement(v, null))
      );
}
export {
  v as AutocompleteResults,
  y as CioAutocomplete,
  h as SearchInput,
  m as SectionItem,
  p as SectionItemsList,
  s as useCioAutocomplete
};
//# sourceMappingURL=index.js.map