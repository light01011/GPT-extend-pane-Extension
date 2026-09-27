// ==UserScript==
// @name         Widen Claude & Gemini Chat
// @namespace    widen-chat
// @version      1.0
// @description  Kill side gutters, use more screen width for chat pane on claude.ai and gemini.google.com
// @match        https://claude.ai/*
// @match        https://gemini.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const WIDTH_PCT = '90vw';   // final width for widened pane, tweak if want less/more
  const MIN_MAX_W = 400;      // px, skip anything narrower than this (avatars, badges, etc)
  const SKIP_SELECTOR = 'nav, aside, header, footer';

  function isCentered(el) {
    const r = el.getBoundingClientRect();
    const p = el.parentElement;
    if (!p) return false;
    const pr = p.getBoundingClientRect();
    const leftGap = r.left - pr.left;
    const rightGap = pr.right - r.right;
    if (leftGap < 24 || rightGap < 24) return false;   // no real gutter to reclaim
    return Math.abs(leftGap - rightGap) < 40;          // roughly symmetric = centered column
  }

  function widen() {
    document.querySelectorAll('div, main, section, article').forEach((el) => {
      if (el.closest(SKIP_SELECTOR)) return;
      if (el.dataset.widened) return;

      const cs = getComputedStyle(el);
      const mw = parseFloat(cs.maxWidth);
      if (!mw || mw < MIN_MAX_W || mw > window.innerWidth * 0.9) return;
      if (el.getBoundingClientRect().height < 150) return; // skip small widgets
      if (!isCentered(el)) return;

      el.style.setProperty('max-width', WIDTH_PCT, 'important');
      el.style.setProperty('width', WIDTH_PCT, 'important');
      el.dataset.widened = '1';
    });
  }

  let t = null;
  const debouncedWiden = () => {
    clearTimeout(t);
    t = setTimeout(widen, 150);
  };

  widen();
  new MutationObserver(debouncedWiden).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
