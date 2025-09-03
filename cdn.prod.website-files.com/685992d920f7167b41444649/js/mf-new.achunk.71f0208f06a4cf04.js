(self.webpackChunk = self.webpackChunk || []).push([
  ["948"],
  {
    480: function () {
      function e() {
        let e = Webflow.require("ix3");
        e.ready().then(() => {
          let t = e.getInstance();
          t &&
            (t.register(
              [
                {
                  id: "i-198d4e9e",
                  deleted: !1,
                  scope: "site",
                  triggers: [
                    [
                      "wf:scroll",
                      {
                        controlType: "scroll",
                        scrollTriggerConfig: {
                          clamp: !0,
                          start: "top bottom",
                          end: "bottom top",
                          scrub: 0.8,
                          enter: "play",
                          leave: "none",
                          enterBack: "none",
                          leaveBack: "none",
                        },
                      },
                      ["wf:class", ["home-problems_icon-wrapper.is-1"]],
                    ],
                  ],
                  timelineIds: ["t-0c73ee84"],
                },
                {
                  id: "i-36b9e287",
                  deleted: !1,
                  scope: "site",
                  triggers: [
                    [
                      "wf:scroll",
                      {
                        controlType: "scroll",
                        scrollTriggerConfig: {
                          clamp: !0,
                          start: "top bottom",
                          end: "bottom top",
                          scrub: 0.8,
                          enter: "play",
                          leave: "none",
                          enterBack: "none",
                          leaveBack: "none",
                        },
                      },
                      ["wf:class", ["home-problems_icon-wrapper.is-2"]],
                    ],
                  ],
                  timelineIds: ["t-356f1f9f"],
                },
                {
                  id: "i-7fa69e17",
                  deleted: !1,
                  scope: "site",
                  triggers: [
                    [
                      "wf:scroll",
                      {
                        controlType: "scroll",
                        scrollTriggerConfig: {
                          clamp: !0,
                          start: "bottom top",
                          end: "bottom top",
                          scrub: null,
                          enter: "none",
                          leave: "play",
                          enterBack: "reverse",
                          leaveBack: "none",
                        },
                      },
                      ["wf:attribute", "[navblur-trigger]"],
                    ],
                  ],
                  timelineIds: ["t-73bdbdf4"],
                },
              ],
              [
                {
                  id: "t-0c73ee84",
                  deleted: !1,
                  actions: [
                    {
                      id: "ta-91d9dd9f",
                      targets: [["wf:trigger-only", ""]],
                      timing: { duration: 0.25, position: 0, ease: 0 },
                      tt: 2,
                      properties: { "wf:transform": { y: ["60%", "-50%"] } },
                    },
                  ],
                },
                {
                  id: "t-356f1f9f",
                  deleted: !1,
                  actions: [
                    {
                      id: "ta-4edcaeb0",
                      targets: [["wf:trigger-only", ""]],
                      timing: { duration: 0.25, position: 0, ease: 0 },
                      tt: 2,
                      properties: { "wf:transform": { y: ["18%", "-18%"] } },
                    },
                  ],
                },
                {
                  id: "t-73bdbdf4",
                  deleted: !1,
                  actions: [
                    {
                      id: "ta-0530f0cc",
                      targets: [["wf:class", ["navbar_container"]]],
                      timing: { duration: 0.5, position: 0, ease: 11 },
                      properties: {
                        "wf:transform": {},
                        "wf:class": {
                          class: {
                            selectors: ["navbar_is-expanded"],
                            operation: "toggleClass",
                          },
                        },
                      },
                    },
                  ],
                },
              ]
            ),
            window.dispatchEvent(new CustomEvent("__wf_ix3_ready")));
        });
      }
      "complete" === document.readyState ||
      "interactive" === document.readyState
        ? e()
        : document.addEventListener("DOMContentLoaded", e);
    },
  },
]);
