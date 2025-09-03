"use strict";
(self.webpackChunk = self.webpackChunk || []).push([
  ["731"],
  {
    50: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "plugin", {
          enumerable: !0,
          get: function () {
            return i.plugin;
          },
        });
      let i = r(574);
    },
    605: function (e, t) {
      function r(e) {
        e.addAction("class", {
          createInstantTween: (e, t, r) => {
            let i = t.class,
              n = i?.selectors || [],
              s = i?.operation,
              a = n
                ? r.map((e) => ({ element: e, classList: [...e.classList] }))
                : [];
            return {
              cleanup: () => {
                if (n) {
                  for (let e of a)
                    if (
                      e.element &&
                      (e.element instanceof HTMLElement &&
                        (e.element.className = ""),
                      e.element.classList)
                    )
                      for (let t of e.classList) e.element.classList.add(t);
                }
              },
              cb: () => {
                if (s && n)
                  for (let e of r)
                    "addClass" === s
                      ? n.forEach((t) => e.classList.add(t))
                      : "removeClass" === s
                      ? n.forEach((t) => e.classList.remove(t))
                      : "toggleClass" === s &&
                        n.forEach((t) => e.classList.toggle(t));
              },
            };
          },
        })
          .addAction("style", {
            createTweenConfig: (e) => {
              let t = { to: {}, from: {} };
              for (let r in e) {
                let i = e[r],
                  n = Array.isArray(i) ? i[1] : i,
                  s = Array.isArray(i) ? i[0] : void 0;
                null != n && (t.to[r] = n), null != s && (t.from[r] = s);
              }
              return t;
            },
          })
          .addAction("transform", {
            createTweenConfig: (e) => {
              let t = { to: {}, from: {} };
              for (let r in e) {
                let i = e[r],
                  n = Array.isArray(i) ? i[1] : i,
                  s = Array.isArray(i) ? i[0] : void 0;
                switch (r) {
                  case "autoAlpha":
                  case "opacity":
                    null != n &&
                      "string" == typeof n &&
                      (n = parseFloat(n) / 100),
                      null != s &&
                        "string" == typeof s &&
                        (s = parseFloat(s) / 100);
                    break;
                  case "transformOrigin":
                    "string" == typeof i
                      ? (s = n = n || i)
                      : "string" == typeof s
                      ? (n = s)
                      : "string" == typeof n && (s = n);
                    break;
                  case "xPercent":
                  case "yPercent":
                    null != n && "string" == typeof n && (n = parseFloat(n)),
                      null != s && "string" == typeof s && (s = parseFloat(s));
                }
                null != n && (t.to[r] = n), null != s && (t.from[r] = s);
              }
              return t;
            },
          });
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "build", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
    },
    845: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "build", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let i = r(908),
        n = r(969);
      function s(e) {
        e.addCondition("prefersReducedMotion", new a())
          .addCondition("webflowBreakpoints", new o())
          .addCondition("customMediaQuery", new l())
          .addCondition("colorScheme", new c())
          .addCondition("elementDataAttribute", new u())
          .addCondition("currentTime", new d())
          .addCondition("elementState", new h());
      }
      class a {
        cache = null;
        isReactive = !0;
        ensure() {
          if (!this.cache) {
            let e = window.matchMedia("(prefers-reduced-motion: reduce)");
            (this.cache = { mql: e, matches: e.matches, callbacks: new Set() }),
              e.addEventListener("change", (e) => {
                for (let t of ((this.cache.matches = e.matches),
                this.cache.callbacks))
                  t();
              });
          }
          return this.cache;
        }
        async evaluate(e) {
          let [t, , r] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.PREFERS_REDUCED_MOTION) return !1;
          let n = this.ensure().matches;
          return 1 === r ? !n : n;
        }
        observe(e, t) {
          let [r] = e;
          if (r !== i.IX3_WF_EXTENSION_KEYS.PREFERS_REDUCED_MOTION)
            return n.noop;
          let s = this.ensure(),
            a = async () => t(await this.evaluate(e));
          return s.callbacks.add(a), () => s.callbacks.delete(a);
        }
        dispose() {
          this.cache && (this.cache.callbacks.clear(), (this.cache = null));
        }
      }
      class o {
        static breakpointQueries = {
          main: "(min-width: 992px)",
          medium: "(max-width: 991px) and (min-width: 768px)",
          small: "(max-width: 767px) and (min-width: 480px)",
          tiny: "(max-width: 479px)",
          large: "(min-width: 1280px)",
          xl: "(min-width: 1440px)",
          xxl: "(min-width: 1920px)",
        };
        cache = new Map();
        isReactive = !0;
        ensure(e) {
          let t = this.cache.get(e);
          if (!t) {
            let r = window.matchMedia(e);
            (t = { mql: r, matches: r.matches, callbacks: new Set() }),
              r.addEventListener("change", (e) => {
                for (let r of ((t.matches = e.matches), t.callbacks)) r();
              }),
              this.cache.set(e, t);
          }
          return t;
        }
        getResult(e) {
          return !!e && this.ensure(e).matches;
        }
        observeQ(e, t) {
          if (!e) return n.noop;
          let r = this.ensure(e);
          return r.callbacks.add(t), () => r.callbacks.delete(t);
        }
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.WEBFLOW_BREAKPOINTS || !r)
            return !1;
          let { breakpoints: s } = r;
          if (!s?.length) return 1 === n;
          let a = s.some((e) => {
            let t = o.breakpointQueries[e];
            return !!t && this.getResult(t);
          });
          return 1 === n ? !a : a;
        }
        observe(e, t) {
          let [r, s] = e;
          if (r !== i.IX3_WF_EXTENSION_KEYS.WEBFLOW_BREAKPOINTS || !s)
            return n.noop;
          let { breakpoints: a } = s;
          if (!a?.length) return n.noop;
          let l = async () => t(await this.evaluate(e)),
            c = [];
          return (
            a.forEach((e) => {
              let t = o.breakpointQueries[e];
              t && c.push(this.observeQ(t, l));
            }),
            () => c.forEach((e) => e())
          );
        }
        dispose() {
          this.cache.forEach((e) => e.callbacks.clear()), this.cache.clear();
        }
      }
      class l {
        cache = new Map();
        isReactive = !0;
        ensure(e) {
          let t = this.cache.get(e);
          if (!t) {
            let r = window.matchMedia(e);
            (t = { mql: r, matches: r.matches, callbacks: new Set() }),
              r.addEventListener("change", (e) => {
                for (let r of ((t.matches = e.matches), t.callbacks)) r();
              }),
              this.cache.set(e, t);
          }
          return t;
        }
        getResult(e) {
          return !!e && this.ensure(e).matches;
        }
        observeQ(e, t) {
          if (!e) return n.noop;
          let r = this.ensure(e);
          return r.callbacks.add(t), () => r.callbacks.delete(t);
        }
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.CUSTOM_MEDIA_QUERY || !r) return !1;
          let { query: s } = r;
          if (!s?.trim()) return 1 === n;
          let a = this.getResult(s);
          return 1 === n ? !a : a;
        }
        observe(e, t) {
          let [r, s] = e;
          if (r !== i.IX3_WF_EXTENSION_KEYS.CUSTOM_MEDIA_QUERY || !s)
            return n.noop;
          let { query: a } = s;
          if (!a?.trim()) return n.noop;
          let o = async () => t(await this.evaluate(e));
          return this.observeQ(a, o);
        }
        dispose() {
          this.cache.forEach((e) => e.callbacks.clear()), this.cache.clear();
        }
      }
      class c {
        cache = null;
        isReactive = !0;
        ensure() {
          if (!this.cache) {
            let e = window.matchMedia("(prefers-color-scheme: dark)");
            (this.cache = { mql: e, matches: e.matches, callbacks: new Set() }),
              e.addEventListener("change", (e) => {
                for (let t of ((this.cache.matches = e.matches),
                this.cache.callbacks))
                  t();
              });
          }
          return this.cache;
        }
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.COLOR_SCHEME || !r) return !1;
          let { scheme: s } = r,
            a = this.ensure().matches,
            o = "dark" === s ? a : !a;
          return 1 === n ? !o : o;
        }
        observe(e, t) {
          let [r] = e;
          if (r !== i.IX3_WF_EXTENSION_KEYS.COLOR_SCHEME) return n.noop;
          let s = this.ensure(),
            a = async () => t(await this.evaluate(e));
          return s.callbacks.add(a), () => s.callbacks.delete(a);
        }
        dispose() {
          this.cache && (this.cache.callbacks.clear(), (this.cache = null));
        }
      }
      class u {
        observers = new Map();
        isReactive = !1;
        compare(e, t, r) {
          if (null === e) return !1;
          switch (r) {
            case "=":
              return e === t;
            case "~":
              return e.includes(t);
            case "^":
              return e.startsWith(t);
            case "$":
              return e.endsWith(t);
            case "?":
              return !0;
            case ">":
              return parseFloat(e) > parseFloat(t);
            case "<":
              return parseFloat(e) < parseFloat(t);
            case ">=":
              return parseFloat(e) >= parseFloat(t);
            case "<=":
              return parseFloat(e) <= parseFloat(t);
            default:
              return !1;
          }
        }
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.ELEMENT_DATA_ATTRIBUTE || !r)
            return !1;
          let { selector: s, attribute: a, value: o = "", operator: l } = r,
            c = 1 === n;
          if (!s || !a) return c;
          let u = document.querySelector(s);
          if (!u) return c;
          let d = this.compare(u.getAttribute(`data-${a}`), String(o), l);
          return c ? !d : d;
        }
        observe(e, t) {
          if (e[0] !== i.IX3_WF_EXTENSION_KEYS.ELEMENT_DATA_ATTRIBUTE || !e[1])
            return n.noop;
          let { selector: r, attribute: s } = e[1];
          return r && s ? this.observeAttr(r, s, e, t) : n.noop;
        }
        observeAttr(e, t, r, i) {
          let n = `elementDataAttribute:${e}:${t}`,
            s = this.observers.get(n);
          if (!s) {
            let r = new MutationObserver((e) => {
                for (let r of e)
                  if (
                    "attributes" === r.type &&
                    r.attributeName === `data-${t}`
                  ) {
                    s?.callbacks.forEach((e) => e());
                    break;
                  }
              }),
              i = document.querySelector(e);
            i &&
              r.observe(i, { attributes: !0, attributeFilter: [`data-${t}`] }),
              (s = { observer: r, callbacks: new Set() }),
              this.observers.set(n, s);
          }
          let a = () => this.evaluate(r).then(i);
          return (
            s.callbacks.add(a),
            () => {
              let e = this.observers.get(n);
              e &&
                (e.callbacks.delete(a),
                e.callbacks.size ||
                  (e.observer.disconnect(), this.observers.delete(n)));
            }
          );
        }
        dispose() {
          this.observers.forEach((e) => {
            e.observer.disconnect(), e.callbacks.clear();
          }),
            this.observers.clear();
        }
      }
      class d {
        intervalId = null;
        callbacks = new Set();
        isReactive = !0;
        parseTime(e) {
          let t = e.match(/^(\d{1,2}):(\d{2})$/);
          if (!t) return null;
          let r = parseInt(t[1], 10),
            i = parseInt(t[2], 10);
          return r < 0 || r > 23 || i < 0 || i > 59
            ? null
            : { hours: r, minutes: i };
        }
        getCurrentTime() {
          let e = new Date();
          return { hours: e.getHours(), minutes: e.getMinutes() };
        }
        timeToMinutes(e) {
          return 60 * e.hours + e.minutes;
        }
        compareTime(e, t, r, i) {
          let n = this.parseTime(r);
          if (!n) return !1;
          let s = this.timeToMinutes(e),
            a = this.timeToMinutes(n);
          switch (t) {
            case "before":
              return s < a;
            case "after":
              return s > a;
            case "between": {
              if (!i) return !1;
              let e = this.parseTime(i);
              if (!e) return !1;
              let t = this.timeToMinutes(e);
              return s >= a && s <= t;
            }
            default:
              return !1;
          }
        }
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.CURRENT_TIME || !r) return !1;
          let { comparison: s, time: a, endTime: o } = r;
          if (!a?.trim()) return 1 === n;
          let l = this.getCurrentTime(),
            c = this.compareTime(l, s, a, o);
          return 1 === n ? !c : c;
        }
        observe(e, t) {
          let [r] = e;
          if (r !== i.IX3_WF_EXTENSION_KEYS.CURRENT_TIME) return n.noop;
          let s = async () => t(await this.evaluate(e));
          return (
            this.callbacks.add(s),
            this.intervalId ||
              1 !== this.callbacks.size ||
              (this.intervalId = window.setInterval(() => {
                this.callbacks.forEach((e) => e());
              }, 6e4)),
            () => {
              this.callbacks.delete(s),
                0 === this.callbacks.size &&
                  this.intervalId &&
                  (clearInterval(this.intervalId), (this.intervalId = null));
            }
          );
        }
        dispose() {
          this.callbacks.clear(),
            this.intervalId &&
              (clearInterval(this.intervalId), (this.intervalId = null));
        }
      }
      class h {
        observers = new Map();
        isReactive = !1;
        async evaluate(e) {
          let [t, r, n] = e;
          if (t !== i.IX3_WF_EXTENSION_KEYS.ELEMENT_STATE || !r) return !1;
          let { selector: s, state: a, className: o } = r,
            l = 1 === n;
          if (!s) return l;
          let c = document.querySelector(s);
          if (!c) return l;
          let u = !1;
          switch (a) {
            case "visible":
              u = c.offsetWidth > 0 && c.offsetHeight > 0;
              break;
            case "hidden":
              u = 0 === c.offsetWidth || 0 === c.offsetHeight;
              break;
            case "hasClass":
              u = !!o && c.classList.contains(o);
              break;
            default:
              u = !0;
          }
          return l ? !u : u;
        }
        observe(e, t) {
          if (e[0] !== i.IX3_WF_EXTENSION_KEYS.ELEMENT_STATE || !e[1])
            return n.noop;
          let { selector: r } = e[1];
          return r ? this.observeEl(r, e, t) : n.noop;
        }
        observeEl(e, t, r) {
          let i = `elementState:${e}`,
            n = this.observers.get(i);
          if (!n) {
            let t = new MutationObserver(() =>
                n?.callbacks.forEach((e) => e())
              ),
              r = document.querySelector(e);
            r && t.observe(r, { attributes: !0, childList: !0, subtree: !0 }),
              (n = { observer: t, callbacks: new Set() }),
              this.observers.set(i, n);
          }
          let s = () => this.evaluate(t).then(r);
          return (
            n.callbacks.add(s),
            () => {
              let e = this.observers.get(i);
              e &&
                (e.callbacks.delete(s),
                e.callbacks.size ||
                  (e.observer.disconnect(), this.observers.delete(i)));
            }
          );
        }
        dispose() {
          this.observers.forEach((e) => {
            e.observer.disconnect(), e.callbacks.clear();
          }),
            this.observers.clear();
        }
      }
    },
    922: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = {
        elementTargetSelector: function () {
          return u;
        },
        safeClosest: function () {
          return l;
        },
        safeGetElementById: function () {
          return n;
        },
        safeMatches: function () {
          return c;
        },
        safeQuerySelector: function () {
          return o;
        },
        safeQuerySelectorAll: function () {
          return s;
        },
      };
      for (var i in r)
        Object.defineProperty(t, i, { enumerable: !0, get: r[i] });
      function n(e) {
        try {
          return document.getElementById(e);
        } catch {
          return console.warn(new a(`Invalid id syntax: ${e}`)), null;
        }
      }
      function s(e, t) {
        try {
          return t.querySelectorAll(e);
        } catch {
          return console.warn(new a(`Invalid selector syntax: ${e}`)), null;
        }
      }
      class a extends Error {
        selector;
        scope;
        constructor(e, t, r) {
          super(e),
            (this.selector = t),
            (this.scope = r),
            (this.name = "IX3SelectorError");
        }
      }
      function o(e, t) {
        try {
          return t.querySelector(e);
        } catch {
          return console.warn(new a(`Invalid selector syntax: ${e}`)), null;
        }
      }
      function l(e, t) {
        try {
          return e.closest(t);
        } catch {
          return console.warn(new a(`Invalid selector syntax: ${t}`)), null;
        }
      }
      function c(e, t) {
        try {
          return e.matches(t);
        } catch {
          return console.warn(new a(`Invalid selector syntax: ${t}`)), !1;
        }
      }
      let u = (e) =>
        `[data-wf-target*="${CSS.escape(`[${JSON.stringify(e)}`)}"]`;
    },
    574: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "plugin", {
          enumerable: !0,
          get: function () {
            return u;
          },
        });
      let i = r(151),
        n = r(605),
        s = r(845),
        a = r(775),
        o = r(983),
        l = r(908),
        c = new o.RuntimeBuilder(l.CORE_PLUGIN_INFO);
      (0, i.build)(c), (0, n.build)(c), (0, s.build)(c), (0, a.build)(c);
      let u = c.buildRuntime();
    },
    775: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "build", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let i = r(104),
        n = r(908),
        s = r(922),
        a = [];
      function o(e) {
        e.addTargetResolver("id", {
          resolve: ([, e]) => {
            let [t, r] = Array.isArray(e) ? e : [e];
            if (!t) return a;
            let i = (0, s.safeGetElementById)(t);
            return l(i ? [i] : a, r);
          },
        })
          .addTargetResolver("trigger-only", {
            resolve: ([, e], { triggerElement: t }) => {
              let r = Array.isArray(e) ? e[1] : void 0;
              return t ? l([t], r) : a;
            },
            isDynamic: !0,
          })
          .addTargetResolver("inst", {
            resolve: ([, e], { triggerElement: t }) => {
              if (!Array.isArray(e)) return a;
              let [r, n] = e,
                o = Array.isArray(r),
                c = o ? n : void 0,
                u = o ? (0, i.pair)(r[0], r[1]) : (0, i.pair)(r, n),
                d = (0, s.safeQuerySelectorAll)(
                  (0, s.elementTargetSelector)(u),
                  document
                );
              if (!d || !d.length) return a;
              let h = Array.from(d);
              if (!t) return l(h, c);
              let g = t.dataset.wfTarget;
              if (!g) return a;
              try {
                let e = JSON.parse(g),
                  t = (0, i.getFirst)(u),
                  r = e.find((e) => (0, i.getFirst)((0, i.getFirst)(e)) === t);
                if (!r) return a;
                let n = (0, i.getSecond)(r),
                  s = h.filter((e) =>
                    (e.dataset.wfTarget || "").includes(`${JSON.stringify(n)}]`)
                  );
                return l(s, c);
              } catch (e) {
                return a;
              }
            },
            isDynamic: !0,
          })
          .addTargetResolver("class", {
            resolve: ([, e]) => {
              let [t, r] = Array.isArray(e) ? e : [e];
              if (!t) return a;
              let i = (0, s.safeQuerySelectorAll)(`.${t}`, document);
              return i ? l(Array.from(i), r) : a;
            },
          })
          .addTargetResolver("selector", {
            resolve: ([, e]) => {
              let [t, r] = Array.isArray(e) ? e : [e];
              if (!t) return a;
              let i = (0, s.safeQuerySelectorAll)(t, document);
              return i ? l(Array.from(i), r) : a;
            },
          })
          .addTargetResolver("body", { resolve: () => [document.body] })
          .addTargetResolver("attribute", {
            resolve: ([, e]) => {
              let [t, r] = Array.isArray(e) ? e : [e];
              if (!t) return a;
              let i = (0, s.safeQuerySelectorAll)(t, document);
              return i ? l(Array.from(i), r) : a;
            },
          });
      }
      function l(e, t) {
        if (!t) return e;
        if (Array.isArray(t)) {
          let [i, a] = t;
          switch (i) {
            case n.TargetScope.FIRST_ANCESTOR: {
              let t = [];
              for (let r of e)
                if (a) {
                  let e = (0, s.safeClosest)(r, a);
                  e && t.push(e);
                }
              return t;
            }
            case n.TargetScope.FIRST_DESCENDANT: {
              let t = [];
              for (let r of e) {
                let e = a
                  ? (0, s.safeQuerySelector)(a, r)
                  : r.firstElementChild;
                e && t.push(e);
              }
              return t;
            }
            case n.TargetScope.DESCENDANTS: {
              let t = [];
              for (let r of e)
                for (let e of (0, s.safeQuerySelectorAll)(a, r) || [])
                  t.push(e);
              return t;
            }
            case n.TargetScope.ANCESTORS: {
              let t = [];
              for (let r of e) {
                let e = r.parentElement;
                for (; e; )
                  (!a || (0, s.safeMatches)(e, a)) && t.push(e),
                    (e = e.parentElement);
              }
              return t;
            }
            default:
              var r = i;
              throw Error(`[scope.type] Unhandled case: ${JSON.stringify(r)}`);
          }
        }
        switch (t) {
          case n.TargetScope.CHILDREN: {
            let t = [];
            for (let r of e) for (let e of r.children) t.push(e);
            return t;
          }
          case n.TargetScope.PARENT: {
            let t = [];
            for (let r of e) r.parentElement && t.push(r.parentElement);
            return t;
          }
          case n.TargetScope.SIBLINGS: {
            let t = [];
            for (let r of e)
              if (r.parentElement)
                for (let e of r.parentElement.children) e !== r && t.push(e);
            return t;
          }
          case n.TargetScope.NEXT: {
            let t = [];
            for (let r of e) {
              let e = r.nextElementSibling;
              e && t.push(e);
            }
            return t;
          }
          case n.TargetScope.PREVIOUS: {
            let t = [];
            for (let r of e) {
              let e = r.previousElementSibling;
              e && t.push(e);
            }
            return t;
          }
          default:
            return e;
        }
      }
    },
    151: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "build", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = r(969);
      function n(e) {
        (function (e) {
          let t = new WeakMap();
          e.addTrigger("click", (e, r, i, n) => {
            let [, s] = e,
              a = i.addEventListener(
                r,
                "click",
                (i) => {
                  let a = s.pluginConfig?.click,
                    o = t.get(r) || new WeakMap();
                  t.set(r, o);
                  let l = (o.get(e) || 0) + 1;
                  switch ((o.set(e, l), a)) {
                    case "each":
                    default:
                      n(i);
                      break;
                    case "first":
                      1 === l && n(i);
                      break;
                    case "second":
                      2 === l && n(i);
                      break;
                    case "odd":
                      l % 2 == 1 && n(i);
                      break;
                    case "even":
                      l % 2 == 0 && n(i);
                      break;
                    case "custom": {
                      let e = s.pluginConfig?.custom;
                      e && l === e && n(i);
                    }
                  }
                },
                { delegate: !0 }
              );
            return () => {
              a(), t.delete(r);
            };
          });
        })(e),
          (function (e) {
            let t = new WeakMap();
            e.addTrigger("hover", (e, r, i, n) => {
              let [, s] = e,
                a = [],
                o = (e, i) => {
                  if (s.pluginConfig?.type !== i) return;
                  let a = s.pluginConfig?.hover || "each",
                    o = t.get(r) || new Map();
                  t.set(r, o);
                  let l = (o.get(i) || 0) + 1;
                  switch ((o.set(i, l), a)) {
                    case "each":
                    default:
                      n(e);
                      break;
                    case "first":
                      1 === l && n(e);
                      break;
                    case "second":
                      2 === l && n(e);
                      break;
                    case "odd":
                      l % 2 == 1 && n(e);
                      break;
                    case "even":
                      l % 2 == 0 && n(e);
                      break;
                    case "custom": {
                      let t = s.pluginConfig?.custom;
                      t && l === t && n(e);
                    }
                  }
                };
              return (
                a.push(
                  i.addEventListener(r, "mouseenter", (e) => {
                    o(e, "mouseenter");
                  })
                ),
                a.push(
                  i.addEventListener(r, "mouseover", (e) => {
                    o(e, "mouseover");
                  })
                ),
                a.push(
                  i.addEventListener(r, "mouseleave", (e) => {
                    o(e, "mouseleave");
                  })
                ),
                () => {
                  a.forEach((e) => e()), (a.length = 0), t.delete(r);
                }
              );
            });
          })(e),
          e.addTrigger("load", (e, t, r, n) => {
            let s = e[1],
              a = !1,
              o = () => {
                a || ((a = !0), n({ target: t }));
              };
            switch (s.pluginConfig?.triggerPoint) {
              case "immediate":
                return o(), i.noop;
              case "fullyLoaded":
                if ("complete" === document.readyState) return o(), i.noop;
                return r.addEventListener(window, "load", o);
              default:
                if (
                  "complete" === document.readyState ||
                  "interactive" === document.readyState
                )
                  return o(), i.noop;
                return r.addEventListener(document, "DOMContentLoaded", o);
            }
          }),
          e.addTrigger("focus", (e, t, r, i) => {
            let n = e[1];
            return r.addEventListener(
              t,
              n.pluginConfig?.useFocusWithin ? "focusin" : "focus",
              i,
              { delegate: !n.pluginConfig?.useFocusWithin }
            );
          }),
          e.addTrigger("blur", (e, t, r, i) => {
            let n = e[1];
            return r.addEventListener(
              t,
              n.pluginConfig?.useFocusWithin ? "focusout" : "blur",
              i,
              { delegate: !n.pluginConfig?.useFocusWithin }
            );
          }),
          e.addTrigger("scroll", (e, t, r, n) => (n({ target: t }), i.noop)),
          e.addTrigger("custom", (e, t, r, n) => {
            let s = e[1],
              a = s.pluginConfig?.eventName;
            return a
              ? r.addEventListener(t, a, n, { delegate: !1, kind: "custom" })
              : i.noop;
          }),
          e.addTrigger("change", (e, t, r, i) =>
            r.addEventListener(t, "change", i)
          );
      }
    },
    969: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "noop", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let r = () => {};
    },
    908: function (e, t, r) {
      var i, n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "CORE_PLUGIN_INFO", {
          enumerable: !0,
          get: function () {
            return s;
          },
        }),
        (i = r(387)),
        (n = t),
        Object.keys(i).forEach(function (e) {
          "default" === e ||
            Object.prototype.hasOwnProperty.call(n, e) ||
            Object.defineProperty(n, e, {
              enumerable: !0,
              get: function () {
                return i[e];
              },
            });
        });
      let s = { namespace: "wf", pluginId: "core", version: "1.0.0" };
    },
    387: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r,
        i,
        n,
        s,
        a = {
          IX3_WF_EXTENSION_KEYS: function () {
            return r;
          },
          TargetScope: function () {
            return i;
          },
        };
      for (var o in a)
        Object.defineProperty(t, o, { enumerable: !0, get: a[o] });
      ((n = r || (r = {})).CLASS = "wf:class"),
        (n.BODY = "wf:body"),
        (n.ID = "wf:id"),
        (n.TRIGGER_ONLY = "wf:trigger-only"),
        (n.SELECTOR = "wf:selector"),
        (n.ATTRIBUTE = "wf:attribute"),
        (n.INST = "wf:inst"),
        (n.STYLE = "wf:style"),
        (n.TRANSFORM = "wf:transform"),
        (n.CLICK = "wf:click"),
        (n.HOVER = "wf:hover"),
        (n.LOAD = "wf:load"),
        (n.FOCUS = "wf:focus"),
        (n.BLUR = "wf:blur"),
        (n.SCROLL = "wf:scroll"),
        (n.CUSTOM = "wf:custom"),
        (n.CHANGE = "wf:change"),
        (n.PREFERS_REDUCED_MOTION = "wf:prefersReducedMotion"),
        (n.WEBFLOW_BREAKPOINTS = "wf:webflowBreakpoints"),
        (n.CUSTOM_MEDIA_QUERY = "wf:customMediaQuery"),
        (n.COLOR_SCHEME = "wf:colorScheme"),
        (n.ELEMENT_DATA_ATTRIBUTE = "wf:elementDataAttribute"),
        (n.CURRENT_TIME = "wf:currentTime"),
        (n.ELEMENT_STATE = "wf:elementState"),
        ((s = i || (i = {})).ALL = "all"),
        (s.PARENT = "parent"),
        (s.CHILDREN = "children"),
        (s.SIBLINGS = "siblings"),
        (s.NEXT = "next"),
        (s.PREVIOUS = "previous"),
        (s.FIRST_ANCESTOR = "first-ancestor"),
        (s.FIRST_DESCENDANT = "first-descendant"),
        (s.DESCENDANTS = "descendants"),
        (s.ANCESTORS = "ancestors");
    },
    983: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = {
        CORE_OPERATORS: function () {
          return s.CORE_OPERATORS;
        },
        TimelineControlType: function () {
          return s.TimelineControlType;
        },
        TweenType: function () {
          return s.TweenType;
        },
      };
      for (var n in i)
        Object.defineProperty(t, n, { enumerable: !0, get: i[n] });
      let s = r(213);
      function a(e, t) {
        return (
          Object.keys(e).forEach(function (r) {
            "default" === r ||
              Object.prototype.hasOwnProperty.call(t, r) ||
              Object.defineProperty(t, r, {
                enumerable: !0,
                get: function () {
                  return e[r];
                },
              });
          }),
          e
        );
      }
      a(r(182), t), a(r(646), t), a(r(686), t);
    },
    646: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = {
        ConditionCategoryBuilder: function () {
          return o;
        },
        DesignBuilder: function () {
          return l;
        },
        TargetCategoryBuilder: function () {
          return s;
        },
        TriggerCategoryBuilder: function () {
          return a;
        },
      };
      for (var i in r)
        Object.defineProperty(t, i, { enumerable: !0, get: r[i] });
      class n {
        categoryId;
        config;
        properties;
        constructor(e, t) {
          (this.categoryId = e), (this.config = t), (this.properties = []);
        }
        addProperty(e, t, r) {
          return (
            this.properties.push({
              id: e,
              schema: { ...t, description: r?.description || t.description },
            }),
            this
          );
        }
        getDefinition() {
          return {
            id: this.categoryId,
            label: this.config.label,
            properties: this.properties,
            propertyType: this.config.propertyType || "tween",
          };
        }
      }
      class s {
        categoryId;
        config;
        targets;
        constructor(e, t) {
          (this.categoryId = e), (this.config = t), (this.targets = []);
        }
        addTargetSchema(e, t) {
          return this.targets.push({ id: e, schema: t }), this;
        }
        getDefinition() {
          return {
            id: this.categoryId,
            label: this.config.label,
            order: this.config.order,
            targets: this.targets,
          };
        }
      }
      class a {
        categoryId;
        config;
        triggers;
        constructor(e, t) {
          (this.categoryId = e), (this.config = t), (this.triggers = []);
        }
        addTriggerSchema(e, t) {
          return this.triggers.push({ id: e, schema: t }), this;
        }
        getDefinition() {
          return {
            id: this.categoryId,
            label: this.config.label,
            order: this.config.order,
            triggers: this.triggers,
          };
        }
      }
      class o {
        categoryId;
        config;
        conditions;
        constructor(e, t) {
          (this.categoryId = e), (this.config = t), (this.conditions = []);
        }
        addConditionSchema(e, t) {
          return this.conditions.push({ id: e, schema: t }), this;
        }
        getDefinition() {
          return {
            id: this.categoryId,
            label: this.config.label,
            order: this.config.order,
            conditions: this.conditions,
          };
        }
      }
      class l {
        baseInfo;
        categories = new Map();
        targetCategories = new Map();
        triggerCategories = new Map();
        conditionCategories = new Map();
        constructor(e) {
          this.baseInfo = e;
        }
        addCategory(e, t) {
          let r = new n(e, t);
          return this.categories.set(e, r), r;
        }
        addTargetCategory(e, t) {
          let r = new s(e, t);
          return this.targetCategories.set(e, r), r;
        }
        addTriggerCategory(e, t) {
          let r = new a(e, t);
          return this.triggerCategories.set(e, r), r;
        }
        addConditionCategory(e, t) {
          let r = new o(e, t);
          return this.conditionCategories.set(e, r), r;
        }
        buildDesign() {
          let e = [];
          for (let [, t] of this.categories) e.push(t.getDefinition());
          let t = [];
          for (let [, e] of this.targetCategories) t.push(e.getDefinition());
          let r = [];
          for (let [, e] of this.triggerCategories) r.push(e.getDefinition());
          let i = [];
          for (let [, e] of this.conditionCategories) i.push(e.getDefinition());
          return {
            namespace: this.baseInfo.namespace,
            pluginId: this.baseInfo.pluginId,
            version: this.baseInfo.version,
            displayName: this.baseInfo.displayName,
            description: this.baseInfo.description,
            categories: e.length > 0 ? e : void 0,
            targetCategories: t.length > 0 ? t : void 0,
            triggerCategories: r.length > 0 ? r : void 0,
            conditionCategories: i.length > 0 ? i : void 0,
          };
        }
      }
    },
    182: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "RuntimeBuilder", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      class r {
        baseInfo;
        extensions = [];
        lifecycle = {};
        constructor(e) {
          this.baseInfo = e;
        }
        addTrigger(e, t) {
          let r = `${this.baseInfo.namespace}:${e}`;
          return (
            this.extensions.push({
              extensionPoint: "trigger",
              id: r,
              triggerType: r,
              implementation: t,
            }),
            this
          );
        }
        addAction(e, t) {
          let r = `${this.baseInfo.namespace}:${e}`;
          return (
            this.extensions.push({
              extensionPoint: "action",
              id: r,
              actionType: r,
              implementation: t,
            }),
            this
          );
        }
        addTargetResolver(e, t) {
          let r = `${this.baseInfo.namespace}:${e}`;
          return (
            this.extensions.push({
              extensionPoint: "targetResolver",
              id: r,
              resolverType: r,
              implementation: t,
            }),
            this
          );
        }
        addCondition(e, t) {
          let r = `${this.baseInfo.namespace}:${e}`;
          return (
            this.extensions.push({
              extensionPoint: "condition",
              id: r,
              conditionType: r,
              implementation: t,
            }),
            this
          );
        }
        onInitialize(e) {
          return (this.lifecycle.initialize = e), this;
        }
        onActivate(e) {
          return (this.lifecycle.activate = e), this;
        }
        onDeactivate(e) {
          return (this.lifecycle.deactivate = e), this;
        }
        onDispose(e) {
          return (this.lifecycle.dispose = e), this;
        }
        createManifest() {
          let e = this.extensions.map((e) => `${e.extensionPoint}:${e.id}`);
          return {
            id: [this.baseInfo.namespace, this.baseInfo.pluginId],
            version: this.baseInfo.version,
            name: this.baseInfo.displayName || this.baseInfo.pluginId,
            description: this.baseInfo.description || "",
            dependencies: this.baseInfo.dependencies,
            features: e,
          };
        }
        buildRuntime() {
          return {
            manifest: this.createManifest(),
            extensions: this.extensions,
            ...this.lifecycle,
          };
        }
      }
    },
    686: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "TransformBuilder", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      class r {
        baseInfo;
        triggerTransforms = new Map();
        targetTransforms = new Map();
        conditionTransforms = new Map();
        actionTransforms = new Map();
        constructor(e) {
          this.baseInfo = e;
        }
        addTargetTransform(e, t) {
          return (
            this.targetTransforms.set(
              this.createExtensionKey(e),
              function (e, r, i) {
                return t(e, r, i);
              }
            ),
            this
          );
        }
        addTriggerTransform(e, t) {
          return (
            this.triggerTransforms.set(
              this.createExtensionKey(e),
              function (e, r, i) {
                return t(e, r, i);
              }
            ),
            this
          );
        }
        addConditionTransform(e, t) {
          return (
            this.conditionTransforms.set(
              this.createExtensionKey(e),
              function (e, r, i) {
                return t(e, r, i);
              }
            ),
            this
          );
        }
        addActionTransform(e, t) {
          return (
            this.actionTransforms.set(
              this.createExtensionKey(e),
              function (e, r, i) {
                return t(e, r, i);
              }
            ),
            this
          );
        }
        createExtensionKey(e) {
          return `${this.baseInfo.namespace}:${e}`;
        }
        buildTransform() {
          return {
            namespace: this.baseInfo.namespace,
            pluginId: this.baseInfo.pluginId,
            version: this.baseInfo.version,
            displayName: this.baseInfo.displayName,
            description: this.baseInfo.description,
            triggerTransforms: this.triggerTransforms,
            targetTransforms: this.targetTransforms,
            conditionTransforms: this.conditionTransforms,
            actionTransforms: this.actionTransforms,
          };
        }
      }
    },
    213: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r,
        i,
        n,
        s,
        a,
        o,
        l = {
          CORE_OPERATORS: function () {
            return n;
          },
          TimelineControlType: function () {
            return r;
          },
          TweenType: function () {
            return i;
          },
        };
      for (var c in l)
        Object.defineProperty(t, c, { enumerable: !0, get: l[c] });
      ((s = r || (r = {})).STANDARD = "standard"),
        (s.SCROLL = "scroll"),
        (s.LOAD = "load"),
        ((a = i || (i = {}))[(a.To = 0)] = "To"),
        (a[(a.From = 1)] = "From"),
        (a[(a.FromTo = 2)] = "FromTo"),
        ((o = n || (n = {})).AND = "wf:and"),
        (o.OR = "wf:or");
    },
    770: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = {
        EASING_NAMES: function () {
          return a.EASING_NAMES;
        },
        IX3: function () {
          return s.IX3;
        },
      };
      for (var n in i)
        Object.defineProperty(t, n, { enumerable: !0, get: i[n] });
      let s = r(968),
        a = r(648);
    },
    54: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "AnimationCoordinator", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = r(648);
      class n {
        timelineDefs;
        getHandler;
        getTargetResolver;
        resolveFn;
        env;
        subs;
        timelineDefaults;
        instantCbCleanupFns;
        constructor(e, t, r, n, s) {
          (this.timelineDefs = e),
            (this.getHandler = t),
            (this.getTargetResolver = r),
            (this.resolveFn = n),
            (this.env = s),
            (this.subs = new Map()),
            (this.timelineDefaults = new Map()),
            (this.instantCbCleanupFns = new Map()),
            (this.getStaggerConfig = (e) => {
              if (!e) return;
              let {
                  ease: t,
                  amount: r,
                  from: n,
                  grid: s,
                  axis: a,
                  each: o,
                } = e,
                l = {};
              return (
                null != r && (l.amount = (0, i.toSeconds)(r)),
                null != o && (l.each = (0, i.toSeconds)(o)),
                null != n && (l.from = n),
                null != s && (l.grid = s),
                null != a && (l.axis = a),
                null != t && (l.ease = i.EASING_NAMES[t] || "none"),
                l
              );
            });
        }
        createTimeline(e, t) {
          let r = t.timelineDefaults;
          this.destroy(e), r && this.timelineDefaults.set(e, r);
          let i = this.timelineDefs.get(e);
          if (!i) return;
          let n = this.isDynamicTimeline(i),
            s = new Set();
          for (let e of t.triggers) {
            let t = e[2];
            t && this.resolveFn(t, {}).forEach((e) => s.add(e));
          }
          if (!s.size || !n) {
            let t = this.buildSubTimeline(e, null);
            this.ensureSubs(e).set(null, t);
          }
          if (s.size) {
            let t = this.ensureSubs(e);
            for (let r of s)
              if (!t.has(r)) {
                let i = n ? this.buildSubTimeline(e, r) : this.getSub(e, null);
                t.set(r, i);
              }
          }
        }
        getTimeline(e, t) {
          return this.getSub(e, t).timeline;
        }
        play(e, t, r) {
          this.getSub(e, t).timeline.play(r ?? void 0);
        }
        pause(e, t, r) {
          let i = this.getSubOrNull(e, t);
          i && (void 0 !== r ? i.timeline.pause(r) : i.timeline.pause());
        }
        resume(e, t, r) {
          this.getSubOrNull(e, t)?.timeline.resume(r);
        }
        reverse(e, t, r) {
          this.getSub(e, t).timeline.reverse(r);
        }
        restart(e, t) {
          this.getSub(e, t).timeline.restart();
        }
        togglePlayReverse(e, t) {
          let r = this.getSub(e, t).timeline,
            i = r.progress();
          0 === i
            ? r.play()
            : 1 === i
            ? r.reverse()
            : r.reversed()
            ? r.play()
            : r.reverse();
        }
        setTimeScale(e, t, r) {
          this.getSubOrNull(e, r)?.timeline.timeScale(t);
        }
        seek(e, t, r) {
          this.getSubOrNull(e, r)?.timeline.seek(t);
        }
        isPlaying(e, t) {
          return !!this.getSubOrNull(e, t)?.timeline.isActive();
        }
        isPaused(e, t) {
          return !!this.getSubOrNull(e, t)?.timeline.paused();
        }
        destroy(e) {
          let t = this.subs.get(e);
          if (t) {
            for (let [, e] of t)
              if (
                (e.timeline && e.timeline.revert(),
                e.splitTextInstances?.length)
              )
                for (let t of e.splitTextInstances) t.revert();
            for (let t of this.instantCbCleanupFns.get(e) ?? []) t();
            this.instantCbCleanupFns.delete(e),
              this.subs.delete(e),
              this.timelineDefaults.delete(e);
          }
        }
        getLineSplitTargets(e, t) {
          let r = new Set(),
            i = [];
          for (let n of e ?? []) {
            if (
              "lines" !== n.splitText &&
              ("object" != typeof n.splitText || n.splitText?.type !== "lines")
            )
              continue;
            let e = "object" == typeof n.splitText ? n.splitText.mask : void 0;
            for (let s of this.collectTargets(n, t))
              r.has(s) || (r.add(s), i.push({ target: s, mask: e }));
          }
          return i;
        }
        createSplitDataArray(e, t, r) {
          if (!this.env.win.SplitText) return [];
          let n = new Map();
          for (let { target: s, mask: a } of this.getLineSplitTargets(e, t)) {
            let e = new this.env.win.SplitText(s, {
              type: "lines",
              autoSplit: !0,
              linesClass: (0, i.defaultSplitClass)("line"),
              mask: a,
            });
            r.splitTextInstances.push(e);
            let t = [];
            e.lines?.length > 0 &&
              (t = Array.isArray(e.lines[0]) ? e.lines.flat() : e.lines),
              n.set(s, t);
          }
          let s = [];
          for (let r of e)
            if (
              "lines" === r.splitText ||
              ("object" == typeof r.splitText && r.splitText?.type === "lines")
            ) {
              let e = this.collectTargets(r, t),
                i = [];
              for (let t of e) {
                let e = n.get(t);
                e && i.push(...e);
              }
              s.push(i.length > 0 ? i : null);
            } else s.push(null);
          return s;
        }
        isDynamicTimeline(e) {
          let t = e.actions;
          if (!t?.length) return !1;
          for (let e of t)
            for (let t of e.targets ?? [])
              if (this.getTargetResolver(t)?.isDynamic) return !0;
          return !1;
        }
        ensureSubs(e) {
          return (
            this.subs.has(e) || this.subs.set(e, new Map()), this.subs.get(e)
          );
        }
        getSub(e, t) {
          let r = this.ensureSubs(e),
            i = r.get(t);
          return i || ((i = this.buildSubTimeline(e, t)), r.set(t, i)), i;
        }
        getSubOrNull(e, t) {
          return this.subs.get(e)?.get(t ?? null);
        }
        convertToGsapDefaults(e) {
          let t = {};
          if (
            (null != e.duration && (t.duration = (0, i.toSeconds)(e.duration)),
            null != e.ease && (t.ease = i.EASING_NAMES[e.ease] || "none"),
            null != e.delay && (t.delay = e.delay),
            null != e.repeat && (t.repeat = e.repeat),
            null != e.repeatDelay &&
              (t.repeatDelay = (0, i.toSeconds)(e.repeatDelay)),
            null != e.stagger)
          ) {
            let r = this.getStaggerConfig(e.stagger);
            r && (t.stagger = r);
          }
          return null != e.yoyo && (t.yoyo = e.yoyo), t;
        }
        buildSubTimeline(e, t) {
          let r,
            i = this.timelineDefs.get(e),
            n = i?.settings,
            s = window.gsap.timeline({
              ...(n ? this.convertToGsapDefaults(n) : {}),
              paused: !0,
              reversed: !!i?.playInReverse,
              data: { id: e, triggerEl: t || void 0 },
            }),
            a = {
              timeline: s,
              splitTextInstances: [],
              alreadySplit: new WeakSet(),
            };
          return (
            i?.actions &&
              (this.env.win.SplitText &&
                i.actions.some(
                  (e) =>
                    "lines" === e.splitText ||
                    ("object" == typeof e.splitText &&
                      e.splitText?.type === "lines")
                ) &&
                (r = this.createSplitDataArray(i.actions, t, a)),
              this.buildTimeline(i, t, a, s, e, r)),
            a
          );
        }
        buildTimeline(e, t, r, i, n, s) {
          let a = new Map();
          for (let o = 0; o < e.actions.length; o++) {
            let l,
              c = e.actions[o];
            if (!c) continue;
            let u = JSON.stringify(c.targets);
            for (let e of Object.values(c.properties ?? {})) {
              let t = a.get(u) || new Set();
              for (let r of (a.set(u, t), Object.keys(e || {})))
                t.has(r) ? (l = !1) : t.add(r);
            }
            let d = s?.[o] || null;
            if (d) this.buildTweensForAction(c, d, r, i, n, l);
            else {
              let e = this.collectTargets(c, t);
              if (!e.length) continue;
              let s = e;
              if (
                (c.splitText &&
                  "lines" !== c.splitText &&
                  e.length &&
                  this.env.win.SplitText &&
                  (s = this.doSplitText(
                    c.splitText,
                    e,
                    r,
                    this.env.win.SplitText
                  )),
                0 === s.length)
              )
                return;
              this.buildTweensForAction(c, s, r, i, n, l);
            }
          }
        }
        collectTargets(e, t) {
          if (!e.targets) return [];
          let r = [];
          for (let i of e.targets ?? []) {
            let e = this.resolveFn(i, t ? { triggerElement: t } : {});
            r.push(...e);
          }
          return r;
        }
        buildTweensForAction(e, t, r, n, s, a) {
          for (let r in e.properties) {
            let o = this.getHandler(r);
            if (!o) continue;
            let l = e.properties[r] || {};
            try {
              let r = e.timing.position;
              if (
                ((r =
                  "string" == typeof r && r.endsWith("ms")
                    ? (0, i.toSeconds)(r)
                    : r),
                o.createTweenConfig)
              ) {
                let s = o.createTweenConfig(l),
                  c = Object.keys(s.from || {}).length > 0,
                  u = Object.keys(s.to || {}).length > 0;
                if (0 === e.tt && !u) continue;
                if (1 === e.tt && !c) continue;
                if (2 === e.tt && !c && !u) continue;
                let d = e.timing?.duration ?? 0.5,
                  h = this.getStaggerConfig(e.timing?.stagger),
                  g = { id: e.id, presetId: e.presetId, color: e.color },
                  f = {
                    force3D: !0,
                    ...(!1 === a && { immediateRender: a }),
                    data: g,
                    ...(e.timing?.duration != null && {
                      duration: (0, i.toSeconds)(d),
                    }),
                    ...(e.timing?.repeat != null && {
                      repeat: e.timing.repeat,
                    }),
                    ...(e.timing?.repeatDelay != null && {
                      repeatDelay: (0, i.toSeconds)(e.timing.repeatDelay),
                    }),
                    ...(e.timing?.ease != null && {
                      ease: i.EASING_NAMES[e.timing.ease] || "none",
                    }),
                    ...(e.timing?.yoyo != null && { yoyo: e.timing.yoyo }),
                    ...(h && { stagger: h }),
                  };
                1 === e.tt
                  ? n.from(t, { ...f, ...s.from }, r || 0)
                  : 2 === e.tt
                  ? n.fromTo(t, { ...s.from }, { ...f, ...s.to }, r || 0)
                  : n.to(t, { ...f, ...s.to }, r || 0);
              } else if (o.createInstantTween) {
                let i = r && 0 !== r ? r : 0.001,
                  { cleanup: a, cb: c } = o.createInstantTween(e, l, t);
                if (a) {
                  let e = this.instantCbCleanupFns.get(s) || new Set();
                  this.instantCbCleanupFns.set(s, e), e.add(a);
                }
                n.add(c, i);
              }
            } catch (e) {
              console.error("Error building tween:", e);
            }
          }
        }
        doSplitText(e, t, r, n) {
          let s, a;
          if ("string" == typeof e) {
            if ("none" === e) return t;
            s = "chars" === e || "words" === e ? e : "words";
          } else
            (s = "chars" === e.type || "words" === e.type ? e.type : "words"),
              (a = e.mask);
          try {
            let e = "chars" === s ? "words, chars" : s,
              o = { type: e };
            "words, chars" === e
              ? ((o.wordsClass = (0, i.defaultSplitClass)("word")),
                (o.charsClass = (0, i.defaultSplitClass)("letter")))
              : "words" === e &&
                (o.wordsClass = (0, i.defaultSplitClass)("word")),
              a && (o.mask = a);
            let l = new n(t, o);
            r.splitTextInstances.push(l);
            let c = "chars" === s ? l.chars : l.words,
              u = [];
            return (
              c.forEach((e) => (Array.isArray(e) ? u.push(...e) : u.push(e))), u
            );
          } catch (e) {
            return t;
          }
        }
        getStaggerConfig;
      }
    },
    651: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ConditionEvaluator", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = r(983);
      class n {
        getConditionEvaluator;
        sharedObservers = new Map();
        conditionCache = new Map();
        CACHE_TTL = 100;
        constructor(e) {
          this.getConditionEvaluator = e;
        }
        evaluateConditionsForTrigger = async (e, t) => {
          if (!e?.length) return !0;
          let r = e.some(([e]) => e === i.CORE_OPERATORS.OR);
          return this.evaluateCondition(
            [r ? i.CORE_OPERATORS.OR : i.CORE_OPERATORS.AND, { conditions: e }],
            t
          );
        };
        observeConditionsForTrigger = (e, t) => {
          if (!e?.length) return () => {};
          let r = [],
            i = [];
          for (let t of e) {
            let e = this.getConditionEvaluator(t);
            e?.isReactive ? r.push(t) : i.push(t[0]);
          }
          if (0 === r.length) return () => {};
          let n = r.map((e) => this.getOrCreateSharedObserver(e, t));
          return () => {
            for (let e of n) e();
          };
        };
        disposeSharedObservers = () => {
          for (let [e, t] of this.sharedObservers)
            try {
              t.cleanup();
            } catch (t) {
              console.error("Error disposing shared observer: %s", e, t);
            }
          this.sharedObservers.clear(), this.conditionCache.clear();
        };
        observeCondition = (e, t) => {
          let r = this.getEvaluator(e);
          if (r?.observe)
            try {
              return r.observe(e, t);
            } catch (e) {
              console.error("Error setting up condition observer:", e);
            }
        };
        getEvaluator = (e) => {
          let [t] = e;
          return t === i.CORE_OPERATORS.AND || t === i.CORE_OPERATORS.OR
            ? this.getLogicalEvaluator(t)
            : this.getConditionEvaluator(e);
        };
        getLogicalEvaluator = (e) => ({
          evaluate: async (t, r) => {
            let [, n, s] = t,
              { conditions: a } = n || {};
            if (!Array.isArray(a)) return !1;
            if (!a.length) return !0;
            let o = e === i.CORE_OPERATORS.OR,
              l = 1 === s;
            for (let e of a) {
              let t = await this.evaluateCondition(e, r);
              if (o ? t : !t) return o ? !l : !!l;
            }
            return o ? !!l : !l;
          },
          observe: (e, t) => {
            let [, r] = e,
              { conditions: i } = r || {};
            if (!Array.isArray(i)) return () => {};
            let n = i.map((r) =>
              this.observeCondition(r, async () =>
                t(await this.evaluateCondition(e))
              )
            );
            return () => n.forEach((e) => e && e());
          },
        });
        evaluateCondition = async (e, t) => {
          let r = this.generateConditionCacheKey(e, t),
            i = Date.now(),
            n = this.conditionCache.get(r);
          if (n && i - n.timestamp < this.CACHE_TTL) return n.result;
          let s = this.getEvaluator(e);
          if (!s)
            return (
              console.warn(`No evaluator found for condition type '${e[0]}'`),
              !1
            );
          try {
            let n = await s.evaluate(e, t);
            return this.conditionCache.set(r, { result: n, timestamp: i }), n;
          } catch (e) {
            return console.error("Error evaluating condition:", e), !1;
          }
        };
        generateConditionCacheKey = (e, t) => {
          let [r, i, n] = e,
            s = i ? JSON.stringify(i) : "",
            a = t ? `:ctx:${t.id}` : "";
          return `${r}:${s}${n ? ":negate" : ""}${a}`;
        };
        invalidateConditionCache = (e) => {
          let [t] = e,
            r = [];
          for (let e of this.conditionCache.keys())
            e.startsWith(`${t}:`) && r.push(e);
          r.forEach((e) => this.conditionCache.delete(e));
        };
        generateObserverKey = (e) => {
          let [t, r, i] = e,
            n = r ? JSON.stringify(r) : "";
          return `${t}:${n}${i ? ":negate" : ""}`;
        };
        getOrCreateSharedObserver = (e, t) => {
          let r = this.generateObserverKey(e),
            i = this.sharedObservers.get(r);
          if (!i) {
            let t = this.getEvaluator(e);
            if (!t?.observe) return () => {};
            let n = new Set(),
              s = t.observe(e, async () => {
                this.invalidateConditionCache(e);
                let t = Array.from(n, async (e) => {
                  try {
                    await e();
                  } catch (e) {
                    console.error("Error in shared observer callback:", e);
                  }
                });
                await Promise.allSettled(t);
              });
            if (!s) return () => {};
            (i = { cleanup: s, refCount: 0, callbacks: n }),
              this.sharedObservers.set(r, i);
          }
          return (
            i.callbacks.add(t),
            i.refCount++,
            () => this.releaseSharedObserver(r, t)
          );
        };
        releaseSharedObserver = (e, t) => {
          let r = this.sharedObservers.get(e);
          if (
            r &&
            r.callbacks.delete(t) &&
            ((r.refCount = Math.max(0, r.refCount - 1)),
            r.refCount <= 0 && 0 === r.callbacks.size)
          ) {
            try {
              r.cleanup();
            } catch (e) {
              console.error("Error cleaning up shared observer:", e);
            }
            this.sharedObservers.delete(e);
          }
        };
      }
    },
    44: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "EventManager", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let i = r(648);
      class n {
        static instance;
        elementHandlers = new WeakMap();
        eventTypeHandlers = new Map();
        customEventTypes = new Map();
        delegatedHandlers = new Map();
        batchedEvents = new Map();
        batchFrameId = null;
        defaultMaxBatchSize = 10;
        defaultMaxBatchAge = 100;
        defaultErrorHandler = (e, t) =>
          console.error("[EventManager] Error handling event:", e, t);
        constructor() {}
        static getInstance() {
          return n.instance || (n.instance = new n()), n.instance;
        }
        addEventListener(e, t, r, i) {
          try {
            var n;
            let a = i?.kind === "custom",
              o = {
                ...(a ? { delegate: !1, passive: !0, batch: !1 } : s[t] || {}),
                ...i,
                errorHandler: i?.errorHandler || this.defaultErrorHandler,
              };
            if (!a && "load" === t && "complete" in e && e.complete)
              return (
                setTimeout(() => {
                  try {
                    r(new Event("load"), e);
                  } catch (e) {
                    o.errorHandler?.(e, new Event("load"));
                  }
                }, 0),
                () => {}
              );
            if (!e || !e.addEventListener)
              throw Error("Invalid element provided to addEventListener");
            let l = this.createWrappedHandler(r, o, e),
              c = this.registerHandler(e, t, r, l.handler, o, a, l.cleanup);
            if (a)
              return () => {
                this.removeHandler(e, t, r, !0), c.cleanup?.();
              };
            let u = new AbortController();
            return (
              this.ensureDelegatedHandler(t),
              o.delegate ||
                ((n = o),
                ("window" === n.target
                  ? window
                  : "document" === n.target
                  ? document
                  : null) || e).addEventListener(t, c.wrappedHandler, {
                  passive: o.passive,
                  signal: u.signal,
                }),
              () => {
                u.abort(), this.removeHandler(e, t, r, !1);
              }
            );
          } catch (e) {
            return i?.errorHandler?.(e, new Event(t)), () => {};
          }
        }
        emit(e, t, r, i) {
          try {
            let n = this.customEventTypes.get(e);
            if (!n?.size) return;
            let s = new CustomEvent(e, {
              detail: t,
              bubbles: i?.bubbles ?? !0,
              cancelable: !0,
            });
            for (let t of n)
              if (!r || r === t.element || t.element.contains(r))
                try {
                  t.wrappedHandler(s);
                } catch (t) {
                  console.error(`[EventManager] Error emitting ${e}:`, t);
                }
          } catch (t) {
            console.error(
              `[EventManager] Error emitting custom event ${e}:`,
              t
            );
          }
        }
        dispose() {
          for (let [, e] of (null !== this.batchFrameId &&
            (cancelAnimationFrame(this.batchFrameId),
            (this.batchFrameId = null),
            this.batchedEvents.clear()),
          this.delegatedHandlers))
            e.controller.abort();
          for (let [, e] of this.eventTypeHandlers)
            for (let t of e) t.cleanup?.();
          for (let [, e] of this.customEventTypes)
            for (let t of e) t.cleanup?.();
          this.delegatedHandlers.clear(),
            (this.elementHandlers = new WeakMap()),
            this.eventTypeHandlers.clear(),
            this.customEventTypes.clear();
        }
        createWrappedHandler(e, t, r) {
          let n = (i) => {
            try {
              let n =
                "window" === t.target
                  ? window
                  : "document" === t.target
                  ? document
                  : r;
              e(i, n);
            } catch (e) {
              (t.errorHandler || this.defaultErrorHandler)(e, i);
            }
          };
          if (t.batch) {
            let e = (e) => {
              let t = e.type || "unknown";
              this.batchedEvents.has(t) || this.batchedEvents.set(t, []),
                this.batchedEvents
                  .get(t)
                  .push({
                    event: e,
                    target: r,
                    timestamp: e.timeStamp || performance.now(),
                  }),
                null == this.batchFrameId &&
                  (this.batchFrameId = requestAnimationFrame(() =>
                    this.processBatchedEvents()
                  ));
            };
            return t.throttleMs && t.throttleMs > 0
              ? { handler: e, cleanup: (0, i.throttle)(n, t.throttleMs).cancel }
              : t.debounceMs && t.debounceMs > 0
              ? { handler: e, cleanup: (0, i.debounce)(n, t.debounceMs).cancel }
              : { handler: e };
          }
          if (t.throttleMs && t.throttleMs > 0) {
            let e = (0, i.throttle)(n, t.throttleMs);
            if (t.debounceMs && t.debounceMs > 0) {
              let r = (0, i.debounce)(e, t.debounceMs);
              return {
                handler: r,
                cleanup: () => {
                  r.cancel?.(), e.cancel?.();
                },
              };
            }
            return { handler: e, cleanup: e.cancel };
          }
          if (t.debounceMs && t.debounceMs > 0) {
            let e = (0, i.debounce)(n, t.debounceMs);
            return { handler: e, cleanup: e.cancel };
          }
          return { handler: n };
        }
        processBatchedEvents() {
          if (null === this.batchFrameId) return;
          this.batchFrameId = null;
          let e = performance.now();
          for (let [t, r] of this.batchedEvents) {
            let i = this.eventTypeHandlers.get(t);
            if (!i?.size) continue;
            let n = r.filter((t) => e - t.timestamp < this.defaultMaxBatchAge);
            if (!n.length) continue;
            n.sort((e, t) => e.timestamp - t.timestamp);
            let s =
              n.length <= this.defaultMaxBatchSize
                ? n
                : n.slice(-this.defaultMaxBatchSize);
            for (let { event: t, target: r } of s)
              for (let n of ((t.batchTimestamp = e),
              (t.batchSize = s.length),
              i))
                try {
                  n.config.delegate
                    ? n.wrappedHandler(t)
                    : ("window" === n.config.target ||
                        "document" === n.config.target ||
                        r === t.target ||
                        r.contains(t.target)) &&
                      n.wrappedHandler(t);
                } catch (e) {
                  (n.config.errorHandler || this.defaultErrorHandler)(e, t);
                }
          }
          this.batchedEvents.clear();
        }
        ensureDelegatedHandler(e) {
          if (this.delegatedHandlers.has(e)) return;
          let t = new AbortController(),
            r = (t) => {
              let r = this.eventTypeHandlers.get(e);
              if (r?.size) {
                for (let i of t.composedPath
                  ? t.composedPath()
                  : t.target
                  ? [t.target]
                  : [])
                  if (i instanceof Element) {
                    for (let n of r)
                      if (
                        n.config.delegate &&
                        (n.element === i || n.element.contains(i))
                      )
                        try {
                          n.wrappedHandler(t);
                        } catch (t) {
                          console.error(`[EventDelegator] Error for ${e}:`, t);
                        }
                    if (!t.bubbles) break;
                  }
              }
            },
            i = [
              "focus",
              "blur",
              "focusin",
              "focusout",
              "mouseenter",
              "mouseleave",
            ].includes(e);
          document.addEventListener(e, r, {
            passive: !1,
            capture: i,
            signal: t.signal,
          }),
            this.delegatedHandlers.set(e, { handler: r, controller: t });
        }
        registerHandler(e, t, r, i, n, s, a) {
          let o = {
            element: e,
            originalHandler: r,
            wrappedHandler: i,
            config: n,
            cleanup: a,
          };
          if (s) {
            let e = this.customEventTypes.get(t) || new Set();
            e.add(o), this.customEventTypes.set(t, e);
          } else {
            let r = this.elementHandlers.get(e) || new Set();
            r.add(o), this.elementHandlers.set(e, r);
            let i = this.eventTypeHandlers.get(t) || new Set();
            i.add(o), this.eventTypeHandlers.set(t, i);
          }
          return o;
        }
        removeHandler(e, t, r, i) {
          if (i) {
            let i = this.customEventTypes.get(t);
            if (i?.size) {
              for (let n of i)
                if (n.element === e && n.originalHandler === r) {
                  i.delete(n),
                    i.size || this.customEventTypes.delete(t),
                    n.cleanup?.();
                  break;
                }
            }
          } else {
            let i,
              n = this.eventTypeHandlers.get(t);
            if (!n?.size) return;
            let s = this.elementHandlers.get(e);
            if (!s?.size) return;
            for (let e of s)
              if (e.originalHandler === r) {
                i = e;
                break;
              }
            if (i) {
              if ((s.delete(i), n.delete(i), !n.size)) {
                this.eventTypeHandlers.delete(t);
                let e = this.delegatedHandlers.get(t);
                e && (e.controller.abort(), this.delegatedHandlers.delete(t));
              }
              i.cleanup?.();
            }
          }
        }
      }
      let s = {
        load: { delegate: !1, passive: !0 },
        DOMContentLoaded: { target: "document", passive: !0 },
        readystatechange: { target: "document", passive: !0 },
        beforeunload: { target: "window", passive: !1 },
        unload: { target: "window", passive: !1 },
        pageshow: { target: "window", passive: !0 },
        pagehide: { target: "window", passive: !0 },
        click: { delegate: !0, passive: !1 },
        dblclick: { delegate: !0, passive: !0 },
        mousedown: { delegate: !0, passive: !0 },
        mouseup: { delegate: !0, passive: !0 },
        mousemove: { delegate: !0, batch: !0, passive: !0 },
        mouseenter: { delegate: !1, passive: !0 },
        mouseleave: { delegate: !1, passive: !0 },
        mouseout: { delegate: !0, passive: !0 },
        contextmenu: { delegate: !0, passive: !1 },
        wheel: { delegate: !0, throttleMs: 16, passive: !0, batch: !0 },
        touchstart: { delegate: !0, passive: !0 },
        touchend: { delegate: !0, passive: !1 },
        touchmove: { delegate: !0, batch: !0, passive: !0 },
        touchcancel: { delegate: !0, passive: !0 },
        pointerdown: { delegate: !0, passive: !0 },
        pointerup: { delegate: !0, passive: !0 },
        pointermove: { delegate: !0, batch: !0, passive: !0 },
        pointerenter: { delegate: !1, passive: !0 },
        pointerleave: { delegate: !1, passive: !0 },
        pointercancel: { delegate: !0, passive: !0 },
        keydown: { delegate: !0, passive: !1 },
        keyup: { delegate: !0, passive: !1 },
        keypress: { delegate: !0, passive: !1 },
        input: { delegate: !0, passive: !1 },
        change: { delegate: !0, passive: !1 },
        focus: { delegate: !1, passive: !0 },
        blur: { delegate: !1, passive: !0 },
        focusin: { delegate: !0, passive: !0 },
        focusout: { delegate: !0, passive: !0 },
        submit: { delegate: !0, passive: !1 },
        reset: { delegate: !0, passive: !1 },
        select: { delegate: !0, passive: !0 },
        selectionchange: { target: "document", passive: !0 },
        dragstart: { delegate: !0, passive: !1 },
        drag: { delegate: !0, passive: !0 },
        dragenter: { delegate: !0, passive: !1 },
        dragleave: { delegate: !0, passive: !0 },
        dragover: { delegate: !0, passive: !1 },
        drop: { delegate: !0, passive: !1 },
        dragend: { delegate: !0, passive: !0 },
        play: { delegate: !0, passive: !0 },
        pause: { delegate: !0, passive: !0 },
        ended: { delegate: !0, passive: !0 },
        timeupdate: { delegate: !0, batch: !0, passive: !0 },
        canplay: { delegate: !0, passive: !0 },
        canplaythrough: { delegate: !0, passive: !0 },
        loadeddata: { delegate: !0, passive: !0 },
        animationstart: { delegate: !0, passive: !0 },
        animationend: { delegate: !0, passive: !0 },
        animationiteration: { delegate: !0, passive: !0 },
        transitionstart: { delegate: !0, passive: !0 },
        transitionend: { delegate: !0, passive: !0 },
        transitionrun: { delegate: !0, passive: !0 },
        transitioncancel: { delegate: !0, passive: !0 },
        scroll: { delegate: !1, throttleMs: 16, passive: !0 },
        resize: { target: "window", throttleMs: 16, passive: !0 },
        intersection: { delegate: !1, passive: !0 },
        orientationchange: { target: "window", passive: !0 },
        visibilitychange: { target: "document", passive: !0 },
        storage: { target: "window", passive: !0 },
        online: { target: "window", passive: !0 },
        offline: { target: "window", passive: !0 },
        hashchange: { target: "window", passive: !0 },
        popstate: { target: "window", passive: !0 },
        copy: { delegate: !0, passive: !1 },
        cut: { delegate: !0, passive: !1 },
        paste: { delegate: !0, passive: !1 },
        compositionstart: { delegate: !0, passive: !1 },
        compositionupdate: { delegate: !0, passive: !1 },
        compositionend: { delegate: !0, passive: !1 },
        beforeinput: { delegate: !0, passive: !1 },
      };
    },
    968: function (e, t, r) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "IX3", {
          enumerable: !0,
          get: function () {
            return c;
          },
        });
      let i = r(983),
        n = r(44),
        s = r(54),
        a = r(651),
        o = r(912),
        l = r(648);
      class c {
        env;
        static instance;
        pluginReg;
        timelineDefs;
        timelineDatas;
        interactions;
        triggeredElements;
        scrollTriggers;
        triggerCleanupFunctions;
        windowSize;
        prevWindowSize;
        windowResizeSubscribers;
        debouncedWindowResize;
        bodyResizeObserver;
        triggerObservers;
        timelineRefCounts;
        interactionTimelineRefs;
        reactiveCallbackQueues;
        debouncedReactiveCallback;
        pendingReactiveUpdates;
        reactiveExecutionContext;
        eventMgr;
        loadInteractions;
        coordinator;
        conditionEval;
        constructor(e) {
          (this.env = e),
            (this.pluginReg = new o.PluginRegistry()),
            (this.timelineDefs = new Map()),
            (this.timelineDatas = new Map()),
            (this.interactions = new Map()),
            (this.triggeredElements = new Map()),
            (this.scrollTriggers = new Map()),
            (this.triggerCleanupFunctions = new Map()),
            (this.windowSize = { w: 0, h: 0 }),
            (this.prevWindowSize = { w: 0, h: 0 }),
            (this.windowResizeSubscribers = new Set()),
            (this.debouncedWindowResize = (0, l.debounce)(() => {
              for (let e of this.windowResizeSubscribers) e();
            }, 200)),
            (this.bodyResizeObserver = null),
            (this.triggerObservers = new Map()),
            (this.timelineRefCounts = new Map()),
            (this.interactionTimelineRefs = new Map()),
            (this.reactiveCallbackQueues = new Map()),
            (this.pendingReactiveUpdates = new Map()),
            (this.reactiveExecutionContext = new Set()),
            (this.eventMgr = n.EventManager.getInstance()),
            (this.loadInteractions = []),
            (this.addEventListener = this.eventMgr.addEventListener.bind(
              this.eventMgr
            )),
            (this.emit = this.eventMgr.emit.bind(this.eventMgr)),
            (this.resolveTargets = (e, t) => {
              let r = this.pluginReg.getTargetResolver(e);
              return r
                ? r.resolve(e, t)
                : (console.warn("No target resolver:", e[0]), []);
            }),
            window.addEventListener("resize", this.debouncedWindowResize),
            (this.coordinator = new s.AnimationCoordinator(
              this.timelineDefs,
              this.pluginReg.getActionHandler.bind(this.pluginReg),
              this.pluginReg.getTargetResolver.bind(this.pluginReg),
              this.resolveTargets,
              e
            )),
            (this.conditionEval = new a.ConditionEvaluator(
              this.pluginReg.getConditionEvaluator.bind(this.pluginReg)
            )),
            (this.debouncedReactiveCallback = (0, l.debounce)(
              () => this.processPendingReactiveUpdates(),
              16,
              { leading: !1, trailing: !0, maxWait: 100 }
            ));
        }
        getCoordinator() {
          return this.coordinator;
        }
        addEventListener;
        emit;
        static async init(e) {
          return (this.instance = new c(e)), this.instance;
        }
        async registerPlugin(e) {
          await this.pluginReg.registerPlugin(e);
        }
        register(e, t) {
          if (t?.length) for (let e of t) this.timelineDefs.set(e.id, e);
          if (e?.length) {
            for (let t of e) {
              if (this.interactions.has(t.id)) {
                console.warn(
                  `Interaction with ID ${t.id} already exists. Use update() to modify it.`
                );
                continue;
              }
              this.interactions.set(t.id, t);
              let e = new Set();
              for (let r of (this.interactionTimelineRefs.set(t.id, e),
              t.timelineIds ?? []))
                e.add(r),
                  this.incrementTimelineRefCount(r),
                  this.coordinator.createTimeline(r, t);
              for (let e of t.triggers ?? []) this.bindTrigger(e, t);
            }
            for (let e of this.loadInteractions) e();
            if (
              ((this.loadInteractions.length = 0), this.scrollTriggers.size > 0)
            ) {
              this.windowResizeSubscribers.add(() => {
                (this.windowSize.h = window.innerHeight),
                  (this.windowSize.w = window.innerWidth);
              });
              let e = (0, l.debounce)(
                  () => {
                    (this.prevWindowSize.h = this.windowSize.h),
                      (this.prevWindowSize.w = this.windowSize.w);
                  },
                  210,
                  { leading: !0, trailing: !1 }
                ),
                t = (0, l.debounce)(() => {
                  if (
                    this.windowSize.h === this.prevWindowSize.h &&
                    this.windowSize.w === this.prevWindowSize.w
                  )
                    for (let e of this.scrollTriggers.values()) e.refresh();
                }, 210);
              (this.bodyResizeObserver = new ResizeObserver((r) => {
                for (let i of r) i.target === document.body && (e(), t());
              })),
                document.body && this.bodyResizeObserver.observe(document.body);
            }
          }
          return this;
        }
        remove(e) {
          for (let t of Array.isArray(e) ? e : [e]) {
            if (!this.interactions.has(t)) {
              console.warn(
                `Interaction with ID ${t} not found, skipping removal.`
              );
              continue;
            }
            this.cleanupTriggerObservers(t), this.unbindAllTriggers(t);
            let e = this.decrementTimelineReferences(t);
            this.cleanupUnusedTimelines(e),
              this.interactions.delete(t),
              this.triggeredElements.delete(t),
              this.interactionTimelineRefs.delete(t);
          }
          return this;
        }
        update(e, t) {
          let r = Array.isArray(e) ? e : [e],
            i = t ? (Array.isArray(t) ? t : [t]) : [];
          for (let e of (i.length && this.register([], i), r)) {
            let { id: t } = e;
            if (!this.interactions.has(t)) {
              console.warn(
                `Interaction with ID ${t} not found, registering as new.`
              ),
                this.register([e], []);
              continue;
            }
            this.remove(t), this.register([e], []);
          }
          return this;
        }
        cleanupUnusedTimelines(e) {
          for (let t of e) {
            this.coordinator.destroy(t), this.timelineDefs.delete(t);
            let e = `st_${t}_`;
            for (let [t, r] of this.scrollTriggers.entries())
              t.startsWith(e) && (r.kill(), this.scrollTriggers.delete(t));
          }
        }
        destroy() {
          let e = Array.from(this.interactions.keys());
          for (let t of (this.remove(e),
          (this.loadInteractions.length = 0),
          Array.from(this.timelineDatas.keys())))
            this.coordinator.destroy(t);
          this.env.win.ScrollTrigger &&
            (this.env.win.ScrollTrigger.getAll().forEach((e) => e.kill()),
            this.bodyResizeObserver?.disconnect(),
            (this.bodyResizeObserver = null)),
            window.removeEventListener("resize", this.debouncedWindowResize);
          try {
            this.debouncedReactiveCallback.cancel();
          } catch (e) {
            console.error(
              "Error canceling debounced callback during destroy:",
              e
            );
          }
          this.pendingReactiveUpdates.clear(),
            this.reactiveCallbackQueues.clear(),
            this.reactiveExecutionContext.clear(),
            this.conditionEval.disposeSharedObservers(),
            this.windowResizeSubscribers.clear(),
            this.timelineDatas.clear(),
            this.timelineDefs.clear(),
            this.interactions.clear(),
            this.triggeredElements.clear(),
            this.triggerCleanupFunctions.clear(),
            this.triggerObservers.clear(),
            this.scrollTriggers.clear(),
            this.interactionTimelineRefs.clear();
        }
        bindTrigger(e, t) {
          let r = t.id,
            n = this.pluginReg.getTriggerHandler(e),
            s = e[1];
          if (!n) return void console.warn("No trigger handler:", e[0]);
          let a = this.triggerCleanupFunctions.get(r) || new Map();
          this.triggerCleanupFunctions.set(r, a);
          let { delay: o = 0, controlType: c, scrollTriggerConfig: u } = s,
            d = (0, l.toSeconds)(o),
            h = { addEventListener: this.addEventListener, emit: this.emit },
            g = e[2],
            f = [];
          if (
            (g && (f = this.resolveTargets(g, {})),
            c === i.TimelineControlType.LOAD)
          ) {
            if (window.__wf_ix3) return;
            this.loadInteractions.push(() => {
              let e = () => {
                for (let e = 0; e < t.timelineIds?.length; e++) {
                  let r = t.timelineIds[e];
                  r && this.runTimelineAction(r, s, null);
                }
              };
              d ? setTimeout(e, 1e3 * d) : e();
            });
          } else if (c === i.TimelineControlType.SCROLL) {
            if (!u) return;
            for (let e = 0; e < f.length; e++) {
              let i = f[e];
              if (i)
                for (let e of t.timelineIds ?? [])
                  this.setupScrollControl(e, r, u, i);
            }
          } else if (c === i.TimelineControlType.STANDARD || (!c && e[2]))
            for (let t = 0; t < f.length; t++) {
              let i = f[t];
              if (!i) continue;
              let o = a.get(i) || new Set();
              a.set(i, o);
              let l = n(e, i, h, () => {
                s.conditionalLogic
                  ? this.runTrigger(e, i, r).catch((e) =>
                      console.error("Error in trigger execution:", e)
                    )
                  : d
                  ? setTimeout(() => {
                      this.runTrigger(e, i, r).catch((e) =>
                        console.error("Error in delayed trigger execution:", e)
                      );
                    }, 1e3 * d)
                  : this.runTrigger(e, i, r).catch((e) =>
                      console.error("Error in trigger execution:", e)
                    );
              });
              l && o.add(l);
            }
          s.conditionalLogic && this.setupTriggerReactiveMonitoring(e, t);
        }
        setupTriggerReactiveMonitoring(e, t) {
          let { conditionalLogic: r } = e[1];
          if (!r) return;
          let i = `${t.id}:${t.triggers.indexOf(e)}`;
          try {
            let e = this.conditionEval.observeConditionsForTrigger(
                r.conditions,
                async () => {
                  await this.executeReactiveCallbackSafely(
                    t.id,
                    i,
                    async () => {
                      let e =
                        (await this.conditionEval.evaluateConditionsForTrigger(
                          r.conditions,
                          t
                        ))
                          ? r.ifTrue
                          : r.ifFalse;
                      if (e) {
                        let r = this.triggeredElements.get(t.id);
                        if (!r) return;
                        let i = [];
                        for (let e of r)
                          for (let r of t.timelineIds ?? [])
                            i.push({
                              timelineId: r,
                              element: e,
                              action: "pause-reset",
                            });
                        await this.executeTimelineOperationsAsync(i),
                          r.forEach((r) => {
                            this.executeConditionalOutcome(e, r, t);
                          });
                      }
                    }
                  );
                }
              ),
              n = this.triggerObservers.get(t.id);
            n || ((n = new Map()), this.triggerObservers.set(t.id, n)),
              n.set(i, e);
          } catch (e) {
            console.error("Error setting up trigger reactive monitoring:", e);
          }
        }
        async executeReactiveCallbackSafely(e, t, r) {
          this.reactiveExecutionContext.has(t) ||
            (this.pendingReactiveUpdates.set(t, r),
            this.debouncedReactiveCallback());
        }
        async processPendingReactiveUpdates() {
          if (0 === this.pendingReactiveUpdates.size) return;
          let e = new Map(this.pendingReactiveUpdates);
          this.pendingReactiveUpdates.clear();
          let t = new Map();
          for (let [r, i] of e) {
            let e = r.split(":")[0];
            t.has(e) || t.set(e, []),
              t.get(e).push({ triggerKey: r, callback: i });
          }
          for (let [e, r] of t)
            await this.processInteractionReactiveUpdates(e, r);
        }
        async processInteractionReactiveUpdates(e, t) {
          let r = this.reactiveCallbackQueues.get(e);
          if (r)
            try {
              await r;
            } catch (e) {
              console.error("Error waiting for pending reactive callback:", e);
            }
          let i = this.executeInteractionUpdates(t);
          this.reactiveCallbackQueues.set(e, i);
          try {
            await i;
          } finally {
            this.reactiveCallbackQueues.get(e) === i &&
              this.reactiveCallbackQueues.delete(e);
          }
        }
        async executeInteractionUpdates(e) {
          for (let { triggerKey: t, callback: r } of e) {
            this.reactiveExecutionContext.add(t);
            try {
              await r();
            } catch (e) {
              console.error("Error in reactive callback for %s:", t, e);
            } finally {
              this.reactiveExecutionContext.delete(t);
            }
          }
        }
        async executeTimelineOperationsAsync(e) {
          if (e.length)
            return new Promise((t) => {
              Promise.resolve().then(() => {
                e.forEach(({ timelineId: e, element: t, action: r }) => {
                  try {
                    if (!this.timelineDefs.has(e))
                      return void console.warn(
                        `Timeline ${e} not found, skipping operation`
                      );
                    if (!t.isConnected)
                      return void console.warn(
                        "Element no longer in DOM, skipping timeline operation"
                      );
                    "pause-reset" === r
                      ? this.coordinator.pause(e, t, 0)
                      : console.warn(`Unknown timeline action: ${r}`);
                  } catch (t) {
                    console.error(
                      "Error executing timeline operation: %s, %s",
                      r,
                      e,
                      t
                    );
                  }
                }),
                  t();
              });
            });
        }
        async runTrigger(e, t, r) {
          if (window.__wf_ix3) return;
          let i = e[1],
            n = this.triggeredElements.get(r);
          n || this.triggeredElements.set(r, (n = new Set())), n.add(t);
          let s = this.interactions.get(r);
          if (s && s.triggers.includes(e))
            if (i.conditionalLogic)
              try {
                let e = (await this.conditionEval.evaluateConditionsForTrigger(
                  i.conditionalLogic.conditions,
                  s
                ))
                  ? i.conditionalLogic.ifTrue
                  : i.conditionalLogic.ifFalse;
                e && this.executeConditionalOutcome(e, t, s);
              } catch (e) {
                console.error("Error evaluating trigger conditional logic:", e),
                  s.timelineIds.forEach((e) => this.runTimelineAction(e, i, t));
              }
            else s.timelineIds.forEach((e) => this.runTimelineAction(e, i, t));
        }
        executeConditionalOutcome(e, t, r) {
          let i,
            {
              control: n,
              targetTimelineId: s,
              speed: a,
              jump: o,
              delay: c = 0,
            } = e,
            u = (0, l.toSeconds)(c);
          if ("none" === n) return;
          if (s) {
            if (!r.timelineIds.includes(s))
              return void console.warn(
                `Target timeline '${s}' not found in interaction '${
                  r.id
                }'. Available timelines: ${r.timelineIds.join(", ")}`
              );
            i = [s];
          } else i = r.timelineIds;
          let d = () => {
            i.forEach((e) => {
              void 0 !== a && this.coordinator.setTimeScale(e, a, t);
              let r = (0, l.toSeconds)(o);
              switch (n) {
                case "play":
                  this.coordinator.play(e, t, r);
                  break;
                case "pause":
                case "stop":
                  this.coordinator.pause(e, t, r);
                  break;
                case "resume":
                  this.coordinator.resume(e, t, r);
                  break;
                case "reverse":
                  this.coordinator.reverse(e, t, r);
                  break;
                case "restart":
                default:
                  this.coordinator.restart(e, t);
                  break;
                case "togglePlayReverse":
                  this.coordinator.togglePlayReverse(e, t);
              }
            });
          };
          u
            ? setTimeout(() => {
                d();
              }, 1e3 * u)
            : d();
        }
        setupScrollControl(e, t, r, i) {
          if (void 0 === this.env.win.ScrollTrigger)
            return void console.warn("ScrollTrigger plugin is not available.");
          let n = `st_${e}_${t}_${
            i.id || window.crypto.randomUUID().slice(0, 8)
          }`;
          this.scrollTriggers.has(n) && this.cleanupScrollTrigger(n);
          let s = this.coordinator.getTimeline(e, i);
          if (!s) return void console.warn(`Timeline ${e} not found`);
          let a = (function (e, t, r, i, n) {
              let s = (function (e, t, r) {
                  let i = {},
                    n = (e) =>
                      e &&
                      (e.parentElement === document.body ||
                        e === document.body);
                  if (void 0 !== e.pin)
                    if ("boolean" == typeof e.pin)
                      e.pin && !n(t) && (i.pin = e.pin);
                    else {
                      let s = r(e.pin, { triggerElement: t });
                      s.length > 0 && !n(s[0]) && (i.pin = s[0]);
                    }
                  if (e.endTrigger) {
                    let n = r(e.endTrigger, { triggerElement: t });
                    n.length > 0 && (i.endTrigger = n[0]);
                  }
                  if (e.scroller) {
                    let n = r(e.scroller, { triggerElement: t });
                    n.length > 0 ? (i.scroller = n[0]) : (i.scroller = window);
                  }
                  return i;
                })(e, t, n),
                a = [
                  e.enter || "none",
                  e.leave || "none",
                  e.enterBack || "none",
                  e.leaveBack || "none",
                ],
                o = {
                  trigger: t,
                  markers: e.showMarkers ?? !1,
                  start: e.clamp
                    ? `clamp(${e.start})`
                    : e.start || "top bottom",
                  end: e.clamp ? `clamp(${e.end})` : e.end || "bottom top",
                  scrub: e.scrub ?? !1,
                  horizontal: e.horizontal || !1,
                  toggleActions: a.join(" "),
                  id: r,
                  ...s,
                };
              return (
                !1 !== o.scrub
                  ? (o.animation = i)
                  : Object.assign(
                      o,
                      (function (e, t) {
                        let [r, i, n, s] = e,
                          a = (e) => () => {
                            if (void 0 !== e)
                              switch (e) {
                                case "play":
                                  t.play();
                                  break;
                                case "pause":
                                  t.pause();
                                  break;
                                case "resume":
                                  t.resume();
                                  break;
                                case "reverse":
                                  t.reverse();
                                  break;
                                case "restart":
                                  t.restart();
                                  break;
                                case "reset":
                                  t.pause(0);
                                  break;
                                case "complete":
                                  t.progress(1);
                              }
                          },
                          o = {};
                        return (
                          "none" !== r && (o.onEnter = a(r)),
                          "none" !== i && (o.onLeave = a(i)),
                          "none" !== n && (o.onEnterBack = a(n)),
                          "none" !== s && (o.onLeaveBack = a(s)),
                          o
                        );
                      })(a, i)
                    ),
                o
              );
            })(r, i, n, s, this.resolveTargets),
            o = this.env.win.ScrollTrigger;
          try {
            let e = o.create(a);
            this.scrollTriggers.set(n, e);
          } catch (e) {
            console.error("Failed to create ScrollTrigger:", e);
          }
        }
        cleanupScrollTrigger(e) {
          let t = this.scrollTriggers.get(e);
          t && (t.kill(), this.scrollTriggers.delete(e));
        }
        runTimelineAction(e, t, r) {
          this.coordinator.setTimeScale(e, t.speed ?? 1, r);
          let i = (0, l.toSeconds)(t.jump);
          switch (t.control) {
            case "play":
              this.coordinator.play(e, r, i);
              break;
            case "pause":
            case "stop":
              this.coordinator.pause(e, r, i);
              break;
            case "resume":
              this.coordinator.resume(e, r, i);
              break;
            case "reverse":
              this.coordinator.reverse(e, r, i);
              break;
            case "restart":
            case void 0:
              this.coordinator.restart(e, r);
              break;
            case "togglePlayReverse":
              this.coordinator.togglePlayReverse(e, r);
              break;
            case "none":
              break;
            default:
              t.control;
          }
        }
        resolveTargets;
        incrementTimelineRefCount(e) {
          let t = this.timelineRefCounts.get(e) || 0;
          this.timelineRefCounts.set(e, t + 1);
        }
        decrementTimelineRefCount(e) {
          let t = Math.max(0, (this.timelineRefCounts.get(e) || 0) - 1);
          return this.timelineRefCounts.set(e, t), t;
        }
        decrementTimelineReferences(e) {
          let t = new Set(),
            r = this.interactionTimelineRefs.get(e);
          if (!r) return t;
          for (let e of r) 0 === this.decrementTimelineRefCount(e) && t.add(e);
          return t;
        }
        unbindAllTriggers(e) {
          let t = this.triggerCleanupFunctions.get(e);
          if (t) {
            for (let [, e] of t)
              for (let t of e)
                try {
                  t();
                } catch (e) {
                  console.error("Error during trigger cleanup:", e);
                }
            this.triggerCleanupFunctions.delete(e);
          }
        }
        cleanupTriggerObservers(e) {
          let t = this.triggerObservers.get(e);
          if (t) {
            for (let [e, r] of t) {
              try {
                r();
              } catch (e) {
                console.error("Error during trigger observer cleanup:", e);
              }
              this.pendingReactiveUpdates.delete(e),
                this.reactiveExecutionContext.delete(e);
            }
            this.reactiveCallbackQueues.delete(e),
              this.triggerObservers.delete(e);
          }
        }
      }
    },
    912: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "PluginRegistry", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      class r {
        plugins = new Map();
        extensionsByPoint = new Map();
        activePlugins = new Set();
        pluginStorage = new Map();
        constructor() {
          ["trigger", "action", "targetResolver", "condition"].forEach((e) =>
            this.extensionsByPoint.set(e, new Map())
          );
        }
        async registerPlugin(e) {
          let t = i(e.manifest.id);
          if (this.plugins.has(t))
            throw Error(`Plugin ${t} is already registered`);
          let r = Object.entries(e.manifest.dependencies ?? {});
          for (let [e] of r)
            if (!this.plugins.has(e))
              throw Error(`Missing dependency: ${e} required by ${t}`);
          for (let r of (this.plugins.set(t, e),
          e.initialize && (await e.initialize()),
          e.extensions))
            this.registerExtension(r);
          r.length || (await this.activatePlugin(t));
        }
        registerExtension(e) {
          this.extensionsByPoint.has(e.extensionPoint) ||
            this.extensionsByPoint.set(e.extensionPoint, new Map());
          let t = this.extensionsByPoint.get(e.extensionPoint),
            r = e.id;
          if (t.has(r))
            throw Error(
              `Extension ${r} is already registered for point ${e.extensionPoint}`
            );
          t.set(r, e);
        }
        async activatePlugin(e) {
          if (this.activePlugins.has(e)) return;
          let t = this.plugins.get(e);
          if (!t) throw Error(`Cannot activate unknown plugin: ${e}`);
          for (let e of Object.keys(t.manifest.dependencies ?? {}))
            await this.activatePlugin(e);
          t.activate && (await t.activate()), this.activePlugins.add(e);
        }
        async deactivatePlugin(e) {
          if (!this.activePlugins.has(e)) return;
          let t = this.plugins.get(e);
          if (!t) throw Error(`Cannot deactivate unknown plugin: ${e}`);
          t.deactivate && (await t.deactivate()), this.activePlugins.delete(e);
        }
        async unregisterPlugin(e, t) {
          let r = i([e, t]),
            n = this.plugins.get(r);
          if (n) {
            for (let e of (this.activePlugins.has(r) &&
              (await this.deactivatePlugin(r)),
            n.extensions))
              "condition" === e.extensionPoint &&
                e.implementation.dispose &&
                (await e.implementation.dispose()),
                this.extensionsByPoint
                  .get(e.extensionPoint)
                  ?.delete(`${r}:${e.id}`);
            n.dispose && (await n.dispose()),
              this.plugins.delete(r),
              this.pluginStorage.delete(r);
          }
        }
        getExtensions(e) {
          return this.extensionsByPoint.get(e) || new Map();
        }
        getExtensionImpl(e, t) {
          return this.getExtensions(t).get(e)?.implementation;
        }
        getTriggerHandler([e]) {
          return this.getExtensionImpl(e, "trigger");
        }
        getActionHandler(e) {
          return this.getExtensionImpl(e, "action");
        }
        getTargetResolver([e]) {
          return this.getExtensionImpl(e, "targetResolver");
        }
        getConditionEvaluator([e]) {
          return this.getExtensionImpl(e, "condition");
        }
        getAllPlugins() {
          return this.plugins.values();
        }
      }
      function i(e) {
        return `${e[0]}:${e[1]}`;
      }
    },
    648: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = {
        EASING_NAMES: function () {
          return l;
        },
        debounce: function () {
          return a;
        },
        defaultSplitClass: function () {
          return s;
        },
        throttle: function () {
          return o;
        },
        toSeconds: function () {
          return n;
        },
      };
      for (var i in r)
        Object.defineProperty(t, i, { enumerable: !0, get: r[i] });
      function n(e) {
        return "string" == typeof e ? parseFloat(e) / 1e3 : e;
      }
      function s(e) {
        return `gsap_split_${e}++`;
      }
      let a = (
          e,
          t = 0,
          { leading: r = !1, trailing: i = !0, maxWait: n } = {}
        ) => {
          let s,
            a,
            o,
            l = 0,
            c = () => {
              (l = 0), (s = void 0), i && e.apply(a, o);
            };
          function u(...i) {
            (a = this),
              (o = i),
              !l && ((l = performance.now()), r && e.apply(a, o));
            let d = performance.now() - l;
            if (n && d >= n) {
              clearTimeout(s), c();
              return;
            }
            clearTimeout(s), (s = setTimeout(c, t));
          }
          return (
            (u.cancel = () => {
              clearTimeout(s), (s = void 0), (l = 0);
            }),
            u
          );
        },
        o = (
          e,
          t = 0,
          { leading: r = !0, trailing: i = !0, maxWait: n } = {}
        ) => {
          let s,
            a,
            o,
            l = 0,
            c = (t) => {
              (l = t), (s = void 0), e.apply(a, o);
            };
          function u(...e) {
            let d = performance.now();
            l || r || (l = d);
            let h = t - (d - l);
            (a = this),
              (o = e),
              h <= 0 || (n && d - l >= n)
                ? (s && (clearTimeout(s), (s = void 0)), c(d))
                : i && !s && (s = setTimeout(() => c(performance.now()), h));
          }
          return (
            (u.cancel = () => {
              clearTimeout(s), (s = void 0), (l = 0);
            }),
            u
          );
        },
        l = [
          "none",
          "power1.in",
          "power1.out",
          "power1.inOut",
          "power2.in",
          "power2.out",
          "power2.inOut",
          "power3.in",
          "power3.out",
          "power3.inOut",
          "power4.in",
          "power4.out",
          "power4.inOut",
          "back.in",
          "back.out",
          "back.inOut",
          "bounce.in",
          "bounce.out",
          "bounce.inOut",
          "circ.in",
          "circ.out",
          "circ.inOut",
          "elastic.in",
          "elastic.out",
          "elastic.inOut",
          "expo.in",
          "expo.out",
          "expo.inOut",
          "sine.in",
          "sine.out",
          "sine.inOut",
        ];
    },
    973: function (e, t, r) {
      let i = r(770),
        n = r(50),
        s = r(949),
        a = { doc: document, win: window };
      class o {
        getInstance = () => this.instance;
        emit = (e, t, r, i) => {
          this.instance && this.instance.emit(e, t, r, i);
        };
        destroy = () => {
          this.instance && (this.instance.destroy(), (this.instance = null));
        };
        ready = async () => {
          if (!this.instance)
            try {
              (this.instance = await i.IX3.init(a)),
                await this.instance.registerPlugin(n.plugin);
            } catch (e) {
              throw (console.error("Error initializing IX3:", e), e);
            }
        };
      }
      s.define("ix3", () => new o());
    },
    104: function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = {
        getFirst: function () {
          return n;
        },
        getSecond: function () {
          return s;
        },
        pair: function () {
          return a;
        },
      };
      for (var i in r)
        Object.defineProperty(t, i, { enumerable: !0, get: r[i] });
      let n = (e) => e[0],
        s = (e) => e[1],
        a = (e, t) => [e, t];
    },
  },
]);
