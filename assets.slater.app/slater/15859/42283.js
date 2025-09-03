function initMarqueeScrollDirection() {
  document
    .querySelectorAll("[data-marquee-scroll-direction-target]")
    .forEach((e) => {
      const t = e.querySelector("[data-marquee-collection-target]"),
        r = e.querySelector("[data-marquee-scroll-target]");
      if (!t || !r) return;
      const {
          marqueeSpeed: o,
          marqueeDirection: n,
          marqueeDuplicate: i,
          marqueeScrollSpeed: a,
        } = e.dataset,
        l = parseFloat(o),
        c = "right" === n ? 1 : -1,
        s = parseInt(i || 0),
        m = parseFloat(a),
        u = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
      let d = l * (t.offsetWidth / window.innerWidth) * u;
      r.style.marginLeft || (r.style.marginLeft = -1 * m + "%"),
        (r.style.width && "100%" !== r.style.width) ||
          (r.style.width = 2 * m + 100 + "%");
      const g = e.querySelectorAll("[data-marquee-collection-target]");
      if (s > 0 && g.length <= s) {
        const e = document.createDocumentFragment();
        for (let r = 0; r < s; r++) e.appendChild(t.cloneNode(!0));
        r.appendChild(e);
      }
      const p = e.querySelectorAll("[data-marquee-collection-target]");
      if (!e._marqueeAnimation) {
        const t = gsap
          .to(p, { xPercent: -100, repeat: -1, duration: d, ease: "linear" })
          .totalProgress(0.5);
        gsap.set(p, { xPercent: 1 === c ? 100 : -100 }),
          t.timeScale(c),
          t.play(),
          (e._marqueeAnimation = t);
      }
      e.setAttribute("data-marquee-status", "normal");
      const h = window.innerWidth < 768;
      if (0 === ScrollTrigger.getAll().filter((t) => t.trigger === e).length)
        if (h)
          gsap.fromTo(
            r,
            { x: `${-1 === c ? m : -m}vw` },
            {
              x: `${-1 === c ? -m : m}vw`,
              ease: "none",
              scrollTrigger: {
                trigger: e,
                start: "0% 100%",
                end: "100% 0%",
                scrub: !0,
                invalidateOnRefresh: !1,
                fastScrollEnd: !0,
                preventOverlaps: !0,
              },
            }
          );
        else {
          let t = 0;
          ScrollTrigger.create({
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (r) => {
              const o = Date.now();
              if (o - t < 100) return;
              t = o;
              const n = 1 === r.direction,
                i = n ? -c : c;
              e._marqueeAnimation && e._marqueeAnimation.timeScale(i),
                e.setAttribute(
                  "data-marquee-status",
                  n ? "normal" : "inverted"
                );
            },
          }),
            gsap.fromTo(
              r,
              { x: `${-1 === c ? m : -m}vw` },
              {
                x: `${-1 === c ? -m : m}vw`,
                ease: "none",
                scrollTrigger: {
                  trigger: e,
                  start: "0% 100%",
                  end: "100% 0%",
                  scrub: 1,
                },
              }
            );
        }
    });
}
function initHomeTabsMobileReorder() {
  function e() {
    const e = window.innerWidth <= 767;
    i !== e &&
      ((i = e),
      e ? t.appendChild(r) : o.appendChild(r),
      ScrollTrigger.refresh());
  }
  const t = document.querySelector(".home-tabs_layout"),
    r = document.querySelector(".home-tabs_left-content");
  if (!t || !r) return;
  const o = r.parentElement;
  let n,
    i = null;
  e(),
    window.addEventListener("resize", () => {
      clearTimeout(n), (n = setTimeout(e, 250));
    });
}
function initHomeHeroParallax() {
  if (window.innerWidth < 992) return;
  const e = document.querySelector(".home-hero_component"),
    t = document.querySelector(".section_logo-marquee"),
    r = document.querySelector(".home-hero_background-image"),
    o = document.querySelector(".home-hero_component-inner");
  e &&
    (gsap.to([t, r, o], {
      y: (e, t) =>
        t.classList.contains("section_logo-marquee")
          ? "-5.25rem"
          : t.classList.contains("home-hero_background-image")
          ? "8rem"
          : t.classList.contains("home-hero_component-inner")
          ? "-6rem"
          : 0,
      ease: "none",
      scrollTrigger: {
        trigger: e,
        start: "top top",
        end: "bottom top",
        scrub: !0,
      },
    }),
    e &&
      gsap.to(e, {
        left: "2rem",
        right: "2rem",
        bottom: "3.5rem",
        ease: "none",
        scrollTrigger: {
          trigger: e,
          start: "top top",
          end: "bottom top",
          scrub: !0,
        },
      }));
}
gsap.registerPlugin(ScrollTrigger),
  setTimeout(() => {
    initMarqueeScrollDirection();
  }, 500),
  setTimeout(() => {
    initMarqueeScrollDirection(),
      initHomeTabsMobileReorder(),
      initHomeHeroParallax(),
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
  }, 300);
