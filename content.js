// ChatGPT / Claude / Gemini - Full Width Pane Expander
// Paste in browser console, or save as Tampermonkey script

(function expandChatWidth() {
  const style = document.createElement('style');
  style.id = 'chat-width-expander';
  style.textContent = `
    /* ChatGPT */
    .flex-1.overflow-hidden,
    [class*="react-scroll-to-bottom"],
    main .flex.flex-col.items-center,
    .mx-auto.flex.flex-1,
    form > div,
    .w-full.max-w-2xl,
    .w-full.max-w-3xl,
    .w-full.max-w-4xl,
    [class*="max-w-"] {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Claude (claude.ai) */
    .mx-auto[class*="max-w"],
    .grid-cols-1.mx-auto,
    [data-testid="conversation-turn"] > div,
    .w-full.px-4 {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Gemini */
    .conversation-container,
    .response-container,
    [class*="container"] {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Input box too */
    .stretch,
    [class*="composer"],
    [class*="input-area"] {
      max-width: 100% !important;
      width: 100% !important;
    }
  `;

  // Remove old one if re-running
  const old = document.getElementById('chat-width-expander');
  if (old) old.remove();

  document.head.appendChild(style);
  console.log('✅ Chat width expanded to full screen.');
})();