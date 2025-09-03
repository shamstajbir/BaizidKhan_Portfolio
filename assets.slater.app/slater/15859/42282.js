function initLenisScroll() {
  function e() {
    document.addEventListener("click", function (e) {
      const t = e.target.closest("[data-scroll-to]");
      if (!t) return;
      let o = t.getAttribute("data-scroll-to");
      if (o && "" !== o.trim()) e.preventDefault();
      else if ("" === o || null === o) {
        const n = t.getAttribute("href");
        if (!n || !n.startsWith("#")) return;
        e.preventDefault(), (o = n.substring(1));
      }
      if (!o) return;
      const n = document.querySelector(`[data-scroll-target="${o}"]`);
      if (!n) return;
      const a = parseInt(t.dataset.scrollOffset) || 0,
        i = parseFloat(t.dataset.scrollDuration) || 2;
      if (window.lenis)
        window.lenis.scrollTo(n, {
          offset: a,
          duration: i,
          easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });
      else {
        const e = n.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: e + a, behavior: "smooth" }),
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 1e3);
      }
    });
  }
  window.innerWidth < 992 ||
    ((lenis = new Lenis({
      duration: 1.1,
      easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !0,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      normalizeWheel: !0,
      smoothTouch: !1,
    })),
    (window.lenis = lenis),
    lenis.on("scroll", ScrollTrigger.update),
    gsap.ticker.add((e) => {
      lenis.raf(1e3 * e);
    }),
    gsap.ticker.lagSmoothing(0),
    e(),
    ScrollTrigger.refresh());
}
function disableSmoothScroll() {
  window.lenis && window.lenis.stop();
}
function enableSmoothScroll() {
  window.lenis && window.lenis.start();
}
function scrollToTop() {
  window.lenis &&
    window.lenis.scrollTo(0, {
      duration: 1.2,
      easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
    });
}
function progressiveRefresh() {
  if (!(window.innerWidth < 992) && refreshCount < maxRefreshes) {
    const e = document.querySelectorAll(
        "[data-marquee-scroll-direction-target]"
      ),
      t = Array.from(e).every((e) => e.hasAttribute("data-marquee-status"));
    if (e.length > 0 && !t) return void setTimeout(progressiveRefresh, 300);
    ScrollTrigger.refresh(),
      refreshCount++,
      setTimeout(progressiveRefresh, 2e3 * refreshCount);
  }
}
function debounce(e, t) {
  let o;
  return function (...n) {
    const a = () => {
      clearTimeout(o), e(...n);
    };
    clearTimeout(o), (o = setTimeout(a, t));
  };
}
function createTextSplit() {
  function e(e) {
    if (e.hasAttribute("data-split-complete")) return;
    e.innerHTML;
    const t = e.cloneNode(!0);
    (t.style.position = "absolute"),
      (t.style.visibility = "hidden"),
      (t.style.width = e.offsetWidth + "px"),
      (t.style.whiteSpace = "normal"),
      e.parentNode.appendChild(t),
      (t.innerHTML = t.innerHTML.replace(/<br\s*\/?>/gi, " <BR_MARKER> "));
    const o = [],
      n = (e) => {
        if (3 === e.nodeType) {
          const t = e.textContent.trim();
          if (t) {
            t.split(/\s+/).forEach((e) => {
              "<BR_MARKER>" === e
                ? o.push({ text: "BR_MARKER", isBR: !0 })
                : e && o.push({ text: e, isBR: !1 });
            });
          }
        } else
          1 === e.nodeType && Array.from(e.childNodes).forEach((e) => n(e));
      };
    n(t), (t.innerHTML = "");
    const a = [];
    o.forEach((e) => {
      if (e.isBR) {
        const e = document.createElement("br");
        t.appendChild(e);
      } else {
        const o = document.createElement("span");
        (o.textContent = e.text + " "),
          t.appendChild(o),
          a.push({ span: o, text: e.text });
      }
    });
    const i = [];
    let r = [],
      s = null;
    a.forEach(({ span: e, text: t }) => {
      const o = e.getBoundingClientRect().top;
      null !== s &&
        Math.abs(o - s) > 2 &&
        r.length > 0 &&
        (i.push(r.join(" ")), (r = [])),
        r.push(t),
        (s = o);
    }),
      r.length > 0 && i.push(r.join(" ")),
      t.remove(),
      (e.innerHTML = i
        .map(
          (e) =>
            `<div class="single-line-wrap"><div class="single-line">${e}</div></div>`
        )
        .join("")),
      e.setAttribute("data-split-complete", "true");
  }
  document.querySelectorAll('[data-split="lines"]').forEach((t) => e(t));
  document.querySelectorAll('[data-split="letters"]').forEach((e) => {
    if (e.hasAttribute("data-split-complete")) return;
    const t = e.textContent,
      o = Array.from(t);
    if (
      ((e.innerHTML = o
        .map((e) =>
          " " === e
            ? '<span class="single-letter">&nbsp;</span>'
            : `<span class="single-letter">${e}</span>`
        )
        .join("")),
      e.hasAttribute("data-letters-delay"))
    ) {
      e.querySelectorAll(".single-letter").forEach((e, t) => {
        const o = t / 150 + "s";
        e.style.transitionDelay = o;
      });
    }
    e.setAttribute("data-split-complete", "true");
  });
}
function createTextIn() {
  const e = document.querySelectorAll("[data-text-in]");
  0 !== e.length &&
    e.forEach((e) => {
      const t = e.getAttribute("data-text-in") || "lines";
      let o = [],
        n = !1,
        a = !1;
      "letters" === t
        ? (e.hasAttribute("data-split-complete") ||
            (e.setAttribute("data-split", "letters"), createTextSplit()),
          (o = Array.from(e.querySelectorAll(".single-letter"))),
          gsap.set(o, { y: "1em", opacity: 0, filter: "blur(4px)" }))
        : (e.hasAttribute("data-split-complete") ||
            (e.setAttribute("data-split", "lines"), createTextSplit()),
          (o = Array.from(e.querySelectorAll(".single-line"))),
          gsap.set(o, { y: "120%", opacity: 0, filter: "blur(2.5px)" })),
        ScrollTrigger.create({
          trigger: e,
          start: "top 90%",
          onEnter: () => {
            if (n || a) return;
            n = !0;
            const e = {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "mfsEase",
              onComplete: () => {
                (n = !1), (a = !0);
              },
            };
            "letters" === t
              ? ((e.duration = 0.6),
                (e.stagger = { each: 0.003, from: "start" }))
              : ((e.duration = 1.4), (e.stagger = 0.1)),
              gsap.to(o, e);
          },
        }),
        ScrollTrigger.create({
          trigger: e,
          start: "top bottom",
          end: "bottom+=5% bottom",
          onLeaveBack: () => {
            gsap.killTweensOf(o),
              (a = !1),
              (n = !1),
              "letters" === t
                ? gsap.set(o, { y: "1em", opacity: 0, filter: "blur(2.5px)" })
                : gsap.set(o, { y: "120%", opacity: 0, filter: "blur(4px)" });
          },
        });
    });
}
function createScaleInSimple() {
  function e(e) {
    e.sort((e, t) => {
      const o = e.getBoundingClientRect(),
        n = t.getBoundingClientRect();
      return o.top - n.top;
    }),
      e.forEach((e, t) => {
        const n = o.get(e);
        n &&
          !n.hasAnimated &&
          ((n.isAnimating = !0),
          gsap.to(e, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15 * t,
            onComplete: () => {
              (n.isAnimating = !1), (n.hasAnimated = !0);
            },
          }));
      });
  }
  const t = document.querySelectorAll("[scale-in-simple]");
  if (0 === t.length) return;
  const o = new WeakMap();
  let n,
    a = [];
  t.forEach((t) => {
    gsap.set(t, { scale: 0, opacity: 0 }),
      o.set(t, { isAnimating: !1, hasAnimated: !1 }),
      ScrollTrigger.create({
        trigger: t,
        start: "top 80%",
        onEnter: () => {
          const i = o.get(t);
          i.isAnimating ||
            i.hasAnimated ||
            (a.push(t),
            clearTimeout(n),
            (n = setTimeout(() => {
              e(a), (a = []);
            }, 50)));
        },
      }),
      ScrollTrigger.create({
        trigger: t,
        start: "top bottom",
        end: "bottom+=5% bottom",
        onLeaveBack: () => {
          const e = o.get(t);
          e &&
            e.hasAnimated &&
            (gsap.killTweensOf(t),
            gsap.set(t, { scale: 0, opacity: 0 }),
            (e.hasAnimated = !1),
            (e.isAnimating = !1));
        },
      });
  });
  const i = [];
  t.forEach((e) => {
    const t = e.getBoundingClientRect();
    t.top < 0.8 * window.innerHeight && t.bottom > 0 && i.push(e);
  }),
    i.length > 0 &&
      setTimeout(() => {
        e(i);
      }, 100);
}
function createEyebrowIn() {
  const e = new Map();
  document.querySelectorAll("[data-eyebrow-in]").forEach((t) => {
    const o = t.parentElement;
    e.has(o) || e.set(o, []), e.get(o).push(t);
  }),
    e.forEach((e) => {
      e.forEach((e, t) => {
        const o = 0.15 * t,
          n = e.querySelector(".eyebrow-left-bg"),
          a = e.querySelector(".eyebrow-left-text"),
          i = e.querySelector(".eyebrow-right-bg"),
          r = e.querySelector(".eyebrow-right .eyebrow-text");
        if (!(n || a || i || r)) return;
        n && gsap.set(n, { scale: 0, opacity: 0 }),
          a && gsap.set(a, { scale: 0, opacity: 0 }),
          i && gsap.set(i, { opacity: 0, scaleX: 0.1, scaleY: 0.85 }),
          r && gsap.set(r, { opacity: 0, yPercent: 100 });
        const s = gsap.timeline({ paused: !0 });
        n &&
          s.to(
            n,
            { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
            0
          ),
          a &&
            s.to(
              a,
              { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
              0.1
            ),
          i &&
            s.to(
              i,
              {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              0.2
            ),
          r &&
            s.to(
              r,
              { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" },
              0.3
            );
        const l = () => {
          n && gsap.set(n, { scale: 0, opacity: 0 }),
            a && gsap.set(a, { scale: 0, opacity: 0 }),
            i && gsap.set(i, { opacity: 0, scaleX: 0.1, scaleY: 0.85 }),
            r && gsap.set(r, { opacity: 0, yPercent: 100 });
        };
        ScrollTrigger.create({
          trigger: e,
          start: "top 80%",
          onEnter: () => {
            setTimeout(() => s.play(), 1e3 * o);
          },
        }),
          ScrollTrigger.create({
            trigger: e,
            start: "top bottom",
            end: "bottom bottom",
            onLeaveBack: () => {
              s.pause(0), l();
            },
          });
      });
    });
}
function createLineIn() {
  function e(e) {
    e.sort((e, t) => {
      const o = e.getBoundingClientRect(),
        n = t.getBoundingClientRect();
      return o.top - n.top;
    }),
      e.forEach((e, t) => {
        const n = o.get(e);
        n &&
          !n.hasAnimated &&
          ((n.isAnimating = !0),
          gsap.to(e, {
            scaleX: 1,
            duration: 1.3,
            ease: "mfsEase",
            delay: 0.15 * t,
            onComplete: () => {
              (n.isAnimating = !1), (n.hasAnimated = !0);
            },
          }));
      });
  }
  const t = document.querySelectorAll('[line-in="true"]');
  if (0 === t.length) return;
  const o = new WeakMap();
  let n,
    a = [];
  t.forEach((t) => {
    gsap.set(t, { scaleX: 0, transformOrigin: "left center" }),
      o.set(t, { isAnimating: !1, hasAnimated: !1 }),
      ScrollTrigger.create({
        trigger: t,
        start: "top 80%",
        onEnter: () => {
          const i = o.get(t);
          i.isAnimating ||
            i.hasAnimated ||
            (a.push(t),
            clearTimeout(n),
            (n = setTimeout(() => {
              e(a), (a = []);
            }, 50)));
        },
      }),
      ScrollTrigger.create({
        trigger: t,
        start: "top bottom",
        end: "bottom+=5% bottom",
        onLeaveBack: () => {
          const e = o.get(t);
          e &&
            e.hasAnimated &&
            (gsap.killTweensOf(t),
            gsap.set(t, { scaleX: 0 }),
            (e.hasAnimated = !1),
            (e.isAnimating = !1));
        },
      });
  });
  const i = [];
  t.forEach((e) => {
    const t = e.getBoundingClientRect();
    t.top < 0.8 * window.innerHeight && t.bottom > 0 && i.push(e);
  }),
    i.length > 0 &&
      setTimeout(() => {
        e(i);
      }, 100);
}
function createCustomIn() {
  function e(e) {
    const t = n.get(e);
    if (!t || t.hasAnimated) return;
    t.isAnimating = !0;
    const o = {
      opacity: 1,
      filter: "blur(0px)",
      duration: t.duration,
      ease: t.customEase,
      onComplete: () => {
        (t.isAnimating = !1), (t.hasAnimated = !0);
      },
    };
    "0" !== t.yMove && (o.y = 0),
      null !== t.xMove && "0" !== t.xMove && (o.x = 0),
      gsap.to(e, o);
  }
  function t(e) {
    e.sort((e, t) => {
      const o = e.getBoundingClientRect(),
        n = t.getBoundingClientRect();
      return o.top - n.top;
    }),
      e.forEach((e, t) => {
        const o = n.get(e);
        if (!o || o.hasAnimated) return;
        o.isAnimating = !0;
        const a = {
          opacity: 1,
          filter: "blur(0px)",
          duration: o.duration,
          ease: o.customEase,
          delay: 0.15 * t,
          onComplete: () => {
            (o.isAnimating = !1), (o.hasAnimated = !0);
          },
        };
        "0" !== o.yMove && (a.y = 0),
          null !== o.xMove && "0" !== o.xMove && (a.x = 0),
          gsap.to(e, a);
      });
  }
  const o = document.querySelectorAll('[custom-in="true"]');
  if (0 === o.length) return;
  if (window.innerWidth < 992) {
    const e = new IntersectionObserver(
      (t) => {
        t.forEach((t) => {
          t.isIntersecting &&
            ((t.target.style.transition =
              "opacity 0.6s ease, transform 0.6s ease"),
            (t.target.style.opacity = "1"),
            (t.target.style.transform = "translateY(0)"),
            e.unobserve(t.target));
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    return void o.forEach((t) => {
      (t.style.opacity = "0"),
        (t.style.transform = "translateY(2rem)"),
        e.observe(t);
    });
  }
  const n = new WeakMap();
  let a,
    i = [];
  o.forEach((o) => {
    const r = o.dataset.customY || "2rem",
      s = o.dataset.customX || null,
      l = parseFloat(o.dataset.customOpacity || "0"),
      c = o.dataset.customBlur || "3.5px",
      d = parseFloat(o.dataset.customDuration || "1.3"),
      u = o.dataset.customEase || "mfsEase",
      g = "false" === o.dataset.customStagger,
      p = { opacity: l, filter: `blur(${c})` };
    "0" !== r && (p.y = r),
      null !== s && "0" !== s && (p.x = s),
      gsap.set(o, p),
      n.set(o, {
        initialState: p,
        yMove: r,
        xMove: s,
        duration: d,
        customEase: u,
        disableStagger: g,
        isAnimating: !1,
        hasAnimated: !1,
      });
    const m = o.dataset.triggerStart || "top 80%";
    ScrollTrigger.create({
      trigger: o,
      start: m,
      onEnter: () => {
        const r = n.get(o);
        r.isAnimating ||
          r.hasAnimated ||
          (r.disableStagger
            ? e(o)
            : (i.push(o),
              clearTimeout(a),
              (a = setTimeout(() => {
                t(i), (i = []);
              }, 50))));
      },
    }),
      ScrollTrigger.create({
        trigger: o,
        start: "top bottom",
        end: "bottom+=5% bottom",
        onLeaveBack: () => {
          const e = n.get(o);
          e &&
            e.hasAnimated &&
            (gsap.killTweensOf(o),
            gsap.set(o, e.initialState),
            (e.hasAnimated = !1),
            (e.isAnimating = !1));
        },
      });
  });
  const r = [],
    s = [];
  o.forEach((e) => {
    const t = e.getBoundingClientRect();
    if (t.top < 0.8 * window.innerHeight && t.bottom > 0) {
      n.get(e).disableStagger ? s.push(e) : r.push(e);
    }
  }),
    setTimeout(() => {
      s.forEach((t) => {
        e(t);
      }),
        r.length > 0 && t(r);
    }, 100);
}
function initPlayVideoHover() {
  document.querySelectorAll("[data-video-on-hover]").forEach((e) => {
    const t = e.querySelector("video"),
      o = e.getAttribute("data-video-src") || "";
    t &&
      o &&
      (e.addEventListener("mouseenter", () => {
        t.getAttribute("src") || t.setAttribute("src", o),
          (e.dataset.videoOnHover = "active"),
          t.play().catch(() => {});
      }),
      e.addEventListener("mouseleave", () => {
        (e.dataset.videoOnHover = "not-active"),
          setTimeout(() => {
            t.pause(), (t.currentTime = 0);
          }, 200);
      }));
  });
}
function initMagneticLinks() {
  document
    .querySelectorAll(
      'a:not([data-magnetic="false"]):not([card-magnetic-rotate]), [data-magnetic="true"]:not([card-magnetic-rotate])'
    )
    .forEach((e) => {
      if ("false" === e.dataset.magnetic) return;
      const t = parseFloat(e.dataset.magneticStrength) || 0.3,
        o = e.dataset.magneticStrengthX
          ? parseFloat(e.dataset.magneticStrengthX)
          : t,
        n = e.dataset.magneticStrengthY
          ? parseFloat(e.dataset.magneticStrengthY)
          : t,
        a = parseFloat(e.dataset.magneticSpeed) || 0.3,
        i = e.dataset.magneticEase || "power2.out",
        r = e.dataset.magneticMax ? parseFloat(e.dataset.magneticMax) : null,
        s = e.dataset.magneticMaxX ? parseFloat(e.dataset.magneticMaxX) : r,
        l = e.dataset.magneticMaxY ? parseFloat(e.dataset.magneticMaxY) : r;
      let c,
        d,
        u = null;
      const g = () => {
          (u = e.getBoundingClientRect()),
            e.classList.add("magnetic-active"),
            gsap.killTweensOf(e),
            (c = gsap.quickTo(e, "x", { duration: a, ease: i })),
            (d = gsap.quickTo(e, "y", { duration: a, ease: i }));
        },
        p = () => {
          (u = null),
            e.classList.remove("magnetic-active"),
            gsap.killTweensOf(e),
            gsap.to(e, {
              x: 0,
              y: 0,
              duration: 1.2 * a,
              ease: i,
              onComplete: () => {
                gsap.set(e, { clearProps: "transform" });
              },
            }),
            (c = null),
            (d = null);
        };
      e.addEventListener("mouseenter", () => {
        g();
      }),
        e.addEventListener("mousemove", (e) => {
          if (!c || !d || !u) return;
          const t = u.left + u.width / 2,
            a = u.top + u.height / 2,
            i = e.clientX - t,
            r = e.clientY - a;
          let g = i * o,
            p = r * n;
          null !== s && (g = Math.max(-s, Math.min(s, g))),
            null !== l && (p = Math.max(-l, Math.min(l, p))),
            c(g),
            d(p);
        }),
        e.addEventListener("mouseleave", () => {
          p();
        });
    }),
    checkInitialHoverState();
}
function checkInitialHoverState() {
  setTimeout(() => {
    document.addEventListener("mousemove", function e(t) {
      document.removeEventListener("mousemove", e);
      const o = document.elementFromPoint(t.clientX, t.clientY);
      if (o) {
        const e = o.closest(
          'a:not([data-magnetic="false"]):not([card-magnetic-rotate]), [data-magnetic="true"]:not([card-magnetic-rotate])'
        );
        e &&
          "false" !== e.dataset.magnetic &&
          e.dispatchEvent(
            new MouseEvent("mouseenter", {
              bubbles: !0,
              cancelable: !0,
              clientX: t.clientX,
              clientY: t.clientY,
            })
          );
      }
    });
  }, 100);
}
function initBasicCustomCursor() {
  function e() {
    u ||
      gsap.to(a, {
        x: c,
        y: d,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      }),
      (p = requestAnimationFrame(e));
  }
  function t(e) {
    const t = e.getBoundingClientRect(),
      o = window.getComputedStyle(e);
    gsap.to(a, {
      x: t.left + t.width / 2,
      y: t.top + t.height / 2,
      width: t.width,
      height: t.height,
      borderRadius: o.borderRadius || s,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  }
  function o(e) {
    if (g === e) return;
    if ((h && (h.disconnect(), (h = null)), (u = !0), (g = e), l(e))) return;
    const o = e.getBoundingClientRect(),
      n = window.getComputedStyle(e);
    "true" === e.dataset.cursorTransparent
      ? a.classList.add("cursor-transparent")
      : a.classList.add("cursor-hover"),
      a.classList.add("cursor-morphed"),
      m && m.kill(),
      (m = gsap.to(a, {
        x: o.left + o.width / 2,
        y: o.top + o.height / 2,
        width: o.width,
        height: o.height,
        borderRadius: n.borderRadius || s,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      })),
      (h = new ResizeObserver(() => {
        g === e && t(e);
      })),
      h.observe(e);
  }
  function n() {
    h && (h.disconnect(), (h = null)),
      (u = !1),
      (g = null),
      a.classList.remove(
        "cursor-hover",
        "cursor-morphed",
        "cursor-transparent"
      ),
      m && m.kill(),
      gsap.to(a, {
        width: i,
        height: r,
        borderRadius: s,
        duration: 0.15,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          m = null;
        },
      });
  }
  const a = document.querySelector(".cursor");
  if (!a) return;
  const i = a.offsetWidth,
    r = a.offsetHeight,
    s = window.getComputedStyle(a).borderRadius,
    l = (e) => e.classList.contains("home-work_item");
  gsap.set(a, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
  let c = 0,
    d = 0,
    u = !1,
    g = null,
    p = null,
    m = null,
    h = null;
  e(),
    window.addEventListener("mousemove", (e) => {
      if (((c = e.clientX), (d = e.clientY), u && g && !l(g))) {
        const e = g.getBoundingClientRect();
        gsap.to(a, {
          x: e.left + e.width / 2,
          y: e.top + e.height / 2,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    }),
    window.addEventListener("mousedown", () => {
      (u && !l(g)) ||
        gsap.to(a, {
          scale: 0.7,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
    }),
    window.addEventListener("mouseup", () => {
      (u && !l(g)) ||
        gsap.to(a, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
    });
  const f =
    'a, button, input[type="button"], input[type="submit"], [role="button"], [data-cursor-morph], [data-magnetic], [data-cursor-transparent]';
  document.addEventListener(
    "mouseenter",
    (e) => {
      const t = e.target;
      if (t.matches(f)) {
        if ("false" === t.dataset.cursorMorph) return;
        o(t);
      }
    },
    !0
  ),
    document.addEventListener(
      "mouseleave",
      (e) => {
        const t = e.target;
        t.matches(f) && g === t && n();
      },
      !0
    ),
    document.addEventListener("progressLineScaled", (e) => {
      const o = e.detail.line;
      g === o && t(o);
    }),
    document.addEventListener("visibilitychange", () => {
      document.hidden ? p && cancelAnimationFrame(p) : e();
    }),
    gsap.set(a, { opacity: 1 });
}
function init3DRotationCards() {
  document.querySelectorAll("[card-magnetic-rotate]").forEach((e) => {
    const t = parseFloat(e.dataset.rotationStrength) || 9,
      o = parseFloat(e.dataset.rotationStrengthX) || 0.75 * t,
      n = parseFloat(e.dataset.rotationStrengthY) || t,
      a = parseFloat(e.dataset.rotationSpeed) || 0.3,
      i = e.dataset.rotationEase || "power2.out";
    let r, s, l;
    const c = () => {
        e.classList.add("rotation-active"),
          gsap.killTweensOf(e),
          (r = gsap.quickTo(e, "rotationX", { duration: a, ease: i })),
          (s = gsap.quickTo(e, "rotationY", { duration: a, ease: i })),
          (l = gsap.quickTo(e, "z", { duration: a, ease: i }));
      },
      d = () => {
        e.classList.remove("rotation-active"),
          gsap.killTweensOf(e),
          gsap.to(e, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            duration: 1.2 * a,
            ease: i,
            onComplete: () => {
              gsap.set(e, { clearProps: "transform" });
            },
          }),
          (r = null),
          (s = null),
          (l = null);
      };
    e.addEventListener("mouseenter", () => {
      c();
    }),
      e.addEventListener("mousemove", (t) => {
        if (!r || !s || !l) return;
        const a = e.getBoundingClientRect(),
          i = a.left + a.width / 2,
          c = a.top + a.height / 2,
          d = (t.clientX - i) / (a.width / 2),
          u = (t.clientY - c) / (a.height / 2),
          g = -d * n,
          p = u * o,
          m = 5 * Math.abs(d) + 5 * Math.abs(u);
        r(p), s(g), l(m);
      }),
      e.addEventListener("mouseleave", () => {
        d();
      });
  });
}
function init3DCardCursors() {
  document.querySelectorAll(".home-work_item").forEach((e) => {
    function t() {
      (r.textContent = `\n        #${e.id}::after {\n          left: ${o}px;\n          top: ${n}px;\n        }\n      `),
        (a = requestAnimationFrame(t));
    }
    let o = 0,
      n = 0,
      a = null;
    const i = `card-cursor-${Math.random().toString(36).substr(2, 9)}`,
      r = document.createElement("style");
    (r.id = i),
      document.head.appendChild(r),
      e.addEventListener("mouseenter", () => {
        e.id || (e.id = `card-${Math.random().toString(36).substr(2, 9)}`), t();
      }),
      e.addEventListener("mousemove", (t) => {
        const a = e.getBoundingClientRect();
        (o = t.clientX - a.left), (n = t.clientY - a.top);
      }),
      e.addEventListener("mouseleave", () => {
        a && (cancelAnimationFrame(a), (a = null));
      });
  });
}
function initSeparatorImageReveal() {
  document.querySelectorAll("[data-separator-section]").forEach((e) => {
    const t = e.querySelectorAll(".separator_item");
    if (0 === t.length) return;
    const o = e.dataset.separatorStart || "top top",
      n = e.dataset.separatorEnd || "bottom top";
    gsap.set(t, { width: "100%", height: "100%", borderRadius: "0rem" }),
      gsap.to(t, {
        width: "0%",
        height: "0%",
        borderRadius: "1rem",
        stagger: { each: 0.03, from: "end", grid: "auto" },
        ease: "power1.out",
        scrollTrigger: {
          trigger: e,
          start: o,
          end: n,
          scrub: 0,
          invalidateOnRefresh: !0,
        },
      });
  });
}
function initThemeSwitcher() {
  function e(e) {
    const t = window.innerWidth;
    return t <= 478 && e.dataset.themePointMobile
      ? e.dataset.themePointMobile
      : t <= 767 && e.dataset.themePointLandscape
      ? e.dataset.themePointLandscape
      : t <= 991 && e.dataset.themePointTablet
      ? e.dataset.themePointTablet
      : e.dataset.themePoint || "top center";
  }
  function t(e) {
    if (a === e) return;
    const t = document.body;
    t.classList.remove("theme-light", "theme-dark"),
      t.classList.add(`theme-${e}`),
      (a = e);
  }
  document.body.classList.add("theme-dark"),
    setTimeout(() => {
      document.body.classList.add("theme-initialized");
    }, 100);
  const o = document.querySelectorAll("[data-theme-trigger]");
  if (0 === o.length) return;
  const n =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  let a = "dark";
  if (n) {
    let c = !1,
      d = 0;
    function i() {
      const t = [];
      return (
        o.forEach((o) => {
          const n = o.getBoundingClientRect(),
            a = window.pageYOffset || document.documentElement.scrollTop,
            i = n.top + a,
            r = n.height,
            s = window.innerHeight,
            l = e(o),
            [c, d] = l.split(" ");
          let u = i;
          if ("center" === c) u = i + r / 2;
          else if ("bottom" === c) u = i + r;
          else if (c.includes("%")) {
            u = i + r * (parseFloat(c) / 100);
          }
          let g = 0;
          if ("center" === d) g = s / 2;
          else if ("bottom" === d) g = s;
          else if (d.includes("%")) {
            g = s * (parseFloat(d) / 100);
          }
          t.push({
            theme: o.dataset.themeTrigger,
            position: u - g,
            element: o,
          });
        }),
        t.sort((e, t) => e.position - t.position)
      );
    }
    let u,
      g = i();
    function r() {
      const e = window.pageYOffset || document.documentElement.scrollTop;
      let o = "dark";
      for (let t = g.length - 1; t >= 0; t--)
        if (e >= g[t].position) {
          o = g[t].theme;
          break;
        }
      t(o);
    }
    function s() {
      (d = window.pageYOffset || document.documentElement.scrollTop),
        c ||
          (window.requestAnimationFrame(() => {
            r(), (c = !1);
          }),
          (c = !0));
    }
    r(),
      window.addEventListener("scroll", s, { passive: !0 }),
      window.addEventListener("resize", () => {
        clearTimeout(u),
          (u = setTimeout(() => {
            (g = i()), r();
          }, 250));
      });
  } else {
    function l(t, o) {
      const n = t.getBoundingClientRect(),
        a = n.top + o,
        i = n.height,
        r = window.innerHeight,
        s = e(t),
        [l, c] = s.split(" ");
      let d = a;
      if ("center" === l) d = a + i / 2;
      else if ("bottom" === l) d = a + i;
      else if (l.includes("%")) {
        d = a + i * (parseFloat(l) / 100);
      } else if (l.includes("px")) {
        d = a + parseFloat(l);
      }
      let u = 0;
      if ("center" === c) u = r / 2;
      else if ("bottom" === c) u = r;
      else if (c.includes("%")) {
        u = r * (parseFloat(c) / 100);
      } else c.includes("px") && (u = parseFloat(c));
      return d - u;
    }
    let p,
      m = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (e) => {
          const n = e.scroll();
          let a = "dark";
          o.forEach((e) => {
            const t = l(e, n);
            n >= t && (a = e.dataset.themeTrigger);
          }),
            t(a);
        },
      });
    window.addEventListener("resize", () => {
      clearTimeout(p),
        (p = setTimeout(() => {
          ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0) &&
            m &&
            (m.kill(), (m = null)),
            initThemeSwitcher();
        }, 250));
    });
  }
}
function initBottomCtaAnimation() {
  document
    .querySelectorAll('[data-separator-start="top center"]')
    .forEach((e) => {
      const t = e.querySelectorAll(".separator_item"),
        o = e.querySelectorAll(".btm-cta_text"),
        n = e.querySelectorAll(".btm-cta_button-wrapper");
      t.length > 0 &&
        gsap.set(t, {
          width: "100%",
          height: "100%",
          borderRadius: "0rem",
          force3D: !0,
        });
      const a = [...o, ...n];
      a.length > 0 &&
        gsap.set(a, {
          y: "2rem",
          opacity: 0,
          filter: "blur(8px)",
          force3D: !0,
        });
      const i = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: "top center",
          end: "top top",
          scrub: 0,
          invalidateOnRefresh: !0,
        },
      });
      if (
        (t.length > 0 &&
          i.to(t, {
            width: "0%",
            height: "0%",
            borderRadius: "1rem",
            stagger: { each: 0.03, from: "end" },
            ease: "power1.out",
            overwrite: !0,
            force3D: !0,
          }),
        a.length > 0)
      ) {
        const t = e.dataset.ctaStart || "top center",
          o = e.dataset.ctaEnd || "top top";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: e,
              start: t,
              end: o,
              scrub: 0,
              invalidateOnRefresh: !0,
            },
          })
          .to(a, {
            y: "0rem",
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out",
            duration: 0.6,
            force3D: !0,
          });
      }
    });
}
function initAccordions() {
  document.querySelectorAll(".accordion_cms_wrap").forEach((e, t) => {
    if (e.dataset.scriptInitialized) return;
    e.dataset.scriptInitialized = "true";
    const o = "false" !== e.getAttribute("data-close-previous"),
      n = "false" !== e.getAttribute("data-close-on-second-click"),
      a = "true" === e.getAttribute("data-open-on-hover"),
      i =
        null !== e.getAttribute("data-open-by-default") &&
        !isNaN(+e.getAttribute("data-open-by-default")) &&
        +e.getAttribute("data-open-by-default");
    let r = null,
      s = [];
    e.querySelectorAll(".accordion_cms_item").forEach((e, l) => {
      const c = e.querySelector(".accordion_component"),
        d = e.querySelector(".accordion_content_wrap"),
        u = e.querySelector(".accordion_toggle_icon-inner");
      if (!c || !d || !u) return;
      e.setAttribute("aria-expanded", "false"),
        e.setAttribute("id", `accordion_1_trigger_${t}_${l}`),
        d.setAttribute("id", `accordion_1_content_${t}_${l}`),
        e.setAttribute("aria-controls", d.id),
        d.setAttribute("aria-labelledby", e.id),
        (d.style.display = "none");
      const g = () => {
          p.invalidate(),
            ScrollTrigger.refresh(),
            window.lenis && window.lenis.resize();
        },
        p = gsap.timeline({
          paused: !0,
          defaults: { duration: 0.65, ease: "mfsEase" },
          onComplete: g,
          onReverseComplete: g,
        });
      p.set(d, { display: "block" }),
        p.fromTo(d, { height: 0 }, { height: "auto" }),
        p.fromTo(
          u,
          { rotate: 0 },
          { rotate: -45, duration: 0.2, ease: "power1.out" },
          "<"
        );
      const m = () => {
        e.classList.contains("is-opened") &&
          (e.classList.remove("is-opened"),
          p.reverse(),
          e.setAttribute("aria-expanded", "false"));
      };
      s[l] = m;
      const h = (t = !1) => {
        o && null !== r && r !== l && s[r]?.(),
          (r = l),
          e.setAttribute("aria-expanded", "true"),
          e.classList.add("is-opened"),
          t ? p.progress(1) : p.play();
      };
      i === l && h(!0),
        e.addEventListener("click", (t) => {
          (t.target.closest(".accordion_content_wrap") &&
            "A" === t.target.tagName) ||
            (e.classList.contains("is-opened") && n ? (m(), (r = null)) : h());
        }),
        e.addEventListener("keydown", (t) => {
          ("Enter" !== t.key && " " !== t.key) ||
            (t.preventDefault(), e.click());
        }),
        a &&
          e.addEventListener("mouseenter", () => {
            e.classList.contains("is-opened") || h();
          });
    });
  });
}
function initFlipButtons() {
  let e = document.querySelectorAll('[data-flip-button="wrap"]');
  e.forEach((e) => {
    let t = e.querySelectorAll('[data-flip-button="button"]'),
      o = e.querySelector('[data-flip-button="bg"]');
    o &&
      t.forEach(function (t) {
        t.addEventListener("mouseenter", function () {
          const e = Flip.getState(o);
          this.appendChild(o), Flip.from(e, { duration: 0.2 });
        }),
          t.addEventListener("focus", function () {
            const e = Flip.getState(o);
            this.appendChild(o), Flip.from(e, { duration: 0.2 });
          }),
          t.addEventListener("mouseleave", function () {
            const t = Flip.getState(o),
              n = e.querySelector(".active");
            n && (n.appendChild(o), Flip.from(t, { duration: 0.2 }));
          }),
          t.addEventListener("blur", function () {
            const t = Flip.getState(o),
              n = e.querySelector(".active");
            n && (n.appendChild(o), Flip.from(t, { duration: 0.2 }));
          });
      });
  });
}
function initTabSystem() {
  document.querySelectorAll('[data-tabs="wrapper"]').forEach((e) => {
    function t(e, t = !1) {
      if (!t && (l || n[e] === r)) return;
      l = !0;
      const o = s,
        a = i[e],
        c = gsap.timeline({
          defaults: { duration: 0.5, ease: "power2.inOut" },
          onComplete: () => {
            t || (o && o.classList.remove("active")), (s = a), (l = !1);
          },
        });
      a.classList.add("active"),
        c
          .to(o, { autoAlpha: 0, xPercent: 3 }, 0)
          .fromTo(
            a,
            { autoAlpha: 0, xPercent: 3 },
            { autoAlpha: 1, xPercent: 0 },
            0.2
          );
      let d = o ? o.querySelector("video") : null;
      d && !d.paused && d.pause();
      let u = a ? a.querySelector("video") : null;
      u &&
        "video" === a.dataset.tabsContent &&
        (!u.src && u.dataset.src && ((u.src = u.dataset.src), u.load()),
        u.play()),
        r && r.classList.remove("active"),
        n[e].classList.add("active"),
        (r = n[e]);
    }
    let o = e.querySelector('[data-tabs="nav"]'),
      n = o ? o.querySelectorAll('[data-tabs="button"]') : [],
      a = e.querySelector('[data-tabs="visual-wrap"]'),
      i = a ? a.querySelectorAll('[data-tabs="visual-item"]') : [];
    if (0 === n.length || 0 === i.length) return;
    let r = n[0],
      s = i[0],
      l = !1;
    ScrollTrigger.create({
      trigger: e,
      start: "top-=50% bottom",
      onEnter: () => {
        let e = i[0];
        if (e && "video" === e.dataset.tabsContent) {
          let t = e.querySelector("video");
          t &&
            (!t.src && t.dataset.src && ((t.src = t.dataset.src), t.load()),
            t.play());
        }
      },
    }),
      t(0, !0),
      n.forEach((e, o) => {
        e.addEventListener("click", () => {
          t(o);
        });
      }),
      i[0].classList.add("active"),
      n[0].classList.add("active");
  });
}
function initMobileMenuBlur() {
  function e() {
    (r = !0),
      o.classList.add("is-open"),
      o.setAttribute("aria-expanded", "true"),
      o.setAttribute("aria-label", "Close menu"),
      n.setAttribute("aria-hidden", "false"),
      i.classList.add("menu-open"),
      i.classList.add("menu-open"),
      window.lenis && window.lenis.stop(),
      gsap.set(n, { display: "block" }),
      gsap.to(n, { y: "0%", opacity: 1, duration: 0.45, ease: "mfsEase" }),
      a && gsap.to(a, { height: "100lvh", duration: 0.15, ease: "power3.out" });
  }
  function t() {
    (r = !1),
      o.classList.remove("is-open"),
      o.setAttribute("aria-expanded", "false"),
      o.setAttribute("aria-label", "Open menu"),
      n.setAttribute("aria-hidden", "true"),
      i.classList.remove("menu-open"),
      i.classList.remove("menu-open"),
      window.lenis && window.lenis.start(),
      gsap.to(n, {
        y: "50%",
        opacity: 0,
        duration: 0.35,
        ease: "mfsEase",
        onComplete: () => {
          gsap.set(n, { display: "none" });
        },
      }),
      a && gsap.to(a, { height: s, duration: 0.12, ease: "power3.in" }),
      o.focus();
  }
  const o = document.querySelector(".navbar_menu-button"),
    n = document.querySelector(".navbar_menu"),
    a = document.querySelector(".progressive-blur_wrap"),
    i = document.body;
  if (!o || !n) return;
  let r = !1;
  const s = a ? window.getComputedStyle(a).height : "0";
  let l;
  window.innerWidth < 992 &&
    gsap.set(n, { y: "50%", opacity: 0, display: "none" }),
    o.addEventListener("click", () => {
      r ? t() : e();
    }),
    document.addEventListener("keydown", (e) => {
      "Escape" === e.key && r && t();
    }),
    document.addEventListener("click", (e) => {
      !r || n.contains(e.target) || o.contains(e.target) || t();
    }),
    window.addEventListener("resize", () => {
      clearTimeout(l),
        (l = setTimeout(() => {
          window.innerWidth >= 992 && r && t();
        }, 250));
    });
}
function initNavbarBlurScroll() {
  if (window.innerWidth < 768) return;
  const e = document.querySelectorAll("[navblur-trigger]"),
    t = document.querySelector(".progressive-blur_wrap");
  if (!e.length || !t) return;
  const o = document.createElement("div");
  (o.style.height = "11rem"),
    (o.style.position = "absolute"),
    (o.style.visibility = "hidden"),
    document.body.appendChild(o);
  const n = o.offsetHeight;
  let a;
  document.body.removeChild(o),
    gsap.set(t, { height: 0 }),
    e.forEach((e) => {
      ScrollTrigger.create({
        trigger: e,
        start: "bottom top",
        end: "bottom top",
        onLeave: () => {
          gsap.to(t, { height: n, duration: 0.5, ease: "power4.inOut" });
        },
        onEnterBack: () => {
          gsap.to(t, { height: 0, duration: 0.5, ease: "power4.inOut" });
        },
      });
    }),
    window.addEventListener("resize", () => {
      clearTimeout(a),
        (a = setTimeout(() => {
          if (window.innerWidth < 768)
            ScrollTrigger.getAll().forEach((e) => {
              e.vars.trigger &&
                e.vars.trigger.hasAttribute("navblur-trigger") &&
                e.kill();
            }),
              gsap.set(t, { clearProps: "height" });
          else {
            0 ===
              ScrollTrigger.getAll().filter(
                (e) =>
                  e.vars.trigger &&
                  e.vars.trigger.hasAttribute("navblur-trigger")
              ).length && initNavbarBlurScroll();
          }
        }, 250));
    });
}
function initNavbarProgress() {
  function e() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }
  function t(e) {
    return Math.floor(e * (s.length - 1));
  }
  function o(e, t) {
    const o = t * (s.length - 1);
    s.forEach((e, t) => {
      const n = Math.abs(t - o);
      let a = 1,
        i = 0.3;
      if (n <= l.maxDistance) {
        const r = Math.max(0, 1 - n / l.maxDistance),
          s = Math.pow(r, 1.25);
        (a = 1 + (l.maxScale - 1) * s),
          (i = 0.3 + 0.7 * s),
          Math.round(o) === t
            ? e.classList.add("is-active")
            : e.classList.remove("is-active");
      } else e.classList.remove("is-active");
      gsap.set(e, { scaleY: a, opacity: i, overwrite: "auto" });
    }),
      requestAnimationFrame(() => {
        s.forEach((e) => {
          e.matches(":hover") &&
            e.dispatchEvent(
              new CustomEvent("progressLineScaled", {
                bubbles: !0,
                detail: { line: e },
              })
            );
        });
      });
  }
  function n() {
    const n = Date.now();
    if (n - g < l.updateThrottle) return;
    g = n;
    const a = window.pageYOffset || document.documentElement.scrollTop,
      i = e();
    d = Math.min(1, Math.max(0, a / i));
    const r = t(d);
    o(r, d), r !== u && (u = r);
  }
  function a() {
    const n = window.pageYOffset || document.documentElement.scrollTop,
      a = e();
    d = Math.min(1, Math.max(0, n / a));
    const i = t(d);
    o(i, d), (u = i);
  }
  function i(t) {
    const n = t / (s.length - 1),
      i = e(),
      r = n * i;
    window.lenis
      ? window.lenis.scrollTo(r, {
          duration: 1.2,
          easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
          onStart: () => {
            (d = n), o(t, n);
          },
          onComplete: () => {
            a();
          },
        })
      : (window.scrollTo({ top: r, behavior: "smooth" }),
        (d = n),
        o(t, n),
        setTimeout(() => {
          a();
        }, 1200));
  }
  if (window.innerWidth < 992) return;
  const r = document.querySelector(".navbar_progress"),
    s = document.querySelectorAll(".navbar_progress-line");
  if (!r || 0 === s.length) return;
  s.forEach((e, t) => {
    const o = Math.round((t / (s.length - 1)) * 100);
    e.setAttribute("aria-label", `Go to ${o}% of page`);
  });
  const l = {
    maxScale: 2.7,
    neighborScale: 0.6,
    maxDistance: 4,
    updateThrottle: 16,
  };
  let c,
    d = 0,
    u = 0,
    g = 0,
    p = null;
  s.forEach((e, t) => {
    e.addEventListener("click", () => i(t)),
      e.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault(), i(t);
            break;
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault(), t < s.length - 1 && s[t + 1].focus();
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault(), t > 0 && s[t - 1].focus();
            break;
          case "Home":
            e.preventDefault(), s[0].focus();
            break;
          case "End":
            e.preventDefault(), s[s.length - 1].focus();
        }
      });
  }),
    (p = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: n,
    })),
    r.addEventListener("click", (e) => {
      if (e.target.classList.contains("navbar_progress-line")) return;
      const t = r.getBoundingClientRect(),
        o = e.clientX - t.left,
        n = t.width,
        a = Math.max(0, Math.min(1, o / n));
      i(Math.round(a * (s.length - 1)));
    }),
    n(),
    window.addEventListener("resize", () => {
      clearTimeout(c),
        (c = setTimeout(() => {
          window.innerWidth < 992
            ? (p && (p.kill(), (p = null)),
              s.forEach((e) => {
                gsap.set(e, { clearProps: "all" }),
                  e.classList.remove("is-active");
              }))
            : p
            ? (n(), ScrollTrigger.refresh())
            : initNavbarProgress();
        }, 150));
    }),
    (window.navbarProgress = {
      setProgress: (e) => {
        (d = e), o(t(e), e);
      },
      goToSection: i,
    });
}
function initializeAnimations() {
  createTextSplit(),
    createScaleInSimple(),
    createEyebrowIn(),
    createLineIn(),
    createCustomIn(),
    createTextIn(),
    isDesktopExperience() &&
      (initBasicCustomCursor(),
      initMagneticLinks(),
      init3DRotationCards(),
      init3DCardCursors()),
    initPlayVideoHover(),
    initSeparatorImageReveal(),
    initBottomCtaAnimation(),
    initThemeSwitcher(),
    initFlipButtons(),
    initTabSystem(),
    initAccordions(),
    initMobileMenuBlur(),
    initNavbarBlurScroll(),
    initNavbarProgress(),
    ScrollTrigger.refresh();
}
let lenis, resizeTimer;
initLenisScroll(),
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer),
      (resizeTimer = setTimeout(() => {
        window.innerWidth < 992 && lenis
          ? (lenis.destroy(),
            (lenis = null),
            (window.lenis = null),
            ScrollTrigger.refresh())
          : window.innerWidth >= 992 && !lenis && initLenisScroll();
      }, 250));
  }),
  (window.disableSmoothScroll = disableSmoothScroll),
  (window.enableSmoothScroll = enableSmoothScroll),
  (window.scrollToTop = scrollToTop),
  gsap.registerPlugin(ScrollTrigger),
  gsap.registerEase("mfsEase", "0.625, 0.05, 0, 1");
const isTouchDevice = () =>
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0,
  hasHoverCapability = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  isDesktopExperience = () => hasHoverCapability() && !isTouchDevice();
let refreshCount = 0;
const maxRefreshes = 2;
window.innerWidth >= 992 && setTimeout(progressiveRefresh, 1e3),
  window.innerWidth >= 992 &&
    document.querySelectorAll("img").forEach((e) => {
      if (e.complete) return;
      const t = debounce(() => {
        const e = document.querySelectorAll(
          "[data-marquee-scroll-direction-target]"
        );
        (0 === e.length ||
          Array.from(e).every((e) => e.hasAttribute("data-marquee-status"))) &&
          ScrollTrigger.refresh();
      }, 300);
      e.addEventListener("load", t), e.addEventListener("error", t);
    }),
  setTimeout(initializeAnimations, 0),
  setTimeout(() => {
    window.lenis ||
      document.addEventListener("click", function (e) {
        const t = e.target.closest("[data-scroll-to]");
        if (!t) return;
        let o = t.getAttribute("data-scroll-to");
        if (o && "" !== o.trim()) e.preventDefault();
        else if ("" === o || null === o) {
          const n = t.getAttribute("href");
          if (!n || !n.startsWith("#")) return;
          e.preventDefault(), (o = n.substring(1));
        }
        if (!o) return;
        const n = document.querySelector(`[data-scroll-target="${o}"]`);
        if (!n) return;
        const a = parseInt(t.dataset.scrollOffset) || 0,
          i = n.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: i + a, behavior: "smooth" }),
          setTimeout(() => ScrollTrigger.refresh(), 1e3);
      });
  }, 100),
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
